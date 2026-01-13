# Deep-Med-Fusion

## Project Overview

Deep-Med-Fusion is a research-oriented project that develops and evaluates deep learning methods for multi-modal medical image fusion (for example, combining MRI, CT, and PET). The objective is to fuse complementary information from different imaging modalities into a single high-quality image that preserves clinically relevant details and improves downstream tasks such as segmentation, detection, and diagnosis.

This repository contains data loaders, preprocessing pipelines, model implementations, training and evaluation scripts, visualization tools, and reproducible experiment configurations designed to make the project interview-ready and demonstrable.

---

## Key Features

- Modular, well-documented code organized for experiments and reproducibility.
- Multiple fusion model implementations (encoder-decoder, attention-based fusion, UNet-derived fusion backbones).
- Support for common medical image formats (NIfTI, DICOM) and standard preprocessing steps.
- Evaluation suite with quantitative metrics (PSNR, SSIM, Mutual Information) and visualization utilities.
- Scripts for training, validation, inference, checkpointing, and logging (TensorBoard/Weights & Biases).
- Example experiments and baseline results (placeholders to be filled with your runs).

---

## Why this project (Interview talking points)

When presenting Deep-Med-Fusion in an interview, emphasize the following:

- Problem statement and clinical motivation: why fusing modalities helps clinicians (e.g., CT shows bone detail, MRI shows soft tissue; PET indicates metabolic activity).
- Data challenges: differences in resolution, alignment (registration), noise characteristics, and intensity distributions across modalities.
- Model choices and design trade-offs: explain encoder-decoder vs. attention fusion, how skip connections preserve spatial detail, and why particular loss terms were chosen.
- Evaluation strategy: which metrics you used, why, and how they correlate with visual/clinical quality.
- Reproducibility: how experiments are organized, how to run them, and how you control randomness and compute environment.
- Limitations and future work: discuss assumptions, failure cases, and clear next steps.

Include a short demo during interviews: quick inference on one example, visualization of input modalities and fused output, and numeric metric summary.

---

## Repository structure

- data/                # dataset loaders, download scripts, and preprocessors
- configs/             # experiment configuration (YAML/JSON)
- src/                 # source code (models, losses, training loops, utils)
- notebooks/           # Jupyter notebooks for EDA and qualitative results
- scripts/             # convenience scripts for training, eval, and inference
- experiments/         # saved checkpoints and experiment logs (gitignored)
- results/             # generated images, evaluation tables, and figures
- requirements.txt     # Python dependencies
- README.md            # this file

---

## Installation

1. System requirements
   - Python 3.8+
   - CUDA (optional, for GPU): 11.x or compatible with your torch build
   - 16+ GB RAM recommended for training

2. Create a virtual environment and install dependencies

```bash
python -m venv .venv
source .venv/bin/activate  # macOS / Linux
.\\.venv\\Scripts\\activate  # Windows (PowerShell)
python -m pip install --upgrade pip
pip install -r requirements.txt
```

3. (Optional) Install extras for visualization or W&B

```bash
pip install tensorboard wandb matplotlib nibabel pydicom
```

---

## Data: datasets and preprocessing

