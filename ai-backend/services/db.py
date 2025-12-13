"""
Database service for Supabase connection.
"""
from config import settings
from typing import Optional

# Lazy import to avoid errors if supabase is not configured
_supabase_client = None

def get_supabase_client():
    """Get or create the Supabase client."""
    global _supabase_client
    
    if _supabase_client is None and settings.supabase_url and settings.supabase_key:
        from supabase import create_client
        _supabase_client = create_client(settings.supabase_url, settings.supabase_key)
    
    return _supabase_client
