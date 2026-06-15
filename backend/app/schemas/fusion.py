from datetime import datetime
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, Field


Modality = Literal["MRI", "CT", "PET"]
JobState = Literal["queued", "processing", "completed", "failed"]


class FusionJobCreate(BaseModel):
    study_id: str
    modalities: list[Modality] = Field(default_factory=lambda: ["MRI", "CT", "PET"])
    registration_strategy: Literal["rigid", "affine", "deformable"] = "affine"
    model_version: str = "attention-unet-fusion-v0"


class FusionJobStatus(BaseModel):
    id: str = Field(default_factory=lambda: f"job-{uuid4().hex[:12]}")
    study_id: str
    state: JobState = "queued"
    progress: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)


class FusionMetrics(BaseModel):
    psnr: float
    ssim: float
    perceptual_loss: float
    fusion_quality: float


class FusionJobResult(FusionJobStatus):
    output_uri: str | None = None
    metrics: FusionMetrics | None = None
