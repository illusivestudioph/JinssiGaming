#!/usr/bin/env python3
"""
Jinssi Gaming - Master Autonomous Pipeline Orchestrator
=======================================================
100% Dynamic, Zero-Hardcoded Publication Engine:
1. Dynamic Steam Game Discovery via You.com:
   Natural queries discover trending games dynamically.
   Builds deep, long-form reviews with authentic in-game gameplay screenshots (Valve CDN)
   embedded in every section plus a multi-screenshot gameplay carousel.
2. Real Gaming Journalism from Rock Paper Shotgun & Eurogamer:
   Real human-written stories with authentic in-game photography.
3. Zero AI Images. Zero Hardcoded Game Titles or App IDs.
4. Silent 7-Day Weekly Lifespan Rotation.
"""

import sys
import os
import time
import json
import urllib.request
from datetime import datetime

from writer_worker import (
    discover_steam_games_via_you,
    build_long_form_game_article,
    fetch_real_journalism_feed_articles,
)

SUPABASE_URL = "https://esjwkwgjnesyvnvuonmd.supabase.co"
SUPABASE_KEY = "sb_publishable_AlvHUSVaBIQMqj6vRuNsww_Uokx0SsJ"

SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000


def run_pipeline() -> list:
    now_ms = int(datetime.now().timestamp() * 1000)
    expires_ms = now_ms + SEVEN_DAYS_MS

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 🚀 Running Jinssi Autonomous Pipeline (100% Dynamic Discovery, 7-Day Cycle)...")
    articles = []

    # 1. Dynamic Game Discovery via You.com & Deep Steam Gameplay Reviews
    queries = [
        "best cozy games to play right now site:store.steampowered.com/app/",
        "top rated relaxing indie games site:store.steampowered.com/app/"
    ]
    print("  [Step 1] Querying You.com to dynamically discover trending games on Steam...")
    discovered_app_ids = discover_steam_games_via_you(queries, max_games=8)
    print(f"  ✓ Discovered {len(discovered_app_ids)} game app IDs dynamically: {discovered_app_ids}")

    print("  [Step 2] Building long-form reviews with authentic in-game gameplay screenshots...")
    for app_id in discovered_app_ids:
        try:
            art = build_long_form_game_article(app_id, now_ms, expires_ms)
            if art:
                articles.append(art)
                print(f"  ✓ Added: '{art['title']}' (Carousel: {len(art['sections'][0].get('gallery') or [])} gameplay shots)")
        except Exception as e:
            print(f"  ✗ App ID {app_id} error: {e}", file=sys.stderr)

    # 2. Real Gaming Journalism from Rock Paper Shotgun & Eurogamer
    print("  [Step 3] Fetching authentic human-written stories from Rock Paper Shotgun & Eurogamer...")
    try:
        journalism_arts = fetch_real_journalism_feed_articles(max_articles=4)
        articles.extend(journalism_arts)
        print(f"  ✓ Added {len(journalism_arts)} authentic journalism stories.")
    except Exception as e:
        print(f"  ✗ Journalism feed error: {e}", file=sys.stderr)

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 📦 Compiled {len(articles)} genuine, long-form articles with real gameplay screenshots.")
    return articles


def sync_to_supabase(articles: list) -> bool:
    print(f"[{datetime.now().strftime('%H:%M:%S')}] 💾 Syncing articles to Supabase...")

    get_req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/site_content?id=eq.default&select=content",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        },
    )

    current_content = {}
    try:
        with urllib.request.urlopen(get_req, timeout=12) as resp:
            rows = json.loads(resp.read().decode("utf-8"))
            if rows and len(rows) > 0:
                current_content = rows[0].get("content", {})
    except Exception as e:
        print(f"[Pipeline] Error fetching Supabase row: {e}", file=sys.stderr)
        return False

    # Overwrite articles with 100% real, authentic articles
    current_content["articles"] = articles
    current_content["updated_at"] = datetime.utcnow().isoformat() + "Z"

    payload = json.dumps({"id": "default", "content": current_content}).encode("utf-8")
    upsert_req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/site_content",
        data=payload,
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(upsert_req, timeout=15) as resp:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✨ Successfully synced to Supabase! Status: {resp.status}")
            return True
    except Exception as e:
        print(f"[Pipeline] Failed to upsert to Supabase: {e}", file=sys.stderr)
        return False


def main():
    daemon_mode = "--daemon" in sys.argv or "--watch" in sys.argv

    articles = run_pipeline()
    if not articles:
        print("[Pipeline] No articles compiled.", file=sys.stderr)
        return

    success = sync_to_supabase(articles)
    if not success:
        print("[Pipeline] Supabase sync failed.", file=sys.stderr)
        return

    if not daemon_mode:
        print("🎉 One-shot dynamic pipeline completed successfully.")
        return

    print("🚀 Jinssi Publishing Daemon running in background on a 7-day silent rotation...")
    while True:
        time.sleep(6 * 3600)
        now_ms = int(datetime.now().timestamp() * 1000)
        expires_at = articles[0]["expiresAt"] if articles and "expiresAt" in articles[0] else now_ms
        if now_ms >= expires_at - (3600 * 1000):
            print("⏳ 7-day cycle expiring. Running dynamic publication rotation...")
            articles = run_pipeline()
            if articles:
                sync_to_supabase(articles)


if __name__ == "__main__":
    main()
