from pydantic import BaseModel


class CareerRequest(BaseModel):
    name: str
    skills: str
    interests: str
    education: str
    goal: str