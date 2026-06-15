import torch
from torch import nn

from models.attention_unet import AttentionUNetEncoder


class MultiModalFusionNet(nn.Module):
    def __init__(self, modalities: int = 3, base_channels: int = 32) -> None:
        super().__init__()
        self.encoders = nn.ModuleList(
            [AttentionUNetEncoder(in_channels=1, base_channels=base_channels) for _ in range(modalities)]
        )
        merged_channels = modalities * base_channels * 4
        self.fusion_head = nn.Sequential(
            nn.Conv2d(merged_channels, base_channels * 4, kernel_size=1),
            nn.ReLU(inplace=True),
            nn.ConvTranspose2d(base_channels * 4, base_channels * 2, kernel_size=2, stride=2),
            nn.ReLU(inplace=True),
            nn.ConvTranspose2d(base_channels * 2, base_channels, kernel_size=2, stride=2),
            nn.ReLU(inplace=True),
            nn.Conv2d(base_channels, 1, kernel_size=1),
            nn.Sigmoid(),
        )

    def forward(self, modalities: list[torch.Tensor]) -> torch.Tensor:
        if len(modalities) != len(self.encoders):
            raise ValueError(f"Expected {len(self.encoders)} modalities, received {len(modalities)}")
        bottlenecks = [encoder(image)[-1] for encoder, image in zip(self.encoders, modalities)]
        return self.fusion_head(torch.cat(bottlenecks, dim=1))
