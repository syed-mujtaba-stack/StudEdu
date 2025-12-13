
from config import settings
from supabase import create_client
import time

print("Starting test...")
print(f"URL: {settings.supabase_url[:10]}...")

try:
    print("Creating client (sync)...")
    client = create_client(settings.supabase_url, settings.supabase_key)
    print("Client created successfully.")
    
    print("Attempting query (sync)...")
    # Simple query to check connection
    res = client.table("courses").select("count", count="exact").execute()
    print(f"Query Result: {res}")
    
except Exception as e:
    print(f"CRITICAL ERROR: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()

print("Test finished.")
