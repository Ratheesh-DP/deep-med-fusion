from fastapi import APIRouter

from app.schemas.study import StudySummary

router = APIRouter(prefix="/studies", tags=["studies"])


@router.get("", response_model=list[StudySummary])
def list_studies() -> list[StudySummary]:
    return [
        StudySummary(
            id="study-brats-demo",
            patient_code="DMF-0001",
            modality_count=3,
            status="ready",
            latest_metric=0.92,
        ),
        StudySummary(
            id="study-isles-demo",
            patient_code="DMF-0002",
            modality_count=2,
            status="processing",
            latest_metric=0.87,
        ),
    ]
