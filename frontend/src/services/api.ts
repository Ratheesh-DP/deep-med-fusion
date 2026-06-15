import type { FusionJob, StudySummary } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function getStudies(): Promise<StudySummary[]> {
  const response = await fetch(`${API_BASE_URL}/api/studies`);
  if (!response.ok) throw new Error("Failed to load studies");
  return response.json();
}

export async function getFusionJobs(): Promise<FusionJob[]> {
  const response = await fetch(`${API_BASE_URL}/api/fusion-jobs`);
  if (!response.ok) throw new Error("Failed to load fusion jobs");
  return response.json();
}

export async function createFusionJob(studyId: string): Promise<FusionJob> {
  const response = await fetch(`${API_BASE_URL}/api/fusion-jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ study_id: studyId })
  });
  if (!response.ok) throw new Error("Failed to create fusion job");
  return response.json();
}
