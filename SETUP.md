# MedQube Setup Guide

Everything you need to run the MedQube platform.

## Prerequisites

- NodeJS (v18+)
- Python (v3.12+)

## Environment & Configuration

### Backend
1. Create and activate virtual environment:
   ```bash
   cd Backend
   python -m venv venv
   # Windows: venv\Scripts\activate
   # Linux/macOS: source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy `Backend/.env.example` to `Backend/.env` and configure `DATABASE_URL` (Neon PostgreSQL recommended).
4. Run migrations:
   ```bash
   alembic upgrade head
   ```

### Frontend
1. Install dependencies:
   ```bash
   cd Frontend
   npm install
   ```
2. Copy `Frontend/.env.example` to `Frontend/.env.local` and configure `NEXT_PUBLIC_API_URL`.

## Running the Platform

Ensure you have both the backend and frontend running:

### Start Backend
```bash
cd Backend
# Activate venv first
# Windows: .\venv\Scripts\activate
# Linux/macOS: source venv/bin/activate
uvicorn app.main:app --reload
```

### Start Frontend
```bash
cd Frontend
npm run dev
```

### Scripted Startup (Quick)
If you have both environments (venv and node_modules) ready, you can start all at once (requires terminal multiplexing):

**Windows (PowerShell):**
```powershell
Start-Process powershell -ArgumentList '-Command "cd Backend; .\venv\Scripts\activate; uvicorn app.main:app --reload"'
Start-Process powershell -ArgumentList '-Command "cd Frontend; npm run dev"'
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

