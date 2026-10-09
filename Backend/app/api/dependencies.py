from datetime import datetime, timezone

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.session import UserSession
from app.models.user import User
from app.services.auth_service import AuthService

security = HTTPBearer(auto_error=False)


async def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    token = None

    if credentials:
        token = credentials.credentials
    else:
        token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = decode_access_token(token)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    subject = payload.get("sub")
    if not subject:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token subject",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = int(subject)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token subject",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = await AuthService.get_user_by_id(db, user_id)
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or account is deactivated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    session_id = payload.get("sid")
    if session_id:
        result = await db.execute(
            select(UserSession).where(
                UserSession.id == session_id,
                UserSession.user_id == user.id,
            )
        )
        session = result.scalar_one_or_none()
        now = datetime.now(timezone.utc)
        expires_at = session.expires_at if session and session.expires_at.tzinfo else (
            session.expires_at.replace(tzinfo=timezone.utc) if session else None
        )
        if not session or session.is_revoked or not expires_at or expires_at <= now:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Session is expired or revoked",
                headers={"WWW-Authenticate": "Bearer"},
            )
        await AuthService.touch_session(db, session_id)

    return user

