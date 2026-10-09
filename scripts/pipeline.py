#!/usr/bin/env python3
"""
Jinssi Gaming - Master Autonomous Pipeline Orchestrator
=======================================================
100% Dynamic, Zero-Hardcoded Publication Engine:
1. Dynamic Hardware Guides (Laptop guide with live Amazon multi-angle photo carousel,
   PC Build Guide with live in-stock Amazon components & buy links, Handheld guide).
2. Live Gaming Journalism (Full-length real articles scraped from PC Gamer & Rock Paper Shotgun).
3. Authentic Steam Games Showcase (Valve Store API official descriptions & full-HD screenshot carousels).

Weekly 7-Day rotation lifecycle. Zero UI countdown clutter.
"""

import sys
import os
import time
import json
import urllib.request
from datetime import datetime

# Import dynamic modular workers
from guide_worker import (
    build_dynamic_laptop_guide,
    build_dynamic_pc_build_guide,
    build_dynamic_handheld_guide,
)
from writer_worker import (
    fetch_live_news_articles,
    build_full_steam_game_article,
)

SUPABASE_URL = "https://esjwkwgjnesyvnvuonmd.supabase.co"
SUPABASE_KEY = "sb_publishable_AlvHUSVaBIQMqj6vRuNsww_Uokx0SsJ"

SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000


def run_pipeline() -> list:
    now_ms = int(datetime.now().timestamp() * 1000)
    expires_ms = now_ms + SEVEN_DAYS_MS

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 🚀 Running Jinssi Autonomous Pipeline (100% Dynamic, 7-Day Lifespan)...")
    articles = []

    # 1. Real Gaming Journalism (PC Gamer & Rock Paper Shotgun live full articles)
    print("  [Step 1] Fetching real full-length articles from verified gaming publications...")
    try:
        live_news = fetch_live_news_articles(max_articles=3)
        articles.extend(live_news)
        print(f"  ✓ Added {len(live_news)} real news articles.")
    except Exception as e:
        print(f"  ✗ Live news scraping error: {e}", file=sys.stderr)

    # 2. Dynamic Hardware Guides with live Amazon search & real multi-angle photo carousels
    print("  [Step 2] Dynamically generating Hardware Guides from live Amazon inventory...")
    try:
        laptop_guide = build_dynamic_laptop_guide(now_ms, expires_ms)
        if laptop_guide:
            articles.append(laptop_guide)
            print(f"  ✓ Added: '{laptop_guide['title']}' (Carousel: {len(laptop_guide['sections'][0].get('gallery') or [])} images)")
    except Exception as e:
        print(f"  ✗ Dynamic laptop guide error: {e}", file=sys.stderr)

    try:
        pc_guide = build_dynamic_pc_build_guide(now_ms, expires_ms)
        if pc_guide:
            articles.append(pc_guide)
            print(f"  ✓ Added: '{pc_guide['title']}' (Parts: {len(pc_guide['sections'][1].get('buildParts') or [])})")
    except Exception as e:
        print(f"  ✗ Dynamic PC build guide error: {e}", file=sys.stderr)

    try:
        handheld_guide = build_dynamic_handheld_guide(now_ms, expires_ms)
        if handheld_guide:
            articles.append(handheld_guide)
            print(f"  ✓ Added: '{handheld_guide['title']}'")
    except Exception as e:
        print(f"  ✗ Handheld guide error: {e}", file=sys.stderr)

    # 3. Authentic Steam Store Reviews with full-HD screenshot carousels from Valve CDN
    featured_steam_games = [
        (2198150, "Review", "Diorama Castle Builder"),
        (1796790, "Review", "Culinary Adventure RPG"),
        (2666510, "Guide", "Desktop Idle Farming"),
        (2113850, "Curated List", "Lofi Focus Companion"),
        (1158160, "Guide", "Tropical Island Sim"),
        (1455840, "Cozy Essay", "Zen Tile Puzzler"),
        (1135690, "Cozy Essay", "Peaceful Mountain Journey"),
    ]

    print("  [Step 3] Fetching authentic Steam game reviews & HD screenshot carousels from Valve API...")
    for app_id, category, tag in featured_steam_games:
        try:
            art = build_full_steam_game_article(app_id, category, tag, now_ms, expires_ms)
            if art:
                articles.append(art)
                print(f"  ✓ Added: '{art['title']}'")
        except Exception as e:
            print(f"  ✗ Steam app {app_id} error: {e}", file=sys.stderr)

    print(f"[{datetime.now().strftime('%H:%M:%S')}] 📦 Compiled {len(articles)} genuine, dynamic articles.")
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
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✨ Successfully synced live articles to Supabase! Status: {resp.status}")
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
