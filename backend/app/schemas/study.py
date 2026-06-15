from pydantic import BaseModel


class StudySummary(BaseModel):
    id: str
    patient_code: str
    modality_count: int
    status: str
    latest_metric: float | None = None
