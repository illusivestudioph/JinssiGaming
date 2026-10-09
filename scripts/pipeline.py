#!/usr/bin/env python3
"""
Jinssi Gaming - Master Autonomous Pipeline Orchestrator
=======================================================
Coordinates dedicated, modular task pipelines:
1. game_worker.py:      Steam discovery, in-game gameplay carousel, rich reviews.
2. pc_build_worker.py:  Amazon in-stock parts, genuine hardware cover, live pricing.
3. laptop_worker.py:    Top budget gaming laptop, multi-angle Amazon carousel, verified specs.
4. esports_worker.py:   Live competitive finals reports, full multi-paragraph coverage.
5. journal_worker.py:   Full-length investigative gaming journalism from RPS & Eurogamer.

Usage:
  python3 scripts/pipeline.py                 # Run all task pipelines
  python3 scripts/pipeline.py --task=game     # Run dedicated game pipeline only
  python3 scripts/pipeline.py --task=pc_build # Run dedicated PC build pipeline only
  python3 scripts/pipeline.py --task=laptop   # Run dedicated laptop pipeline only
  python3 scripts/pipeline.py --task=esports  # Run dedicated esports pipeline only
  python3 scripts/pipeline.py --task=journal  # Run dedicated journalism pipeline only
  python3 scripts/pipeline.py --daemon        # Run all pipelines on silent 7-day rotation
"""

import sys
import os
import time
from datetime import datetime

from game_worker import run_game_pipeline
from pc_build_worker import run_pc_build_pipeline
from laptop_worker import run_laptop_pipeline
from esports_worker import run_esports_pipeline
from journal_worker import run_journal_pipeline
from supabase_client import sync_all_articles, fetch_current_articles


def run_full_pipeline() -> list:
    """Executes each dedicated pipeline and compiles the complete dynamic publication suite."""
    print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 🚀 Running Jinssi Autonomous Master Pipeline (All Dedicated Tasks)...")
    articles = []

    # 1. Dedicated PC Build Guide Pipeline
    print("\n--- [Task 1/5] Dedicated PC Build Guide ---")
    try:
        pc_guide = run_pc_build_pipeline(sync_supabase=False)
        if pc_guide:
            articles.append(pc_guide)
            print(f"  ✓ PC Build Guide ready: '{pc_guide['title']}'")
    except Exception as e:
        print(f"  ✗ PC Build Guide error: {e}", file=sys.stderr)

    # 2. Dedicated Laptop Guide Pipeline
    print("\n--- [Task 2/5] Dedicated Laptop Guide ---")
    try:
        laptop_guide = run_laptop_pipeline(sync_supabase=False)
        if laptop_guide:
            articles.append(laptop_guide)
            print(f"  ✓ Laptop Guide ready: '{laptop_guide['title']}'")
    except Exception as e:
        print(f"  ✗ Laptop Guide error: {e}", file=sys.stderr)

    # 3. Dedicated Esports News Pipeline
    print("\n--- [Task 3/5] Dedicated Esports Tournament News ---")
    try:
        esports_art = run_esports_pipeline(sync_supabase=False)
        if esports_art:
            articles.append(esports_art)
            print(f"  ✓ Esports News ready: '{esports_art['title']}'")
    except Exception as e:
        print(f"  ✗ Esports News error: {e}", file=sys.stderr)

    # 4. Dedicated Game Review Pipeline (Carousel for Gameplay Images)
    print("\n--- [Task 4/5] Dedicated Steam Game Reviews (Gameplay Carousels) ---")
    try:
        game_arts = run_game_pipeline(max_games=5, sync_supabase=False)
        articles.extend(game_arts)
        print(f"  ✓ Game Reviews ready: {len(game_arts)} games compiled.")
    except Exception as e:
        print(f"  ✗ Game Reviews error: {e}", file=sys.stderr)

    # 5. Dedicated Human Gaming Journalism Pipeline
    print("\n--- [Task 5/5] Dedicated Real Gaming Journalism ---")
    try:
        journal_arts = run_journal_pipeline(max_articles=3, sync_supabase=False)
        articles.extend(journal_arts)
        print(f"  ✓ Real Journalism ready: {len(journal_arts)} stories compiled.")
    except Exception as e:
        print(f"  ✗ Real Journalism error: {e}", file=sys.stderr)

    print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 📦 Compiled {len(articles)} total dynamic articles across all pipelines.")
    return articles


def main():
    task_arg = None
    for arg in sys.argv:
        if arg.startswith("--task="):
            task_arg = arg.split("=", 1)[1].strip().lower()

    daemon_mode = "--daemon" in sys.argv or "--watch" in sys.argv

    # Selective task execution
    if task_arg == "game":
        run_game_pipeline(max_games=5, sync_supabase=True)
        return
    elif task_arg in ("pc", "pc_build", "build"):
        run_pc_build_pipeline(sync_supabase=True)
        return
    elif task_arg == "laptop":
        run_laptop_pipeline(sync_supabase=True)
        return
    elif task_arg in ("esports", "news"):
        run_esports_pipeline(sync_supabase=True)
        return
    elif task_arg in ("journal", "journalism"):
        run_journal_pipeline(max_articles=3, sync_supabase=True)
        return

    # Master full execution
    articles = run_full_pipeline()
    if not articles:
        print("[Pipeline] No articles compiled.", file=sys.stderr)
        return

    sync_all_articles(articles)

    if not daemon_mode:
        print("\n🎉 Master pipeline execution completed successfully.")
        return

    print("\n🚀 Jinssi Publishing Daemon running in background on a 7-day silent rotation...")
    while True:
        time.sleep(6 * 3600)
        articles = run_full_pipeline()
        if articles:
            sync_all_articles(articles)


if __name__ == "__main__":
    main()
