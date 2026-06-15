export type StudySummary = {
  id: string;
  patient_code: string;
  modality_count: number;
  status: string;
  latest_metric: number | null;
};

export type FusionJob = {
  id: string;
  study_id: string;
  state: "queued" | "processing" | "completed" | "failed";
  progress: number;
  created_at: string;
  output_uri?: string | null;
  metrics?: {
    psnr: number;
    ssim: number;
    perceptual_loss: number;
    fusion_quality: number;
  } | null;
};
