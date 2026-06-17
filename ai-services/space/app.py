import gradio as gr
import numpy as np
from PIL import Image
from skimage.metrics import peak_signal_noise_ratio, structural_similarity


def _prepare(image: Image.Image | None) -> np.ndarray:
    if image is None:
        return np.zeros((256, 256), dtype=np.float32)
    gray = image.convert("L").resize((256, 256))
    array = np.asarray(gray, dtype=np.float32) / 255.0
    return array


def fuse_demo(mri, ct, pet, mri_weight, ct_weight, pet_weight):
    weights = np.asarray([mri_weight, ct_weight, pet_weight], dtype=np.float32)
    weights = weights / max(float(weights.sum()), 1e-6)

    arrays = [_prepare(mri), _prepare(ct), _prepare(pet)]
    fused = sum(weight * array for weight, array in zip(weights, arrays))
    fused = np.clip(fused, 0.0, 1.0)

    reference = np.mean(np.stack(arrays), axis=0)
    psnr = peak_signal_noise_ratio(reference, fused, data_range=1.0)
    ssim = structural_similarity(reference, fused, data_range=1.0)
    quality = (0.45 * min(psnr / 40.0, 1.0)) + (0.55 * ssim)

    output = Image.fromarray((fused * 255).astype(np.uint8))
    metrics = {
        "psnr": round(float(psnr), 4),
        "ssim": round(float(ssim), 4),
        "fusion_quality": round(float(quality), 4),
        "note": "Demo fusion only. Not for diagnosis.",
    }
    return output, metrics


with gr.Blocks(title="Deep-Med-Fusion") as demo:
    gr.Markdown("# Deep-Med-Fusion")
    gr.Markdown("Free-tier demo for MRI, CT, and PET preview fusion. Use de-identified or synthetic images only.")

    with gr.Row():
        mri = gr.Image(label="MRI preview", type="pil")
        ct = gr.Image(label="CT preview", type="pil")
        pet = gr.Image(label="PET preview", type="pil")

    with gr.Row():
        mri_weight = gr.Slider(0, 1, value=0.45, step=0.05, label="MRI attention weight")
        ct_weight = gr.Slider(0, 1, value=0.30, step=0.05, label="CT attention weight")
        pet_weight = gr.Slider(0, 1, value=0.25, step=0.05, label="PET attention weight")

    run = gr.Button("Fuse Images", variant="primary")

    with gr.Row():
        fused = gr.Image(label="Fused output", type="pil")
        metrics = gr.JSON(label="Quality metrics")

    run.click(
        fn=fuse_demo,
        inputs=[mri, ct, pet, mri_weight, ct_weight, pet_weight],
        outputs=[fused, metrics],
    )


if __name__ == "__main__":
    demo.launch()
