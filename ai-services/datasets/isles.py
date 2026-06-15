from pathlib import Path


def list_isles_cases(root: str | Path) -> list[Path]:
    root_path = Path(root)
    return sorted(path for path in root_path.glob("**/*") if path.is_dir() and "sub-" in path.name)
