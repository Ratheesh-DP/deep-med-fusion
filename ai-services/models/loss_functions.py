import torch
from torch import nn


class FusionLoss(nn.Module):
    def __init__(self, intensity_weight: float = 1.0, gradient_weight: float = 0.5) -> None:
        super().__init__()
        self.intensity_weight = intensity_weight
        self.gradient_weight = gradient_weight
        self.l1 = nn.L1Loss()

    def forward(self, fused: torch.Tensor, targets: list[torch.Tensor]) -> torch.Tensor:
        reference = torch.stack(targets, dim=0).mean(dim=0)
        intensity = self.l1(fused, reference)
        gradient = self.l1(_gradient_magnitude(fused), _gradient_magnitude(reference))
        return self.intensity_weight * intensity + self.gradient_weight * gradient


def _gradient_magnitude(x: torch.Tensor) -> torch.Tensor:
    dx = torch.abs(x[..., :, 1:] - x[..., :, :-1]).mean()
    dy = torch.abs(x[..., 1:, :] - x[..., :-1, :]).mean()
    return dx + dy
