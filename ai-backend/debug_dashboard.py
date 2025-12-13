
import asyncio
import sys
import traceback
from services.db import get_supabase_client

async def test_dashboard_query():
    print("Testing Supabase connection...")
    try:
        client = get_supabase_client()
        if not client:
            print("ERROR: get_supabase_client() returned None")
            return

        print("Client obtained. Testing 'courses' query...")
        response = client.table("courses").select("*").execute()
        print(f"Success! Got {len(response.data)} courses.")
        print("Data sample:", response.data[:1])

    except Exception:
        print("EXCEPTION OCCURRED:")
        traceback.print_exc()

if __name__ == "__main__":
    # Running sync for simplicity if possible, but execute() might be async in some versions/contexts? 
    # The client usage in route was synchronous `client.table(...).execute()`.
    # But let's check if it needs async loop just in case, though usually supabase-py is sync by default unless async client used.
    # The error was 'websockets.asyncio' so it IS using async under the hood for realtime?
    asyncio.run(test_dashboard_query())
