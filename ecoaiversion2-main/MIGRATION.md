# EcoAI - Migration Complete ✅

## Architecture
- **Backend:** Python FastAPI + Supabase (PostgreSQL)
- **Frontend:** Next.js 15 + React 19
- **Database:** Supabase (replaced MongoDB Atlas)

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

**Configure Supabase:**
1. Go to https://supabase.com/dashboard/project/auokhkrppdyixxrqvlxs
2. Navigate to SQL Editor
3. Run the SQL from `schema.sql` to create tables

**Start Backend:**
```bash
python main.py
```
Backend runs on: http://localhost:8000

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

## What Changed

### Removed:
- ❌ MongoDB Atlas connection
- ❌ MongoDB dependencies (mongodb, bcryptjs, uuid, etc.)
- ❌ `lib/mongodb.js`

### Added:
- ✅ Supabase PostgreSQL database
- ✅ Python FastAPI backend
- ✅ `lib/api.js` - API client for backend communication
- ✅ Updated `lib/auth.js` - Connects to Python backend
- ✅ Updated `lib/orders.js` - Connects to Python backend

## API Endpoints

All frontend requests now go to Python backend:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /orders/` - Create order
- `GET /orders/{id}` - Get order
- `GET /orders/user/{user_id}` - Get user orders

## Environment Variables

**Backend (.env):**
```
SUPABASE_URL=https://auokhkrppdyixxrqvlxs.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your-secret-key
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=https://auokhkrppdyixxrqvlxs.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_K-Q64MdGab8vpTyZaHpd7A_yupffU-2
```

## Testing

1. Start backend: `cd backend && python main.py`
2. Start frontend: `cd frontend && npm run dev`
3. Visit: http://localhost:3000
4. Test registration and login

## API Documentation

Visit http://localhost:8000/docs for interactive API documentation (Swagger UI)
