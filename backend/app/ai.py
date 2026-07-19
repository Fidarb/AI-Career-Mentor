import google.generativeai as genai

from app.config import GEMINI_API_KEY
from app.prompts import CAREER_PROMPT
from app.services.logger import log_request

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")


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
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"