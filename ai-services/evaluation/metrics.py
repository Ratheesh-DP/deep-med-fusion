import numpy as np
from skimage.metrics import peak_signal_noise_ratio, structural_similarity


def calculate_psnr(reference: np.ndarray, fused: np.ndarray) -> float:
    return float(peak_signal_noise_ratio(reference, fused, data_range=1.0))


def calculate_ssim(reference: np.ndarray, fused: np.ndarray) -> float:
    return float(structural_similarity(reference, fused, data_range=1.0))


def fusion_quality_score(psnr: float, ssim: float, perceptual_loss: float) -> float:
    normalized_psnr = min(psnr / 40.0, 1.0)
    normalized_loss = max(1.0 - perceptual_loss, 0.0)
    return round((0.35 * normalized_psnr) + (0.5 * ssim) + (0.15 * normalized_loss), 4)
