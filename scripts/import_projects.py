#!/usr/bin/env python3
"""Import projects from project details 2026.xlsx into src/content/*.ts"""

import hashlib
import json
import re
import shutil
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
XLSX = ROOT / "project details 2026.xlsx"
OUTPUT = ROOT / "src/content/projects.ts"
TAXONOMY_OUTPUT = ROOT / "src/content/excel-taxonomy.ts"
DISTRIBUTION_OUTPUT = ROOT / "src/content/industry-distribution.ts"
WEB_IMAGE_DIR = ROOT / "public/images/Greenwave Web Image"
WEB_IMAGE_OUTPUT_DIR = ROOT / "public/images/projects/web"
CLEAN_IMAGE_DIR = ROOT / "public/images/clean_clear_images_v2"
CLEAN_IMAGE_OUTPUT_DIR = ROOT / "public/images/projects/clean"
FALLBACK = "/images/hero/industrial-facility.jpg"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

SERVICE_COLORS = [
    "#1a4731",
    "#5ba4cf",
    "#2f8f8f",
    "#4a6fa5",
    "#8b2e2e",
    "#d64545",
    "#6b4c8a",
    "#3d4f7c",
    "#2d6a4f",
    "#457b9d",
    "#6d597a",
    "#bc6c25",
]

INDUSTRY_COLORS = [
    "#5ba4cf",
    "#d64545",
    "#2f8f8f",
    "#1a4731",
    "#4a6fa5",
    "#6b4c8a",
    "#3d4f7c",
    "#8b2e2e",
    "#457b9d",
    "#bc6c25",
    "#2d6a4f",
]

# File stems in Greenwave Web Image that use non-obvious project names.
IMAGE_STEM_MATCHERS: list[tuple[str, callable]] = [
    ("gsk", lambda project: project["id"].startswith("glaxo-smith-kline")),
    ("parker", lambda project: project["id"] == "nihon-parker"),
    ("trmn", lambda project: project["id"].startswith("tokai-rika-minda")),
]

STATE_ALIASES = {
    "up": "Uttar Pradesh",
    "andhra pradesh": "Andhra Pradesh",
    "tamil nadu": "Tamil Nadu",
    "gujarat": "Gujarat",
    "haryana": "Haryana",
    "karnataka": "Karnataka",
    "maharashtra": "Maharashtra",
    "rajasthan": "Rajasthan",
    "telangana": "Telangana",
}

CITY_ALIASES = {
    "sri city": "Sri City",
    "gurgugram": "Gurugram",
    "kosi kala": "Kosi Kala",
    "sambhaji nagar": "Sambhaji Nagar",
    "locarion": "",
}


def col_index(column: str) -> int:
    index = 0
    for char in column:
        index = index * 26 + (ord(char) - ord("A") + 1)
    return index


def title_case(value: str) -> str:
    return " ".join(part.capitalize() for part in value.split() if part)


def normalize_state(state: str) -> str:
    trimmed = state.strip()
    if not trimmed or trimmed.lower() == "state":
        return ""
    return STATE_ALIASES.get(trimmed.lower(), title_case(trimmed))


def normalize_city(city: str) -> str:
    trimmed = city.strip()
    if not trimmed:
        return ""
    if trimmed.lower() in CITY_ALIASES:
        return CITY_ALIASES[trimmed.lower()]
    return title_case(trimmed)


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def normalize_label(value: str) -> str:
    cleaned = value.lower().replace("&", " and ")
    cleaned = re.sub(r"[^a-z0-9]+", " ", cleaned)
    return " ".join(cleaned.split())


def build_web_image_catalog() -> dict[str, Path]:
    catalog: dict[str, Path] = {}
    if not WEB_IMAGE_DIR.exists():
        return catalog

    for path in WEB_IMAGE_DIR.rglob("*"):
        if path.suffix.lower() not in IMAGE_EXTENSIONS or not path.is_file():
            continue
        catalog[normalize_label(path.stem)] = path

    return catalog


def match_web_image(project: dict, catalog: dict[str, Path]) -> Path | None:
    if not catalog:
        return None

    for stem, matcher in IMAGE_STEM_MATCHERS:
        if stem in catalog and matcher(project):
            return catalog[stem]

    lookup_keys = {
        normalize_label(project["name"]),
        normalize_label(project["id"]),
    }

    if re.search(r"-\d+$", project["id"]):
        lookup_keys.add(normalize_label(re.sub(r"-\d+$", "", project["id"])))

    for key in lookup_keys:
        if key in catalog:
            return catalog[key]

        words = key.split()
        if words and words[0] in catalog:
            return catalog[words[0]]

    return None


def publish_project_image(
    project_id: str,
    source: Path,
    output_dir: Path,
    public_prefix: str,
) -> str:
    output_dir.mkdir(parents=True, exist_ok=True)
    ext = source.suffix.lower()
    destination = output_dir / f"{project_id}{ext}"

    if not destination.exists() or source.stat().st_mtime > destination.stat().st_mtime:
        shutil.copy2(source, destination)

    return f"{public_prefix}/{project_id}{ext}"


