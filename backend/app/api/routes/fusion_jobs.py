from fastapi import APIRouter, BackgroundTasks

from app.schemas.fusion import FusionJobCreate, FusionJobResult, FusionJobStatus
from app.services.fusion_service import FusionService

router = APIRouter(prefix="/fusion-jobs", tags=["fusion-jobs"])
service = FusionService()


@router.get("", response_model=list[FusionJobStatus])
def list_jobs() -> list[FusionJobStatus]:
    return service.list_jobs()


@router.post("", response_model=FusionJobStatus, status_code=202)
def create_job(payload: FusionJobCreate, background_tasks: BackgroundTasks) -> FusionJobStatus:
    job = service.create_job(payload)
    background_tasks.add_task(service.run_job, job.id)
    return job


@router.get("/{job_id}", response_model=FusionJobResult)
def get_job(job_id: str) -> FusionJobResult:
    return service.get_job(job_id)
