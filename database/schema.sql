CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'radiologist', 'researcher', 'operator')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_patient_code TEXT UNIQUE NOT NULL,
  encrypted_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  accession_number TEXT UNIQUE,
  dataset_source TEXT CHECK (dataset_source IN ('clinical', 'BRATS', 'ISLES', 'synthetic')),
  status TEXT NOT NULL DEFAULT 'created',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS medical_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
  modality TEXT NOT NULL CHECK (modality IN ('MRI', 'CT', 'PET', 'FUSED')),
  storage_uri TEXT NOT NULL,
  checksum_sha256 TEXT NOT NULL,
  voxel_spacing JSONB,
  image_shape JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS model_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  checkpoint_uri TEXT NOT NULL,
  metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name, version)
);

CREATE TABLE IF NOT EXISTS fusion_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
  model_version_id UUID REFERENCES model_versions(id),
  state TEXT NOT NULL CHECK (state IN ('queued', 'processing', 'completed', 'failed')),
  progress NUMERIC(5, 4) NOT NULL DEFAULT 0,
  error_message TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS fusion_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fusion_job_id UUID NOT NULL REFERENCES fusion_jobs(id) ON DELETE CASCADE,
  fused_image_id UUID NOT NULL REFERENCES medical_images(id),
  psnr NUMERIC(8, 4),
  ssim NUMERIC(8, 4),
  perceptual_loss NUMERIC(8, 4),
  fusion_quality NUMERIC(8, 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address INET,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_studies_patient_id ON studies(patient_id);
CREATE INDEX IF NOT EXISTS idx_images_study_modality ON medical_images(study_id, modality);
CREATE INDEX IF NOT EXISTS idx_jobs_state_created ON fusion_jobs(state, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_logs(resource_type, resource_id);