This project does not include private datasets. Typical publicly available datasets you can use to reproduce or test the code include:
- IXI (brain MRI)
- BraTS (multi-parametric MRI for brain tumors)
- ADNI (Alzheimer's MRI and PET)
- Public CT/PET datasets where available

Data preparation steps (implemented in data/):
- Conversion from DICOM to NIfTI (if needed)
- Registration (rigid/affine) to align modalities; we provide example scripts using SimpleITK.
- Resampling to a consistent spacing and cropping/patch extraction.
- Intensity normalization and clipping per-modality.
- Optional augmentation pipelines for training (flips, rotations, intensity jitter).

To run preprocessing on a dataset, adapt and run:

```bash
python scripts/preprocess.py --config configs/preprocess_ixi.yaml --out_dir data/processed/ixi
```

Add your dataset paths and format in the config YAML files under configs/.

---

## Model implementations

The src/models/ directory contains modular model definitions. Current patterns included:

- Encoder-decoder fusion: separate encoders per modality, fusion block, shared decoder.
- Attention fusion: cross-attention blocks or channel-wise attention modules to weight modality contributions.
- UNet variants: multi-channel inputs or modality-specific encoders with skip connections to decoder.

Design notes to mention in interviews:
- Why use modality-specific encoders: preserve low-level modality-specific features before fusion.
- Fusion at multiple scales (early, middle, late) and how that affects the output.
- Loss choices: pixel-wise (L1/L2), perceptual (VGG), structural (SSIM), and task-driven losses if downstream tasks are evaluated.

---

## Training

Example training command (adjust config and dataset paths):

```bash
python src/train.py --config configs/experiment_fusion_unet.yaml --gpus 0
```

Important training design choices to document in your experiments:
- Optimizer and learning rate schedule (Adam, AdamW, cosine annealing, etc.)
- Batch size and patch size (trade-off between memory and context)
- Number of epochs, checkpoint frequency, and early stopping criteria
- Random seeds for reproducibility and deterministic behavior flags (torch.backends.cudnn.deterministic=true)

---

## Evaluation and metrics

Quantitative metrics commonly used for image fusion include:

- PSNR (Peak Signal-to-Noise Ratio): measures similarity to reference images; higher is better.
- SSIM (Structural Similarity Index): measures structural similarity between images; higher is better.
- Mutual Information (MI): measures statistical dependency between source and fused images; higher indicates more preserved information.
- Entropy (EN): indicates amount of information/content in the fused image.
- VIF (Visual Information Fidelity) and others depending on literature

Example evaluation command:

```bash
python src/eval.py --config configs/eval_fusion.yaml --checkpoint experiments/exp1/checkpoint.pt
```

Also include visual comparisons in notebooks/ or results/ to show qualitative improvements: input modalities, fused result, difference maps, and overlays.

---

## Inference and demo

Quick inference example:

```bash
python src/infer.py --checkpoint experiments/exp1/checkpoint.pt --input_paths data/processed/example/modal1.nii.gz data/processed/example/modal2.nii.gz --output results/example_fused.nii.gz
```

For a small demo during interviews, provide a single Jupyter notebook that: loads a preprocessed example, runs inference, and plots inputs and fused output side-by-side with metrics.

---

## Experiments, reproducibility, and logging

- Use configs/ for experiment settings and store a copy of the used config with each run.
- Log metrics, losses, and images to TensorBoard or Weights & Biases.
- Save checkpoints and include a README in experiments/ describing how to reproduce key results.

Pro tip for interviews: prepare a single reproducible script (bash or Python) that runs a short end-to-end pipeline on a small sample (preprocessing -> train small model or load checkpoint -> inference -> plot results). This helps you demo the full workflow in limited time.

---

## Results (example format)

Provide a table and representative images in results/. Example table format you can add to results/README.md:

| Model | Dataset | PSNR | SSIM | MI | Notes |
|---|---:|---:|---:|---:|---|
| Fusion-UNet | IXI (subset) | 28.4 | 0.89 | 1.12 | baseline run |

Replace with your measured values. Include visual examples (PNG) with captions.

---

## How to talk about this project in interviews (step-by-step script)

1. Elevator pitch (30s): "Deep-Med-Fusion develops deep learning methods to combine multiple medical imaging modalities into single images that preserve clinically important details and improve downstream tasks."
2. Problem and motivation (1-2 mins): describe modalities, clinical need, and why fusion helps.
3. Data and preprocessing (1-2 mins): explain registration, normalization, and how you handle modality differences.
4. Model architecture (2-4 mins): pick a representative model (e.g., Fusion-UNet), walk through encoders, fusion, decoder, and losses. Use diagrams or code snippets.
5. Results and evaluation (1-2 mins): present quantitative metrics and qualitative images; discuss trade-offs and failure cases.
6. Contributions and takeaways (1 min): summarize what you implemented and why it matters.
7. Future work and open questions (1 min): list improvements and how you would evaluate them.

Bring a short demo notebook to run in under 3-5 minutes. Have scripts ready to regenerate figures quickly.

---

## Code style, testing, and CI

- Follow PEP8 and use black/isort for formatting (add pre-commit hooks).
- Write unit tests for data loaders and utility functions (tests/).
- Set up a lightweight CI pipeline to run tests and linting (GitHub Actions).

---

## Contribution and License

Contributions are welcome. Open a GitHub issue describing the planned change and submit a pull request.

Add a LICENSE file (MIT recommended for academic code) or specify an appropriate license.

---

## Contact and credits

Author: Ratheesh-DP

For questions, demos, or interview preparation help, open an issue or reach out via GitHub profile.

---

## Next steps (suggested)

- Fill in dataset-specific configs and provide download scripts.
- Add at least one fully reproducible experiment with published results and a small demo notebook for interviews.
- Include model cards and ethical considerations for clinical usage.
