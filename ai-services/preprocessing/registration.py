import cv2
import numpy as np


def affine_register(fixed: np.ndarray, moving: np.ndarray) -> np.ndarray:
    fixed_8 = _to_uint8(fixed)
    moving_8 = _to_uint8(moving)
    warp = np.eye(2, 3, dtype=np.float32)
    criteria = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 80, 1e-6)
    cv2.findTransformECC(fixed_8, moving_8, warp, cv2.MOTION_AFFINE, criteria)
    return cv2.warpAffine(moving, warp, (fixed.shape[1], fixed.shape[0]), flags=cv2.INTER_LINEAR)


def _to_uint8(image: np.ndarray) -> np.ndarray:
    scaled = image.astype(np.float32)
    scaled = (scaled - scaled.min()) / max(float(scaled.max() - scaled.min()), 1e-6)
    return (scaled * 255).astype(np.uint8)
