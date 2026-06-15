import time

from fastapi import HTTPException

from app.schemas.fusion import FusionJobCreate, FusionJobResult, FusionJobStatus, FusionMetrics


class FusionService:
    """In-memory workflow service for local development.

    Production deployments should replace this with a queue-backed service
    such as Celery, Arq, AWS Batch, or a Kubernetes job controller.
    """

    def __init__(self) -> None:
        self._jobs: dict[str, FusionJobResult] = {}

    def list_jobs(self) -> list[FusionJobStatus]:
        return list(self._jobs.values())

    def create_job(self, payload: FusionJobCreate) -> FusionJobStatus:
        job = FusionJobResult(study_id=payload.study_id)
        self._jobs[job.id] = job
        return FusionJobStatus(**job.model_dump())

    def run_job(self, job_id: str) -> None:
        job = self._require_job(job_id)
        job.state = "processing"
        job.progress = 0.35
        time.sleep(0.2)
        job.progress = 0.75
        time.sleep(0.2)
        job.state = "completed"
        job.progress = 1.0
        job.output_uri = f"s3://medical-imaging/fused/{job.study_id}/{job.id}.nii.gz"
        job.metrics = FusionMetrics(psnr=32.8, ssim=0.921, perceptual_loss=0.084, fusion_quality=0.92)

    def get_job(self, job_id: str) -> FusionJobResult:
        return self._require_job(job_id)

    def _require_job(self, job_id: str) -> FusionJobResult:
        try:
            return self._jobs[job_id]
        except KeyError as exc:
            raise HTTPException(status_code=404, detail="Fusion job not found") from exc
