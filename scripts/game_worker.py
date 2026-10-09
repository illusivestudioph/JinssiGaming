#!/usr/bin/env python3
"""
Jinssi Gaming - Game Article Worker
====================================
Discovers games dynamically via You.com search.
Fetches REAL game descriptions + gameplay screenshots from Valve's Steam Store API.
Articles use the actual developer-written description as body text.
Carousel showcases authentic in-game gameplay screenshots (path_full from Steam CDN).
Zero hardcoded game titles, app IDs, or template filler.
"""

import sys
import re
import json
import urllib.request
import urllib.parse
from datetime import datetime

from scraper_worker import search_you_web, clean_html, HEADERS


def discover_steam_games(queries: list, max_games: int = 6) -> list:
    """Discovers Steam app IDs dynamically via You.com natural search."""
    seen = set()
    app_ids = []

    for q in queries:
        if len(app_ids) >= max_games:
            break
        hits = search_you_web(q, count=8)
        for h in hits:
            url = h.get("url", "")
            m = re.search(r"store\.steampowered\.com/app/(\d+)", url)
            if m:
                aid = m.group(1)
                if aid not in seen:
                    seen.add(aid)
                    app_ids.append(aid)
                    if len(app_ids) >= max_games:
                        break
    return app_ids


def _fetch_steam_details(app_id: str) -> dict:
    """Fetches full game data from Steam Store API."""
    url = f"https://store.steampowered.com/api/appdetails?appids={app_id}&l=english"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get(str(app_id), {}).get("data", {})
    except Exception as e:
        print(f"  [GameWorker] Steam API error for {app_id}: {e}", file=sys.stderr)
        return {}


def _html_to_paragraphs(html_text: str) -> list:
    """Converts Steam's HTML description into clean paragraph list."""
    if not html_text:
        return []
    # Split on <br>, <p>, <h2>, <li> tags to get individual text blocks
    blocks = re.split(r'<(?:br|/p|/li|/h2|/div)\s*/?\s*>', html_text, flags=re.IGNORECASE)
    paragraphs = []
    for block in blocks:
        cleaned = clean_html(block)
        # Only keep paragraphs that are real content (not just a word or bullet header)
        if len(cleaned) > 30:
            paragraphs.append(cleaned)
    return paragraphs


def build_game_article(app_id: str, now_ms: int, expires_ms: int) -> dict:
    """Builds a game article from real Steam data with gameplay screenshot carousel."""
    data = _fetch_steam_details(app_id)
    if not data:
        return None

    name = data.get("name", "")
    if not name:
        return None

    developers = ", ".join(data.get("developers", [])) or "Independent Studio"
    publishers = ", ".join(data.get("publishers", [])) or developers
    steam_link = f"https://store.steampowered.com/app/{app_id}/"
    short_desc = clean_html(data.get("short_description", ""))

    # Real gameplay screenshots from Valve CDN
    raw_screenshots = data.get("screenshots", [])
    gameplay_images = [s.get("path_full") for s in raw_screenshots if s.get("path_full")]
    if not gameplay_images:
        print(f"  [GameWorker] Skipping {name}: no screenshots", file=sys.stderr)
        return None

    cover_image = gameplay_images[0]

    # Real game description written by the developer
    about_html = data.get("about_the_game", "") or data.get("detailed_description", "")
    paragraphs = _html_to_paragraphs(about_html)

    # If the developer description is too thin, use detailed_description
    if len(paragraphs) < 3 and data.get("detailed_description"):
        paragraphs = _html_to_paragraphs(data["detailed_description"])

    # Build gameplay screenshot carousel
    gallery = []
    for idx, img_url in enumerate(gameplay_images[:12]):
        gallery.append({
            "url": img_url,
            "alt": f"{name} gameplay screenshot {idx + 1}"
        })

    # Extract genres, categories for tags
    genres = [g.get("description", "") for g in data.get("genres", [])]
    categories = [c.get("description", "") for c in data.get("categories", []) if c.get("description")]

    # Build sections using REAL content
    sections = []

    # Section 1: Overview with the real description + gallery
    overview_content = []
    if short_desc:
        overview_content.append(short_desc)
    # Add real developer paragraphs
    overview_content.extend(paragraphs[:4])
    if not overview_content:
        overview_content.append(f"{name} by {developers}.")

    sections.append({
        "heading": f"About {name}",
        "content": overview_content,
        "gallery": gallery,
        "image": gameplay_images[1] if len(gameplay_images) > 1 else gameplay_images[0],
        "imageAlt": f"{name} in-game gameplay",
        "steamLink": steam_link,
        "sourceLink": steam_link,
    })

    # Section 2: More details if we have enough content
    if len(paragraphs) > 4:
        sections.append({
            "heading": "Features & Gameplay Details",
            "content": paragraphs[4:8],
            "image": gameplay_images[3] if len(gameplay_images) > 3 else None,
            "imageAlt": f"{name} gameplay detail",
        })

    # Section 3: System requirements + developer info
    pc_reqs = data.get("pc_requirements", {})
    min_req_html = pc_reqs.get("minimum", "") if isinstance(pc_reqs, dict) else ""
    min_req_text = clean_html(min_req_html) if min_req_html else ""

    tech_content = [
        f"Developer: {developers} | Publisher: {publishers}",
    ]
    if genres:
        tech_content.append(f"Genres: {', '.join(genres[:5])}")
    if min_req_text and len(min_req_text) > 20:
        tech_content.append(f"Minimum PC Requirements: {min_req_text[:300]}")

    supported = []
    for cat in categories:
        if cat and len(cat) > 2:
            supported.append(cat)
    if supported:
        tech_content.append(f"Supported Features: {', '.join(supported[:6])}")

    sections.append({
        "heading": "Technical Details & System Requirements",
        "content": tech_content,
        "image": gameplay_images[-1] if len(gameplay_images) > 2 else None,
        "imageAlt": f"{name} screenshot",
        "steamLink": steam_link,
        "sourceLink": steam_link,
    })

    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:50]

    # Calculate read time from real content length
    total_words = sum(len(p.split()) for p in overview_content + paragraphs)
    read_time = max(4, total_words // 200)

    return {
        "id": f"game-{slug}-{now_ms}",
        "slug": f"{slug}-review-{now_ms}",
        "title": f"{name}: In-Depth Review & Gameplay Gallery",
        "subtitle": short_desc or f"A deep dive into {name} on PC.",
        "author": "Jinssi Games Desk",
        "authorRole": "Senior Games Reviewer",
        "date": datetime.now().strftime("%b %d, %Y"),
        "readTimeMinutes": read_time,
        "category": "Review",
        "tags": [name] + genres[:3] + ["PC Gaming", "Game Review"],
        "coverImage": cover_image,
        "coverAlt": f"{name} in-game gameplay screenshot",
        "summary": short_desc or f"Full review of {name} with real gameplay screenshots.",
        "steamLink": steam_link,
        "sourceLink": steam_link,
        "createdAt": now_ms,
        "expiresAt": expires_ms,
        "sections": sections,
    }


if __name__ == "__main__":
    now = int(datetime.now().timestamp() * 1000)
    exp = now + 7 * 24 * 3600 * 1000
    ids = discover_steam_games(["best cozy games site:store.steampowered.com/app/"], max_games=2)
    print(f"Discovered: {ids}")
    for aid in ids:
        art = build_game_article(aid, now, exp)
        if art:
            print(f"✓ {art['title']} | Gallery: {len(art['sections'][0].get('gallery', []))} shots")
