from google import genai
import traceback

from app.config import GEMINI_API_KEY
from app.prompts import CAREER_PROMPT
from app.services.logger import log_request

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_career_advice(data):
    log_request(data.name)

    prompt = f"""
{CAREER_PROMPT}

Student Name:
{data.name}

Skills:
{data.skills}

Interests:
{data.interests}

Education:
{data.education}

Career Goal:
{data.goal}
"""

    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
        )

        return response.text

    except Exception:
        traceback.print_exc()
        return "Error generating AI response."