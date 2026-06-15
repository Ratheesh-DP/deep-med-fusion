import torch
from torch import nn


class ConvBlock(nn.Module):
    def __init__(self, in_channels: int, out_channels: int) -> None:
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.block(x)


class AttentionGate(nn.Module):
    def __init__(self, gate_channels: int, skip_channels: int, inter_channels: int) -> None:
        super().__init__()
        self.gate_projection = nn.Conv2d(gate_channels, inter_channels, kernel_size=1)
        self.skip_projection = nn.Conv2d(skip_channels, inter_channels, kernel_size=1)
        self.attention = nn.Sequential(
            nn.ReLU(inplace=True),
            nn.Conv2d(inter_channels, 1, kernel_size=1),
            nn.Sigmoid(),
        )

    def forward(self, gate: torch.Tensor, skip: torch.Tensor) -> torch.Tensor:
        weights = self.attention(self.gate_projection(gate) + self.skip_projection(skip))
        return skip * weights


class AttentionUNetEncoder(nn.Module):
    def __init__(self, in_channels: int = 1, base_channels: int = 32) -> None:
        super().__init__()
        self.enc1 = ConvBlock(in_channels, base_channels)
        self.enc2 = ConvBlock(base_channels, base_channels * 2)
        self.enc3 = ConvBlock(base_channels * 2, base_channels * 4)
        self.pool = nn.MaxPool2d(2)
        self.att2 = AttentionGate(base_channels * 4, base_channels * 2, base_channels)
        self.att1 = AttentionGate(base_channels * 2, base_channels, base_channels // 2)

    def forward(self, x: torch.Tensor) -> list[torch.Tensor]:
        x1 = self.enc1(x)
        x2 = self.enc2(self.pool(x1))
        x3 = self.enc3(self.pool(x2))
        x2_att = self.att2(torch.nn.functional.interpolate(x3, size=x2.shape[-2:]), x2)
        x1_att = self.att1(torch.nn.functional.interpolate(x2_att, size=x1.shape[-2:]), x1)
        return [x1_att, x2_att, x3]
