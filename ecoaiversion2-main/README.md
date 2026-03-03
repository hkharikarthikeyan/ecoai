# EcoAI Version 2 - Full Stack Application

## Project Structure

```
ecoaiversion2-main/
├── frontend/          # Next.js Frontend Application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility libraries
│   ├── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   └── .env.local    # Frontend environment variables
│
└── backend/          # Python FastAPI Backend
    ├── main.py           # FastAPI application entry point
    ├── database.py       # Supabase connection
    ├── auth_utils.py     # Authentication utilities
    ├── routes_auth.py    # Authentication endpoints
    ├── routes_orders.py  # Order management endpoints
    ├── requirements.txt  # Python dependencies
    ├── schema.sql        # Database schema
    ├── .env             # Backend environment variables
    └── README.md        # Backend documentation
```

## Setup Instructions

### Backend (Python + FastAPI + Supabase)

1. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up Supabase database:**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL commands from `backend/schema.sql`

3. **Run the backend server:**
   ```bash
   cd backend
   python main.py
   ```
   Backend will run on: http://localhost:8000

### Frontend (Next.js)

1. **Install Node.js dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on: http://localhost:3000

## Environment Variables

### Backend (.env)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key
- `JWT_SECRET` - Secret key for JWT tokens

### Frontend (.env.local)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Your Supabase publishable key
- `NEXT_PUBLIC_API_URL` - Backend API URL (http://localhost:8000)

## Technology Stack

### Backend
- **Framework:** FastAPI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** JWT + bcrypt
- **Language:** Python 3.11+

### Frontend
- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
