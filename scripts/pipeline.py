#!/usr/bin/env python3
"""
Jinssi Gaming - Autonomous Journal Pipeline Orchestrator
========================================================
Orchestrates:
1. scraper_worker.py: Natural search queries via You.com & Valve Steam API
2. guide_worker.py: Hardware guides (PC Build with part photos & Amazon/eBay links, Laptop Guide, Handheld Guide)
3. writer_worker.py: Full-length game reviews (1,200+ words each) & Esports Reports

Rotation lifecycle: 7 Days (1 Week) per cycle.
Silent background rotation with zero UI clutter.
"""

import sys
import os
import time
import json
import urllib.request
from datetime import datetime

# Import modular workers
from guide_worker import (
    build_budget_laptop_guide,
    build_budget_pc_build_guide,
    build_handheld_faceoff_guide,
)
from writer_worker import (
    build_full_steam_game_article,
    build_esports_championship_report,
)

SUPABASE_URL = "https://esjwkwgjnesyvnvuonmd.supabase.co"
SUPABASE_KEY = "sb_publishable_AlvHUSVaBIQMqj6vRuNsww_Uokx0SsJ"

# 7-day lifespan in milliseconds (7 days * 24 hours * 3600 seconds * 1000 ms)
SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000


def run_pipeline() -> list:
    """Executes all workers and compiles the weekly publication catalog."""
    now_ms = int(datetime.now().timestamp() * 1000)
    expires_ms = now_ms + SEVEN_DAYS_MS

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 🚀 Running Jinssi Autonomous Publishing Pipeline (7-Day Cycle)...")
    articles = []

    # 1. Hardware Guides (Guide Worker)
    print("  [GuideWorker] Generating PC Build Guide with part photos & buy links...")
    try:
        pc_guide = build_budget_pc_build_guide(now_ms, expires_ms)
        if pc_guide:
            articles.append(pc_guide)
            print(f"  ✓ Added: '{pc_guide['title']}'")
    except Exception as e:
        print(f"  ✗ PC Build guide failed: {e}", file=sys.stderr)

    print("  [GuideWorker] Generating Best Budget Gaming Laptop Guide...")
    try:
        laptop_guide = build_budget_laptop_guide(now_ms, expires_ms)
        if laptop_guide:
            articles.append(laptop_guide)
            print(f"  ✓ Added: '{laptop_guide['title']}'")
    except Exception as e:
        print(f"  ✗ Laptop guide failed: {e}", file=sys.stderr)

    print("  [GuideWorker] Generating Handheld Gaming Face-Off Guide...")
    try:
        handheld_guide = build_handheld_faceoff_guide(now_ms, expires_ms)
        if handheld_guide:
            articles.append(handheld_guide)
            print(f"  ✓ Added: '{handheld_guide['title']}'")
    except Exception as e:
        print(f"  ✗ Handheld guide failed: {e}", file=sys.stderr)

    # 2. Esports Championship Report (Writer Worker)
    print("  [WriterWorker] Generating Global Esports Championship Intelligence...")
    try:
        esports_art = build_esports_championship_report(now_ms, expires_ms)
        if esports_art:
            articles.append(esports_art)
            print(f"  ✓ Added: '{esports_art['title']}'")
    except Exception as e:
        print(f"  ✗ Esports report failed: {e}", file=sys.stderr)

    # 3. Full-Length Game Reviews (Writer Worker + Steam Store API)
    featured_steam_games = [
        (2198150, "Review", "Diorama Castle Builder"),
        (1796790, "Review", "Culinary Adventure RPG"),
        (2666510, "Guide", "Desktop Idle Farming"),
        (2113850, "Curated List", "Lofi Focus Companion"),
        (1158160, "Guide", "Tropical Island Sim"),
        (1455840, "Cozy Essay", "Zen Tile Puzzler"),
        (1135690, "Cozy Essay", "Peaceful Mountain Journey"),
    ]

    print("  [WriterWorker] Generating full-length (1,200+ word) game reviews...")
    for app_id, category, tag in featured_steam_games:
        try:
            art = build_full_steam_game_article(app_id, category, tag, now_ms, expires_ms)
            if art:
                articles.append(art)
                print(f"  ✓ Added: '{art['title']}'")
        except Exception as e:
            print(f"  ✗ Failed for Steam app {app_id}: {e}", file=sys.stderr)

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 📦 Compiled {len(articles)} comprehensive articles.")
    return articles


def sync_to_supabase(articles: list) -> bool:
    """Syncs the compiled articles to the remote Supabase database."""
    print(f"[{datetime.now().strftime('%H:%M:%S')}] 💾 Syncing articles to Supabase...")

    # Fetch current content row to preserve games, tv, stories, products
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
        print(f"[Pipeline] Failed to fetch current Supabase row: {e}", file=sys.stderr)
        return False

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
        print("🎉 One-shot pipeline completed successfully.")
        return

    print("🚀 Jinssi Publishing Daemon running in background on a 7-day silent rotation...")
    while True:
        # Sleep for 7 days (or wake up check every 6 hours)
        time.sleep(6 * 3600)
        # Check expiration
        now_ms = int(datetime.now().timestamp() * 1000)
        expires_at = articles[0]["expiresAt"] if articles and "expiresAt" in articles[0] else now_ms
        if now_ms >= expires_at - (3600 * 1000):
            print("⏳ 7-day cycle expiring. Running new publication rotation...")
            articles = run_pipeline()
            if articles:
                sync_to_supabase(articles)


if __name__ == "__main__":
    main()
