#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""건마타운 정적 HTML → sitemap.xml (https://gunmatown.com)."""
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
import json
import xml.etree.ElementTree as ET

BASE_URL = "https://gunmatown.com"
ROOT = Path(__file__).resolve().parent
OUTPUT_FILE = ROOT / "sitemap.xml"
ROBOTS_TXT = ROOT / "robots.txt"
SHOPS_JSON = ROOT / "shops.json"
CARD_DATA = ROOT / "js" / "shop-card-data.js"

SKIP_NAMES = {
    "shop-edit.html",
    "login.html",
}

SKIP_PREFIXES = (
    "google",
    "naver",
)


def get_disallowed_names() -> set[str]:
    names = set(SKIP_NAMES)
    if not ROBOTS_TXT.exists():
        return names
    for raw in ROBOTS_TXT.read_text(encoding="utf-8").splitlines():
        line = raw.split("#", 1)[0].strip()
        if not line.lower().startswith("disallow:"):
            continue
        path = line.split(":", 1)[1].strip().lstrip("/")
        if path.endswith(".html"):
            names.add(path)
    return names


def shop_ids() -> list[str]:
    ids: list[str] = []
    if SHOPS_JSON.exists():
        try:
            data = json.loads(SHOPS_JSON.read_text(encoding="utf-8"))
            for shop in data.get("shops") or []:
                sid = shop.get("id")
                if sid is not None:
                    ids.append(str(sid))
            if ids:
                return ids
        except Exception:
            pass
    if CARD_DATA.exists():
        text = CARD_DATA.read_text(encoding="utf-8")
        text = text.replace("window.shopCardData =", "", 1).strip()
        if text.endswith(";"):
            text = text[:-1]
        try:
            shops = json.loads(text)
            for shop in shops:
                sid = shop.get("id")
                if sid is not None:
                    ids.append(str(sid))
        except Exception:
            pass
    return ids


def is_skipped(name: str) -> bool:
    lower = name.lower()
    if name in get_disallowed_names():
        return True
    return any(lower.startswith(p) for p in SKIP_PREFIXES)


def compute_priority(filename: str) -> float:
    if filename == "index.html":
        return 1.0
    if filename == "detail.html":
        return 0.5
    if filename == "nearby.html":
        return 0.4
    hyphens = filename.count("-")
    if hyphens == 0:
        return 0.9
    if hyphens <= 2:
        return 0.8
    return 0.6


def canonical_url(name: str) -> str:
    if name == "index.html":
        return BASE_URL + "/"
    return f"{BASE_URL}/{name}"


def build_url(urlset: ET.Element, loc: str, lastmod: datetime, priority: float, changefreq: str) -> None:
    url = ET.SubElement(urlset, "url")
    ET.SubElement(url, "loc").text = loc
    ET.SubElement(url, "lastmod").text = lastmod.strftime("%Y-%m-%d")
    ET.SubElement(url, "changefreq").text = changefreq
    ET.SubElement(url, "priority").text = f"{priority:.1f}"


def iter_html_files() -> list[Path]:
    files = [p for p in ROOT.glob("*.html") if p.is_file() and not is_skipped(p.name)]
    files.sort(key=lambda p: (p.name != "index.html", p.name))
    return files


def indent(element: ET.Element, level: int = 0) -> None:
    pad = "\n" + "  " * level
    if len(element):
        if not element.text or not element.text.strip():
            element.text = pad + "  "
        for child in element:
            indent(child, level + 1)
            if not child.tail or not child.tail.strip():
                child.tail = pad + "  "
        if not element[-1].tail or not element[-1].tail.strip():
            element[-1].tail = pad
    elif level and (not element.tail or not element.tail.strip()):
        element.tail = pad


def generate_sitemap() -> tuple[ET.ElementTree, int]:
    urlset = ET.Element("urlset", attrib={"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"})
    today = datetime.now(timezone.utc)
    count = 0
    for html_file in iter_html_files():
        lastmod = datetime.fromtimestamp(html_file.stat().st_mtime, tz=timezone.utc)
        name = html_file.name
        changefreq = "daily" if name == "index.html" else "weekly"
        build_url(urlset, canonical_url(name), lastmod, compute_priority(name), changefreq)
        count += 1
        if name == "detail.html":
            for sid in shop_ids():
                build_url(
                    urlset,
                    f"{BASE_URL}/detail.html?id={sid}",
                    lastmod,
                    0.5,
                    "weekly",
                )
                count += 1
    return ET.ElementTree(urlset), count


def main() -> None:
    print("sitemap.xml 생성 중…")
    tree, count = generate_sitemap()
    indent(tree.getroot())
    tree.write(OUTPUT_FILE, encoding="utf-8", xml_declaration=True)
    print(f"[완료] {count}개 URL → {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
