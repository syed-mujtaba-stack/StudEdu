import asyncio
import httpx
import json
import random

API_URL = "http://127.0.0.1:8000/api/courses"
# Use a hardcoded ID for now, or fetch one if we had a user endpoint. 
# This ID will be the "instructor".
INSTRUCTOR_ID = "00000000-0000-0000-0000-000000000000" 

TOPICS = [
    "Introduction to Artificial Intelligence",
    "The History of Renaissance Art",
    "Sustainable Gardening for Beginners",
    "Digital Marketing 101"
]

async def generate_and_save_course(topic):
    async with httpx.AsyncClient(timeout=300.0) as client:
        print(f"🚀 Generating course: '{topic}'...")
        
        # 1. Generate
        try:
            gen_res = await client.post(
                f"{API_URL}/generate", 
                json={"topic": topic, "difficulty": "Beginner"}
            )
            gen_res.raise_for_status()
            course_data = gen_res.json()
            print(f"✅ Generated: {course_data.get('title')}")
        except Exception as e:
            print(f"❌ Generation failed for '{topic}': {e}")
            return

        # 2. Save
        try:
            save_res = await client.post(
                f"{API_URL}/save",
                json=course_data,
                headers={"Authorization": f"Bearer {INSTRUCTOR_ID}"}
            )
            save_res.raise_for_status()
            print(f"💾 Saved: {course_data.get('title')} (ID: {save_res.json()['id']})")
        except Exception as e:
            print(f"❌ Save failed for '{topic}': {e}")

async def main():
    print("🌱 Starting Course Seeder...")
    
    # Run sequentially to be nice to the LLM rate limits
    for topic in TOPICS:
        await generate_and_save_course(topic)
        
    print("✨ Seeding Complete!")

if __name__ == "__main__":
    asyncio.run(main())
