#!/usr/bin/env python3
"""
Jinssi Gaming - Supabase Client Utility
=======================================
Handles resilient fetching and updating of article content in Supabase.
Preserves non-article site_content keys (games, stories, products, etc.).
"""

import sys
import json
import urllib.request
from datetime import datetime

SUPABASE_URL = "https://esjwkwgjnesyvnvuonmd.supabase.co"
SUPABASE_KEY = "sb_publishable_AlvHUSVaBIQMqj6vRuNsww_Uokx0SsJ"

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}


def fetch_site_content() -> dict:
    """Fetches the current site_content dictionary from Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/site_content?id=eq.default&select=content"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            rows = json.loads(resp.read().decode("utf-8"))
            if rows and len(rows) > 0:
                return rows[0].get("content", {})
    except Exception as e:
        print(f"[SupabaseClient] Error fetching site_content: {e}", file=sys.stderr)
    return {}


def save_site_content(content: dict) -> bool:
    """Upserts the site_content dictionary back to Supabase."""
    content["updated_at"] = datetime.utcnow().isoformat() + "Z"
    payload = json.dumps({"id": "default", "content": content}).encode("utf-8")
    headers = dict(HEADERS)
    headers["Prefer"] = "resolution=merge-duplicates"

    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/site_content",
        data=payload,
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status in (200, 201, 204)
    except Exception as e:
        print(f"[SupabaseClient] Error saving site_content: {e}", file=sys.stderr)
        return False


def fetch_current_articles() -> list:
    """Returns the current list of articles stored in Supabase."""
    content = fetch_site_content()
    return content.get("articles", [])


def sync_all_articles(articles: list) -> bool:
    """Replaces all articles in site_content while preserving other keys."""
    content = fetch_site_content()
    content["articles"] = articles
    success = save_site_content(content)
    if success:
        print(f"[SupabaseClient] ✓ Successfully synced {len(articles)} total articles.")
    return success


def upsert_task_articles(new_articles: list, replace_predicate) -> bool:
    """
    Selectively replaces articles matching replace_predicate with new_articles,
    keeping other articles untouched and preserving order.
    """
    content = fetch_site_content()
    existing = content.get("articles", [])
    kept = [a for a in existing if not replace_predicate(a)]

    updated_articles = new_articles + kept
    content["articles"] = updated_articles

    success = save_site_content(content)
    if success:
        print(f"[SupabaseClient] ✓ Updated {len(new_articles)} articles (Total now: {len(updated_articles)}).")
    return success
