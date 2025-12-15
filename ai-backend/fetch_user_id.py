import traceback
from services.db import get_supabase_client

def fetch_valid_user():
    client = get_supabase_client()
    
    # List of tables to try
    tables_to_try = ["profiles", "users", "public_users"]
    
    for table in tables_to_try:
        try:
            print(f"Trying table '{table}'...")
            res = client.table(table).select("id").limit(1).execute()
            if res.data:
                print(f"FOUND_USER_ID: {res.data[0]['id']}")
                return
        except Exception as e:
            print(f"Failed to query '{table}': {e}")
            
    # Try getting instructor_id from courses
    try:
        print("Trying 'courses' table for instructor_id...")
        res = client.table("courses").select("instructor_id").limit(1).execute()
        if res.data:
            print(f"FOUND_USER_ID: {res.data[0]['instructor_id']}")
            return
    except Exception as e:
        print(f"Failed to query 'courses': {e}")
        
    print("No valid user ID found in any table.")

if __name__ == "__main__":
    fetch_valid_user()
