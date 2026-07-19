import requests

from app.config import OPENROUTER_API_KEY
from app.prompts import CAREER_PROMPT
from app.services.logger import log_request


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

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "openrouter/free",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=60
        )


        response.raise_for_status()

        result = response.json()

        return result["choices"][0]["message"]["content"]

    except Exception as e:
        return f"Error generating AI response: {str(e)}"