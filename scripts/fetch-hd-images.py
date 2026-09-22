#!/usr/bin/env python3
"""Download HD industrial photography and export JPEG + WebP variants."""

from __future__ import annotations

import subprocess
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/images"

# Curated bright, large-scale industrial photography (Unsplash / Pexels).
# Each entry: relative path (no extension) -> source URL
SOURCES: dict[str, str] = {
    # Hero — bright large-scale industrial campus
    "hero/industrial-facility": "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=2400",
    # About — engineers at an industrial site
    "about/team": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=2400&q=90",
    # Capabilities — MEP piping / site execution
    "capabilities/execution": "https://images.pexels.com/photos/4483612/pexels-photo-4483612.jpeg?auto=compress&cs=tinysrgb&w=2400",
    # Projects — distinct industrial environments
    "projects/tata-agratas": "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "projects/exide": "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "projects/daikin": "https://images.pexels.com/photos/259924/pexels-photo-259924.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "projects/maruti-suzuki": "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "projects/mitsubishi": "https://images.pexels.com/photos/3737620/pexels-photo-3737620.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "projects/ola-giga": "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "projects/tdsg": "https://images.pexels.com/photos/256379/pexels-photo-256379.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "projects/oji-packaging": "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=2400",
    # Industries — sector-specific visuals
    "industries/battery-energy": "https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "industries/automotive": "https://images.pexels.com/photos/288477/pexels-photo-288477.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "industries/ac-electronics": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2400&q=90",
    "industries/semiconductor": "https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=2400",
    "industries/rd-testing": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2400&q=90",
    "industries/industrial-manufacturing": "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=2400",
}

MAX_WIDTH = 2400
JPEG_QUALITY = 90
WEBP_QUALITY = 88


def fetch(url: str) -> bytes:
    result = subprocess.run(
        ["curl", "-fsSL", "-L", url],
        check=True,
        capture_output=True,
    )
    return result.stdout


def process_image(data: bytes) -> Image.Image:
    image = Image.open(BytesIO(data))
    image = ImageOps.exif_transpose(image).convert("RGB")
    if image.width > MAX_WIDTH:
        ratio = MAX_WIDTH / image.width
        size = (MAX_WIDTH, max(1, round(image.height * ratio)))
        image = image.resize(size, Image.Resampling.LANCZOS)
    return image


def export(rel_key: str, url: str) -> tuple[int, int]:
    data = fetch(url)
    image = process_image(data)
    dst_dir = OUT / Path(rel_key).parent
    dst_dir.mkdir(parents=True, exist_ok=True)
    stem = OUT / rel_key

    jpg_path = stem.with_suffix(".jpg")
    webp_path = stem.with_suffix(".webp")
    image.save(jpg_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
    image.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)

    print(f"{image.width}x{image.height}  {rel_key}")
    return image.width, image.height


def main() -> None:
    dimensions: dict[str, tuple[int, int]] = {}
    for rel_key, url in SOURCES.items():
        dimensions[rel_key] = export(rel_key, url)

    manifest = ROOT / "public/images/manifest.json"
    import json

    manifest.write_text(json.dumps(dimensions, indent=2) + "\n")
    print(f"\nWrote {manifest}")


if __name__ == "__main__":
    main()
