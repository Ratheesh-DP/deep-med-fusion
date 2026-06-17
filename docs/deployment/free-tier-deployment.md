# Free-Tier Deployment Guide

This guide deploys Deep-Med-Fusion as a portfolio/demo system using free tiers.

Do not upload PHI or real clinical images to free-tier services. Use synthetic or de-identified demo data only.

## Service Map

| Service | Role | Free-Tier Use |
|---|---|---|
| Vercel | Root Vite frontend | Production dashboard |
| Render | FastAPI backend from `backend/` | API service |
| Neon | PostgreSQL | Metadata database |
| Hugging Face Spaces | Gradio AI demo from `ai-services/space/` | Interactive fusion demo |
| GitHub Actions | CI and optional Vercel deploy | Build checks |
| Cloudinary | Demo image/result storage | Preview asset hosting |

## 1. Neon PostgreSQL

1. Create a Neon project.
2. Create a database named `deepmedfusion`.
3. Copy the pooled connection string.
4. Run `database/schema.sql` in the Neon SQL editor.
5. Use the connection string as `DATABASE_URL` in Render.

Use the SQLAlchemy driver format:

```text
postgresql+psycopg://USER:PASSWORD@HOST.neon.tech/deepmedfusion?sslmode=require
```

## 2. Render Backend

Create a new Render Blueprint from this repository. Render will read `render.yaml`.

Set these environment variables:

```text
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST.neon.tech/deepmedfusion?sslmode=require
API_CORS_ORIGINS=https://YOUR_VERCEL_DOMAIN.vercel.app,http://localhost:5173
MODEL_DEVICE=cpu
```

Optional Cloudinary variables:

```text
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_UPLOAD_FOLDER=deep-med-fusion
```

Health check:

```text
https://YOUR_RENDER_SERVICE.onrender.com/api/health
```

## 3. Vercel Frontend

Import the GitHub repository into Vercel.

Settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm ci
```

Environment variables:

```text
VITE_API_BASE_URL=https://YOUR_RENDER_SERVICE.onrender.com
VITE_AI_SPACE_URL=https://huggingface.co/spaces/Ratheesh-DP/deep-med-fusion
```

The root `vercel.json` already encodes the Vite build and SPA rewrite.

## 4. Hugging Face Space

Create a new Space:

```text
Name: deep-med-fusion
SDK: Gradio
Hardware: CPU basic
App file: app.py
```

Upload or sync:

```text
ai-services/space/app.py
ai-services/space/requirements.txt
ai-services/space/README.md
```

The Space is intentionally lightweight and uses deterministic preview fusion so it can run on free CPU hardware.

## 5. GitHub Actions

CI runs automatically on pushes and pull requests.

The Vercel deployment workflow is manual. Add these GitHub repository secrets before running it:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Then run:

```text
Actions -> Deploy Vercel Frontend -> Run workflow
```

## 6. Cloudinary

For demo storage, create an unsigned upload preset or use signed backend uploads. Keep signed API secrets only in Render environment variables.

Recommended folder:

```text
deep-med-fusion/
```

## Deployment Order

1. Neon database
2. Render backend
3. Hugging Face Space
4. Vercel frontend
5. GitHub Actions secrets
6. Cloudinary demo storage

## Free-Tier Caveats

- Render free services may sleep after inactivity.
- Hugging Face CPU Spaces are suitable for demos, not heavy 3D medical volumes.
- Vercel frontend is fine for public portfolio traffic.
- Neon free compute/storage limits are suitable for metadata and demos.
- Cloudinary free limits are suitable for small preview images.
