from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # =========================================================
    # DATABASE
    # =========================================================

    DATABASE_URL: str = "sqlite+aiosqlite:///./MedQube.db"
    DATABASE_FALLBACK_URL: str = "sqlite+aiosqlite:///./MedQube.db"

    # =========================================================
    # JWT & SESSION CONFIGURATION (7-DAY SLIDING WINDOW)
    # =========================================================

    JWT_SECRET_KEY: str = "MedQube-secret-key-development-2026-super-secure-change-in-prod"
    JWT_ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    SESSION_INACTIVITY_DAYS: int = 7

    # =========================================================
    # OTP SECURITY & RATE LIMITING
    # =========================================================

    OTP_EXPIRE_MINUTES: int = 15
    OTP_MAX_ATTEMPTS: int = 5
    OTP_RESEND_COOLDOWN_SECONDS: int = 60

    # =========================================================
    # COOKIE SECURITY
    # =========================================================

    COOKIE_SECURE: bool = False
    COOKIE_SAMESITE: str = "lax"

    # =========================================================
    # GOOGLE OAUTH
    # =========================================================

    GOOGLE_CLIENT_ID: str = "dev-google-client-id.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET: str = "dev-google-client-secret"

    GOOGLE_REDIRECT_URI: str = (
        "http://127.0.0.1:8000/auth/google/callback"
    )

    # =========================================================
    # FRONTEND
    # =========================================================

    FRONTEND_URL: str = "http://localhost:3000"

    # =========================================================
    # NEON STORAGE & AI GATEWAY
    # =========================================================

    AWS_ENDPOINT_URL_S3: str | None = None
    AWS_ACCESS_KEY_ID: str | None = None
    AWS_SECRET_ACCESS_KEY: str | None = None
    AWS_REGION: str = "ap-southeast-1"
    S3_BUCKET: str = "reports"

    NEON_AI_GATEWAY_BASE_URL: str | None = None
    NEON_AI_GATEWAY_TOKEN: str | None = None
    EMAIL_PORT: int = 587
    EMAIL_USERNAME: str = "dev@MedQube.ai"
    EMAIL_PASSWORD: str = "dev-password"
    EMAIL_FROM: str = "MedQube Platform <noreply@MedQube.ai>"

    # =========================================================
    # SETTINGS CONFIG
    # =========================================================

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()

