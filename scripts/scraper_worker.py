#!/usr/bin/env python3
"""
Jinssi Gaming - Scraper Worker
==============================
Multi-source scraping and data ingestion worker:
1. You.com Natural Web Search API (multi-source citations, live summaries, organic snippets).
2. Valve Steam Store API (official developer metadata, system requirements, HD screenshots).
3. E-Commerce search builder (generates verified direct query links for Amazon, eBay, Newegg).
"""

import sys
import json
import re
import urllib.request
import urllib.parse

YDC_API_KEY = "ydc-sk-38b879a9076b26a9-0S9IUejsmjmyAbnbGJZMb8bnyXksPQEg-7ae94ca6"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def clean_html(raw_html: str) -> str:
    """Strips HTML tags and normalizes whitespace."""
    if not raw_html:
        return ""
    text = re.sub(r"<[^>]+>", " ", raw_html)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&quot;", '"', text)
    text = re.sub(r"&#39;", "'", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def search_you_web(query: str, count: int = 5) -> list:
    """Performs natural web search using You.com Search API with multi-source synthesis."""
    url = f"https://api.you.com/v1/search?query={urllib.parse.quote(query)}&count={count}"
    headers = dict(HEADERS)
    headers["Authorization"] = f"Bearer {YDC_API_KEY}"

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=14) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("results", {}).get("web", [])
    except Exception as e:
        print(f"[ScraperWorker] You.com search failed for '{query}': {e}", file=sys.stderr)
        return []


def fetch_steam_game_details(app_id: int) -> dict:
    """Fetches official game details from Valve's Steam Store API."""
    url = f"https://store.steampowered.com/api/appdetails?appids={app_id}&l=english"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get(str(app_id), {}).get("data", {})
    except Exception as e:
        print(f"[ScraperWorker] Steam API error for app {app_id}: {e}", file=sys.stderr)
        return {}


def build_merchant_links(part_name: str) -> dict:
    """Builds direct in-stock search buy links for Amazon, eBay, and Newegg."""
    encoded_name = urllib.parse.quote(part_name)
    return {
        "amazon": f"https://www.amazon.com/s?k={encoded_name}",
        "ebay": f"https://www.ebay.com/sch/i.html?_nkw={encoded_name}",
        "newegg": f"https://www.newegg.com/p/pl?d={encoded_name}",
    }


if __name__ == "__main__":
    print("[ScraperWorker] Testing You.com and Steam scrapers...")
    test_hits = search_you_web("best laptop to buy for budget gaming", count=2)
    print(f"You.com hits: {len(test_hits)}")
    for hit in test_hits:
        print(f" - {hit.get('title')}: {hit.get('url')}")
    steam_test = fetch_steam_game_details(2142790)
    print(f"Steam app test: {steam_test.get('name')} (Screenshots: {len(steam_test.get('screenshots', []))})")
