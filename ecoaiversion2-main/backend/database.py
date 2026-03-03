import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in .env file")

print(f"Connecting to Supabase: {SUPABASE_URL}")
print(f"Using key: {SUPABASE_KEY[:20]}...")

supabase: Client = None

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Supabase connection successful")
except Exception as e:
    print(f"⚠️  WARNING: Supabase connection failed: {e}")
    print("Server will start but database operations will fail.")
    print("\nTo fix:")
    print("1. Check internet connection")
    print("2. Verify Supabase project is active at: https://supabase.com/dashboard")
    print("3. Try changing DNS to 8.8.8.8 or 1.1.1.1")
    print("4. Check firewall/antivirus settings\n")
