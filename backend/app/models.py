from pydantic import BaseModel


class CareerRequest(BaseModel):
    name: str
    skills: str
    interests: str
    education: str
    studyYear: str
    certifications: str
    goal: str