# API Notes

The backend exposes a FastAPI OpenAPI document at `/docs`.

Primary resources:

- `GET /api/health`
- `GET /api/studies`
- `GET /api/fusion-jobs`
- `POST /api/fusion-jobs`
- `GET /api/fusion-jobs/{job_id}`

The local implementation uses an in-memory job store for development. Production should swap this layer for a durable queue, worker pool, and database persistence.
