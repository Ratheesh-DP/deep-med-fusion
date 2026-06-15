import torch

from models.fusion_network import MultiModalFusionNet


def fuse_modalities(modalities: list[torch.Tensor], checkpoint_path: str | None = None) -> torch.Tensor:
    model = MultiModalFusionNet(modalities=len(modalities))
    if checkpoint_path:
        model.load_state_dict(torch.load(checkpoint_path, map_location="cpu"))
    model.eval()
    with torch.inference_mode():
        return model(modalities)