def build_clean_image_pool() -> list[Path]:
    if not CLEAN_IMAGE_DIR.exists():
        return []

    return sorted(
        path
        for path in CLEAN_IMAGE_DIR.rglob("*")
        if path.suffix.lower() in IMAGE_EXTENSIONS and path.is_file()
    )


def pick_clean_image(project_id: str, pool: list[Path]) -> Path | None:
    if not pool:
        return None

    digest = hashlib.sha256(project_id.encode()).digest()
    index = int.from_bytes(digest[:8], "big") % len(pool)
    return pool[index]


def resolve_project_image(
    project: dict,
    web_catalog: dict[str, Path],
    clean_pool: list[Path],
) -> str:
    matched = match_web_image(project, web_catalog)
    if matched:
        return publish_project_image(
            project["id"],
            matched,
            WEB_IMAGE_OUTPUT_DIR,
            "/images/projects/web",
        )

    clean_match = pick_clean_image(project["id"], clean_pool)
    if clean_match:
        return publish_project_image(
            project["id"],
            clean_match,
            CLEAN_IMAGE_OUTPUT_DIR,
            "/images/projects/clean",
        )

    return FALLBACK


def read_workbook() -> tuple[dict[int, dict[str, str]], dict[str, str]]:
    with zipfile.ZipFile(XLSX) as z:
        shared_strings: list[str] = []
        root = ET.fromstring(z.read("xl/sharedStrings.xml"))
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        for si in root.findall(".//m:si", ns):
            shared_strings.append("".join(t.text or "" for t in si.findall(".//m:t", ns)))

        root = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))

        def col_row(ref: str) -> tuple[str, int]:
            match = re.match(r"([A-Z]+)(\d+)", ref)
            assert match
            return match.group(1), int(match.group(2))

        rows: dict[int, dict[str, str]] = {}
        for cell in root.findall(".//m:c", ns):
            ref = cell.get("r")
            assert ref
            col, row = col_row(ref)
            cell_type = cell.get("t")
            value_node = cell.find("m:v", ns)
            if value_node is None:
                continue
            val = value_node.text or ""
            if cell_type == "s":
                val = shared_strings[int(val)]
            rows.setdefault(row, {})[col] = val

    legend = rows.get(3, {})
    return rows, legend


def build_column_maps(legend: dict[str, str]) -> tuple[dict[str, str], dict[str, str], list[str], list[str]]:
    service_min = col_index("I")
    service_max = col_index("AA")
    industry_min = col_index("AB")
    industry_max = col_index("AL")

    service_cols = sorted(
        [
            col
            for col in legend
            if service_min <= col_index(col) <= service_max and legend[col]
        ],
        key=col_index,
    )
    industry_cols = sorted(
        [
            col
            for col in legend
            if industry_min <= col_index(col) <= industry_max and legend[col]
        ],
        key=col_index,
    )

    service_map = {col: legend[col] for col in service_cols}
    industry_map = {col: legend[col] for col in industry_cols}
    service_titles = [service_map[col] for col in service_cols]
    industry_titles = [industry_map[col] for col in industry_cols]

    return service_map, industry_map, service_titles, industry_titles


def parse_projects() -> tuple[list[dict], list[str], list[str]]:
    rows, legend = read_workbook()
    service_map, industry_map, service_titles, industry_titles = build_column_maps(legend)
    web_image_catalog = build_web_image_catalog()
    clean_image_pool = build_clean_image_pool()

    projects: list[dict] = []
    seen_ids: dict[str, int] = {}

    for row_num in sorted(rows.keys()):
        if row_num <= 3:
            continue
        row = rows[row_num]
        name = (row.get("B") or "").strip()
        if not name or name == "Project":
            continue

        city = normalize_city(row.get("C", ""))
        state = normalize_state(row.get("D", ""))
        start = (row.get("E") or "").strip()
        end = (row.get("F") or "").strip()
        epc = (row.get("G") or "").strip()
        value_raw = (row.get("H") or "").strip()

        try:
            value_m = float(value_raw)
        except ValueError:
            value_m = 0.0

        services = sorted(service_map[col] for col in service_map if row.get(col, "") == "Yes")
        industries = sorted(industry_map[col] for col in industry_map if row.get(col, "") == "Yes")

        status = "Ongoing" if start.lower() == "ongoing" or end == "" else "Completed"
        base_id = slugify(name)
        count = seen_ids.get(base_id, 0)
        seen_ids[base_id] = count + 1
        project_id = base_id if count == 0 else f"{base_id}-{count + 1}"

        value_display = f"{int(value_m) if value_m == int(value_m) else value_m} M INR"
        location = f"{city}, {state}" if city and state else (city or state)

        project = {
            "id": project_id,
            "name": name,
            "city": city,
            "state": state,
            "location": location,
            "value": value_display,
            "valueM": value_m,
            "status": status,
            "services": services,
            "industries": industries,
            "scopeServices": [],
            "image": resolve_project_image(
                {
                    "id": project_id,
                    "name": name,
                },
                web_image_catalog,
                clean_image_pool,
            ),
            "featured": status == "Ongoing" and value_m >= 100,
        }

        if epc:
            project["epcPartner"] = epc
        if start:
            project["startYear"] = "Ongoing" if start.lower() == "ongoing" else start
        if end:
            project["endYear"] = end

        projects.append(project)

    return projects, service_titles, industry_titles


