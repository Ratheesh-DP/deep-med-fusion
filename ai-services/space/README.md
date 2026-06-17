# Deep-Med-Fusion Hugging Face Space

This folder contains a lightweight Gradio demo suitable for Hugging Face Spaces free CPU hardware.

It performs deterministic demo fusion for PNG/JPEG inputs by normalizing MRI, CT, and PET previews and combining them with configurable modality weights. Use it for portfolio demos only; real clinical inference should use validated checkpoints and de-identified medical images.

## Space Settings

- SDK: Gradio
- App file: `app.py`
- Python: 3.10+

## Deploy

Create a Space named `deep-med-fusion`, then upload these files or point the Space to this repository path.
