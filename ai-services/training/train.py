import torch
from torch.optim import AdamW

from models.fusion_network import MultiModalFusionNet
from models.loss_functions import FusionLoss


def train_step(model: MultiModalFusionNet, batch: dict, optimizer: AdamW, criterion: FusionLoss) -> float:
    modalities = batch["modalities"]
    targets = batch["targets"]
    optimizer.zero_grad(set_to_none=True)
    fused = model(modalities)
    loss = criterion(fused, targets)
    loss.backward()
    optimizer.step()
    return float(loss.detach().cpu())


def build_training_components(modality_count: int = 3):
    model = MultiModalFusionNet(modalities=modality_count)
    optimizer = AdamW(model.parameters(), lr=3e-4, weight_decay=1e-4)
    criterion = FusionLoss()
    return model, optimizer, criterion
