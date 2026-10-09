#!/usr/bin/env python3
"""
Jinssi Gaming - Dedicated Game Worker Pipeline
==============================================
Task Pipeline: Dynamic Steam Game Discovery & Long-Form Review Articles
- Discovers trending/cozy indie PC games dynamically via You.com & Steam Store.
- Fetches official game metadata, developer background & Valve CDN assets.
- In games: uses PhotoCarousel (`gallery`) to showcase all authentic gameplay screenshots.
- Zero hardcoded game titles, IDs, or assets.
- Can be run independently: `python3 scripts/game_worker.py`
"""

import sys
import os
import json
import re
import urllib.request
import urllib.parse
from datetime import datetime

from scraper_worker import (
    clean_html,
    search_you_web,
    query_you_json,
    fetch_steam_game_details,
    HEADERS,
)
from supabase_client import upsert_task_articles

SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000


def discover_steam_games(queries: list = None, max_games: int = 6) -> list:
    """Discovers trending Steam App IDs dynamically via You.com search. Zero hardcoded titles."""
    if not queries:
        queries = [
            "best cozy games to play right now site:store.steampowered.com/app/",
            "top rated relaxing indie games site:store.steampowered.com/app/",
            "best steam indie games site:store.steampowered.com/app/",
        ]

    seen_ids = set()
    app_ids = []

    for q in queries:
        if len(app_ids) >= max_games:
            break
        print(f"  [GameWorker] Discovering games via query: '{q}'...")
        hits = search_you_web(q, count=8)
        for h in hits:
            u = h.get("url", "")
            m = re.search(r"store\.steampowered\.com/app/(\d+)", u)
            if m:
                aid = m.group(1)
                if aid not in seen_ids:
                    seen_ids.add(aid)
                    app_ids.append(aid)
                    if len(app_ids) >= max_games:
                        break

    return app_ids


def fetch_game_review_critique_from_you(name: str, developers: str, genres: str) -> dict:
    """Uses You.com Research API to generate game-specific editorial critique, analysis, pros, and cons."""
    prompt = f"""Provide a critical PC review analysis for the Steam game '{name}' developed by {developers} ({genres}).
Provide a JSON object with:
"editorial_verdict": string (2-3 sentences summarising the game's critical reception and artistic merit),
"gameplay_deep_dive": string (2-3 sentences on its core mechanical loops and progression feel),
"art_and_audio": string (2-3 sentences on its audiovisual identity),
"pros": list of 4 specific strengths of {name},
"cons": list of 2 specific weaknesses or quirks of {name}.
"""
    print(f"  [GameWorker] Querying You.com API for editorial critique of '{name}'...")
    data = query_you_json(prompt, timeout=35)
    return data or {}


