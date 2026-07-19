from fastapi import APIRouter

from app.models import CareerRequest
from app.ai import generate_career_advice

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "AI Career Mentor Backend Running"
    }


@router.post("/career")
def career(data: CareerRequest):

    answer = generate_career_advice(data)

    return {
        "answer": answer
    }