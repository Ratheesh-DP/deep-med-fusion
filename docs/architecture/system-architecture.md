# System Architecture

```mermaid
flowchart TB
  Upload["Clinical upload: MRI, CT, PET"] --> Api["FastAPI Gateway"]
  Api --> Auth["Auth and RBAC"]
  Api --> Jobs["Fusion Job Orchestrator"]
  Jobs --> Register["Registration Service"]
  Register --> Preprocess["MONAI Preprocessing"]
  Preprocess --> Model["Attention U-Net Fusion Network"]
  Model --> Metrics["PSNR / SSIM / Perceptual Metrics"]
  Metrics --> Results["Result Publisher"]
  Results --> Db[("PostgreSQL Metadata")]
  Results --> S3[("AWS S3 / MinIO Objects")]
  Db --> Ui["React TypeScript Dashboard"]
  S3 --> Ui
  Api --> Audit["Audit Logger"]
  Audit --> Db
```

## Data Flow

1. Studies are uploaded and normalized into modality-specific objects.
2. Registration aligns CT and PET to the MRI or selected fixed reference.
3. Each modality stream passes through an attention-gated encoder.
4. The fusion head combines bottleneck features and reconstructs a fused image.
5. Quality metrics and output object URIs are stored for review.
6. The dashboard presents workflow state, output references, and quality metrics.
