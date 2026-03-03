# EcoAI Python Backend

## Setup Instructions

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Supabase Database

1. Go to your Supabase project: https://auokhkrppdyixxrqvlxs.supabase.co
2. Navigate to SQL Editor
3. Run the SQL commands from `schema.sql` to create tables

### 3. Environment Variables

The `.env` file is already configured with your Supabase credentials:
- SUPABASE_URL=https://auokhkrppdyixxrqvlxs.supabase.co
- SUPABASE_KEY=sb_publishable_K-Q64MdGab8vpTyZaHpd7A_yupffU-2

### 4. Run the Backend Server
```bash
cd backend
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: http://localhost:8000

## API Endpoints

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- POST `/auth/logout` - Logout user
- GET `/auth/me?token=<token>` - Get current user

### Orders
- POST `/orders/` - Create new order
- GET `/orders/{order_id}` - Get order by ID
- GET `/orders/user/{user_id}` - Get all orders for a user

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