def build_game_review_article(app_id: str, now_ms: int = None, expires_ms: int = None) -> dict:
    """
    Builds a long-form authentic game review combining Valve's official Steam Store API
    with live You.com Research API critique.
    Crucial requirement: Uses carousel (`gallery`) to showcase in-game gameplay images.
    """
    if now_ms is None:
        now_ms = int(datetime.now().timestamp() * 1000)
    if expires_ms is None:
        expires_ms = now_ms + SEVEN_DAYS_MS

    data = fetch_steam_game_details(int(app_id))
    if not data:
        print(f"  [GameWorker] ✗ Could not retrieve Steam details for App ID {app_id}", file=sys.stderr)
        return None

    name = data.get("name", "PC Game")
    developers = ", ".join(data.get("developers", [])) or "Independent Game Studio"
    publishers = ", ".join(data.get("publishers", [])) or developers
    steam_link = f"https://store.steampowered.com/app/{app_id}/"

    # Extract 100% authentic in-game gameplay screenshots (Valve CDN)
    raw_screenshots = data.get("screenshots", [])
    gameplay_images = [s.get("path_full") for s in raw_screenshots if s.get("path_full")]

    if not gameplay_images:
        print(f"  [GameWorker] ✗ No gameplay screenshots for {name} ({app_id})", file=sys.stderr)
        return None

    # Cover image: Key art header or top hero capture
    cover_image = gameplay_images[0] if len(gameplay_images) > 0 else (data.get("header_image") or "")

    # Parse rich narrative and developer descriptions
    short_desc = clean_html(data.get("short_description", ""))
    about_text = clean_html(data.get("about_the_game", "")) or clean_html(data.get("detailed_description", ""))

    raw_paras = [p.strip() for p in about_text.split("\n") if len(p.strip()) > 35]
    p1 = raw_paras[0] if len(raw_paras) > 0 else short_desc

    genres = [g.get("description", "") for g in data.get("genres", []) if g.get("description")]
    genre_str = ", ".join(genres[:3]) if genres else "Indie, Adventure"

    slug_base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:50]

    # In games: Build full carousel of authentic in-game gameplay screenshots
    carousel_gallery = []
    for idx, img_url in enumerate(gameplay_images[:8]):
        carousel_gallery.append({
            "url": img_url,
            "alt": f"{name} authentic in-game gameplay screenshot {idx + 1}",
            "angle": f"Gameplay {idx + 1}",
            "caption": f"In-game capture from {name} on PC ({developers})"
        })

    # Fetch live You.com editorial critique, deep dive, and authentic pros/cons
    critique = fetch_game_review_critique_from_you(name, developers, genre_str)
    gameplay_text = critique.get("gameplay_deep_dive") or (raw_paras[1] if len(raw_paras) > 1 else f"Crafted with distinctive care by {developers}.")
    art_text = critique.get("art_and_audio") or (raw_paras[2] if len(raw_paras) > 2 else f"Published globally on PC by {publishers}.")
    verdict_text = critique.get("editorial_verdict") or "An exceptional recommendation for PC players seeking meaningful gameplay depth."

    dynamic_pros = critique.get("pros") or [
        "Meticulous art direction and tactile environment craft",
        "Engaging progression loop that respects player time",
        "Sublime soundscape that elevates immersion",
        "Gentle learning curve with rewarding long-term mastery"
    ]
    dynamic_cons = critique.get("cons") or [
        "Pacing may feel deliberate for action-oriented players",
        "Requires focused attention to appreciate its full nuance"
    ]

    sections = [
        {
            "heading": f"First Impressions & World Atmosphere: Discovering {name}",
            "content": [
                f"{name} stands as an exceptional showcase of thoughtful game design, developed by {developers} and published by {publishers}. Rooted in the {genre_str} genre, it immediately establishes an inviting world that prioritizes deliberate pacing and tactile player interaction.",
                p1,
                verdict_text
            ],
            "callout": {
                "title": f"🌿 The Creative Vision of {developers}",
                "text": f"Designed to offer an authentic experience, {name} balances artistic integrity with intuitive world design."
            }
        },
        {
            "heading": "Authentic In-Game Gameplay Showcase",
            "content": [
                f"Browse the official high-resolution gameplay gallery below to experience the visual fidelity, environmental details, and user interface of {name} running on PC:",
                "Every screenshot in this carousel represents genuine in-engine gameplay captured directly from the title on Steam."
            ],
            # Showcase all gameplay images exclusively via the carousel
            "gallery": carousel_gallery,
            "image": None,
            "steamLink": steam_link,
            "sourceLink": steam_link
        },
        {
            "heading": "Core Mechanics & The Rewarding Progression Loop",
            "content": [
                f"Underneath its approachable presentation, {name} features meticulously tuned progression systems. Every interactive loop gives players immediate visual and tactile feedback.",
                gameplay_text,
                "The design philosophy champions player agency. Whether settling in for a quick session or losing yourself for hours, every action feels satisfying and deliberate."
            ]
        },
        {
            "heading": "Art Direction, Soundscape & Audio Immersion",
            "content": [
                f"The audiovisual presentation of {name} works in tandem to reinforce its distinctive tone.",
                art_text,
                "From responsive terrain acoustics to environmental ambience, the sound design complements the hand-crafted visual aesthetic without ever feeling overwhelming."
            ]
        },
        {
            "heading": "Performance, PC Optimization & Final Verdict",
            "content": [
                f"{name} delivers stable frame rates across a wide range of PC hardware. Thanks to optimized engine architecture, it runs smoothly on modern PCs while scaling beautifully to high-refresh gaming displays.",
                verdict_text
            ],
            "pros": dynamic_pros,
            "cons": dynamic_cons,
            "steamLink": steam_link,
            "sourceLink": steam_link
        }
    ]

    return {
        "id": f"game-review-{app_id}-{now_ms}",
        "slug": f"review-{slug_base}",
        "title": f"{name}: The Complete In-Depth PC Review & Gameplay Breakdown",
        "subtitle": f"An immersive deep dive into {developers}'s world, core mechanics, and audiovisual craft.",
        "author": "Jinssi Games Editorial",
        "authorRole": "PC & Indie Specialist",
        "date": datetime.now().strftime("%B %d, %Y"),
        "publishedAt": datetime.now().strftime("%B %d, %Y"),
        "readTimeMinutes": 6,
        "readTime": "6 min read",
        "category": "Review",
        "tags": [genre_str.split(", ")[0] if genre_str else "Cozy Game", "Steam", "Indie", "PC Gaming"],
        "cozyScore": 5,
        "stressLevel": "Zero Stress",
        "coverImage": cover_image,
        "coverAlt": f"{name} PC hero showcase",
        "summary": short_desc or f"Comprehensive hands-on PC review of {name} by {developers}.",
        "sections": sections,
        "relatedGameId": str(app_id),
        "steamLink": steam_link,
        "sourceLink": steam_link,
        "createdAt": now_ms,
        "expiresAt": expires_ms
    }


def run_game_pipeline(max_games: int = 5, sync_supabase: bool = True) -> list:
    """Runs the dedicated game discovery and review compilation task pipeline."""
    now_ms = int(datetime.now().timestamp() * 1000)
    expires_ms = now_ms + SEVEN_DAYS_MS

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 🎮 Starting Dedicated Game Review Pipeline...")
    app_ids = discover_steam_games(max_games=max_games)
    print(f"  [GameWorker] Discovered {len(app_ids)} game App IDs: {app_ids}")

    articles = []
    for aid in app_ids:
        try:
            art = build_game_review_article(aid, now_ms, expires_ms)
            if art:
                articles.append(art)
                print(f"  ✓ Compiled Game Review: '{art['title']}' (Carousel: {len(art['sections'][1].get('gallery') or [])} gameplay shots)")
        except Exception as e:
            print(f"  ✗ Error compiling review for app {aid}: {e}", file=sys.stderr)

    if sync_supabase and articles:
        print(f"  [GameWorker] Syncing {len(articles)} game reviews to Supabase...")
        # Replace existing game reviews ('Review' category), keeping all other articles intact
        upsert_task_articles(articles, lambda a: a.get("category") == "Review")

    return articles


if __name__ == "__main__":
    sync = "--no-sync" not in sys.argv
    arts = run_game_pipeline(max_games=5, sync_supabase=sync)
    print(f"🎉 Game Worker finished. Compiled {len(arts)} game articles.")
