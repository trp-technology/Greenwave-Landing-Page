#!/usr/bin/env python3
"""Convert PDF-extracted images to RGB JPEG.

Photography for hero, about, projects, industries, and capabilities is
managed by scripts/fetch-hd-images.py — do not map those paths here.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FITZ = ROOT / "public/images/pdf-fitz"

# PDF-sourced assets only (logos, ERP screenshots, QHSE awards).
MAPPING = {
    "public/images/hero/erp-overlay.jpg": "page11_img0.jpeg",
    "public/images/about/workforce.jpg": "page24_img0.jpeg",
    "public/images/qhse/awards.jpg": "page17_img0.jpeg",
    "public/images/technology/erp-projects.jpg": "page11_img0.jpeg",
    "public/images/technology/erp-manpower.jpg": "page13_img0.jpeg",
    "public/images/technology/erp-dpr.jpg": "page14_img0.jpeg",
    "public/images/logo.jpg": "page2_img0.jpeg",
}


def save_rgb(src: Path, dst: Path) -> None:
    image = Image.open(src).convert("RGB")
    dst.parent.mkdir(parents=True, exist_ok=True)
    image.save(dst, "JPEG", quality=92, optimize=True)


def main() -> None:
    for rel_dst, src_name in MAPPING.items():
        src = FITZ / src_name
        dst = ROOT / rel_dst
        if not src.exists():
            raise FileNotFoundError(src)
        save_rgb(src, dst)
        print(f"converted {rel_dst}")


if __name__ == "__main__":
    main()
