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
        "model": "mistralai/mistral-7b-instruct:free",
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

        if not response.ok:
            print("STATUS:", response.status_code)
            print("BODY:", response.text)
            return response.text

        result = response.json()

        return result["choices"][0]["message"]["content"]

    except Exception as e:
        print(e)
        return f"Error generating AI response: {str(e)}"