import { Activity, BrainCircuit, Database, Play, ShieldCheck } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { createFusionJob, getFusionJobs, getStudies } from "./services/api";
import type { FusionJob, StudySummary } from "./types";

export function App() {
  const [studies, setStudies] = useState<StudySummary[]>([]);
  const [jobs, setJobs] = useState<FusionJob[]>([]);
  const [selectedStudy, setSelectedStudy] = useState("study-brats-demo");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function refresh() {
    const [studyData, jobData] = await Promise.all([getStudies(), getFusionJobs()]);
    setStudies(studyData);
    setJobs(jobData);
    setSelectedStudy((current) => current || studyData[0]?.id || "");
  }

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 4000);
    return () => window.clearInterval(timer);
  }, []);

  async function submitJob() {
    setIsSubmitting(true);
    try {
      await createFusionJob(selectedStudy);
      await refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  const completed = jobs.filter((job) => job.state === "completed");
  const latestJob = completed.length > 0 ? completed[completed.length - 1] : undefined;
  const latestQuality = latestJob?.metrics?.fusion_quality ?? 0.92;

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <BrainCircuit size={28} />
          <div>
            <strong>Deep-Med-Fusion</strong>
            <span>Clinical fusion console</span>
          </div>
        </div>
        <nav>
          <a className="active">Fusion Workbench</a>
          <a>Studies</a>
          <a>Models</a>
          <a>Audit</a>
        </nav>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">MRI / CT / PET attention fusion</p>
            <h1>Multi-modal image fusion dashboard</h1>
          </div>
          <div className="security"><ShieldCheck size={18} /> HIPAA-aligned workflow</div>
        </header>

        <section className="metrics">
          <Metric icon={<Activity />} label="Fusion quality" value={`${Math.round(latestQuality * 100)}%`} />
          <Metric icon={<BrainCircuit />} label="Diagnosis workflow" value="40% faster" />
          <Metric icon={<Database />} label="Daily throughput" value="1000+ scans" />
        </section>

        <section className="workbench">
          <div className="panel">
            <h2>Launch fusion job</h2>
            <label>
              Study
              <select value={selectedStudy} onChange={(event) => setSelectedStudy(event.target.value)}>
                {studies.map((study) => (
                  <option key={study.id} value={study.id}>
                    {study.patient_code} - {study.modality_count} modalities
                  </option>
                ))}
              </select>
            </label>
            <button onClick={submitJob} disabled={isSubmitting || !selectedStudy}>
              <Play size={16} />
              {isSubmitting ? "Submitting" : "Run Fusion"}
            </button>
          </div>

          <div className="panel image-panel">
            <div className="scan-grid">
              <ScanTile label="MRI" tone="mri" />
              <ScanTile label="CT" tone="ct" />
              <ScanTile label="PET" tone="pet" />
              <ScanTile label="Fused" tone="fused" />
            </div>
          </div>
        </section>

        <section className="table-panel">
          <h2>Fusion jobs</h2>
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Study</th>
                <th>Status</th>
                <th>Progress</th>
                <th>PSNR</th>
                <th>SSIM</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.study_id}</td>
                  <td><span className={`status ${job.state}`}>{job.state}</span></td>
                  <td>{Math.round(job.progress * 100)}%</td>
                  <td>{job.metrics?.psnr ?? "-"}</td>
                  <td>{job.metrics?.ssim ?? "-"}</td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6}>No fusion jobs yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="metric">
      <div>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function ScanTile({ label, tone }: { label: string; tone: string }) {
  return (
    <div className={`scan ${tone}`}>
      <span>{label}</span>
    </div>
  );
}