def allocate_value(value_m: float, labels: list[str]) -> dict[str, float]:
    if not labels or value_m <= 0:
        return {}
    share = value_m / len(labels)
    return {label: share for label in labels}


def build_distribution_segments(
    totals: dict[str, float],
    colors: list[str],
) -> list[dict]:
    if not totals:
        return []

    ordered = sorted(totals.items(), key=lambda item: item[1], reverse=True)
    grand_total = sum(value for _, value in ordered)
    if grand_total <= 0:
        return []

    raw_percentages = [(label, value / grand_total * 100) for label, value in ordered]
    rounded = [round(percentage, 1) for _, percentage in raw_percentages]
    delta = round(100 - sum(rounded), 1)
    if rounded and delta:
        rounded[0] = round(rounded[0] + delta, 1)

    segments: list[dict] = []
    for index, ((label, _), percentage) in enumerate(zip(raw_percentages, rounded)):
        segments.append(
            {
                "id": slugify(label),
                "label": label,
                "percentage": percentage,
                "color": colors[index % len(colors)],
            }
        )

    return segments


def build_distribution(projects: list[dict]) -> tuple[list[dict], list[dict]]:
    service_totals: dict[str, float] = {}
    industry_totals: dict[str, float] = {}

    for project in projects:
        value_m = float(project.get("valueM") or 0)
        for label, share in allocate_value(value_m, project.get("services", [])).items():
            service_totals[label] = service_totals.get(label, 0) + share
        for label, share in allocate_value(value_m, project.get("industries", [])).items():
            industry_totals[label] = industry_totals.get(label, 0) + share

    return (
        build_distribution_segments(service_totals, SERVICE_COLORS),
        build_distribution_segments(industry_totals, INDUSTRY_COLORS),
    )


def write_taxonomy_file(service_titles: list[str], industry_titles: list[str]) -> None:
    services_body = json.dumps(service_titles, indent=2, ensure_ascii=False)
    industries_body = json.dumps(industry_titles, indent=2, ensure_ascii=False)
    content = f"""// Auto-generated by scripts/import_projects.py — do not edit manually.

export const SERVICE_TITLES = {services_body} as const;

export const INDUSTRY_TITLES = {industries_body} as const;

export type ServiceTitle = (typeof SERVICE_TITLES)[number];
export type IndustryTitle = (typeof INDUSTRY_TITLES)[number];
"""
    TAXONOMY_OUTPUT.write_text(content, encoding="utf-8")


def write_distribution_file(service_segments: list[dict], industry_segments: list[dict]) -> None:
    service_body = json.dumps(service_segments, indent=2, ensure_ascii=False)
    industry_body = json.dumps(industry_segments, indent=2, ensure_ascii=False)
    content = f"""// Auto-generated by scripts/import_projects.py — do not edit manually.
export type DistributionSegment = {{
  id: string;
  label: string;
  percentage: number;
  color: string;
}};

export const portfolioDistributionIntro =
  "Execution portfolio value derived from the FY25–26 project register — using the exact service and industry columns defined in the spreadsheet.";

export const portfolioDistributionPeriod = "FY25–26";

export const serviceSegments: DistributionSegment[] = {service_body};

export const industrySegments: DistributionSegment[] = {industry_body};
"""
    DISTRIBUTION_OUTPUT.write_text(content, encoding="utf-8")


def main() -> None:
    projects, service_titles, industry_titles = parse_projects()
    body = json.dumps(projects, indent=2, ensure_ascii=False)
    content = f"""// Auto-generated by scripts/import_projects.py — do not edit manually.
import type {{ Project }} from "@/content/taxonomy";

export const projects: Project[] = {body};

export type {{ Project }};
"""
    OUTPUT.write_text(content, encoding="utf-8")
    print(f"Wrote {len(projects)} projects to {OUTPUT}")

    write_taxonomy_file(service_titles, industry_titles)
    print(
        f"Wrote taxonomy to {TAXONOMY_OUTPUT} "
        f"({len(service_titles)} services, {len(industry_titles)} industries)"
    )

    service_segments, industry_segments = build_distribution(projects)
    write_distribution_file(service_segments, industry_segments)
    print(
        f"Wrote distribution segments to {DISTRIBUTION_OUTPUT} "
        f"({len(service_segments)} services, {len(industry_segments)} industries)"
    )

    matched_web_images = sum(
        1 for project in projects if project["image"].startswith("/images/projects/web/")
    )
    matched_clean_images = sum(
        1 for project in projects if project["image"].startswith("/images/projects/clean/")
    )
    print(f"Assigned Greenwave Web Image photos to {matched_web_images} projects")
    print(f"Assigned clean_clear_images_v2 photos to {matched_clean_images} projects")


if __name__ == "__main__":
    main()
