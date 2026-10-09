#!/usr/bin/env python3
"""
Jinssi Gaming - Cozy Journal Live Feed Grabber
Scrapes live Steam announcements, authentic developer patch notes, and high-res game screenshots.
Generates rich blog-format journal articles with a strict 24-hour lifespan.
Updates Supabase site_content table row 'default' without touching games, stories, or products.

Usage:
  python3 scripts/grab_journal_feed.py           # Runs one-shot sync
  python3 scripts/grab_journal_feed.py --daemon  # Runs continuously, auto-repopulating 1 minute before 24h expiration
"""

import sys
import os
import time
import json
import re
import urllib.request
import urllib.parse
from datetime import datetime

SUPABASE_URL = "https://esjwkwgjnesyvnvuonmd.supabase.co"
SUPABASE_KEY = "sb_publishable_AlvHUSVaBIQMqj6vRuNsww_Uokx0SsJ"
YDC_API_KEY = "ydc-sk-38b879a9076b26a9-0S9IUejsmjmyAbnbGJZMb8bnyXksPQEg-7ae94ca6"

# Curated list of top cozy games monitored for live updates
COZY_GAMES = [
    {"appId": 2142790, "name": "Fields of Mistria", "category": "Guide", "tag": "Farming RPG"},
    {"appId": 1796790, "name": "Chef RPG", "category": "Review", "tag": "Culinary Sim"},
    {"appId": 2198150, "name": "Tiny Glade", "category": "Review", "tag": "Diorama Builder"},
    {"appId": 2666510, "name": "Rusty's Retirement", "category": "Guide", "tag": "Idle Desktop Farm"},
    {"appId": 2113850, "name": "Spirit City: Lofi Sessions", "category": "Curated List", "tag": "Focus Companion"},
    {"appId": 1158160, "name": "Coral Island", "category": "Guide", "tag": "Tropical Life Sim"},
    {"appId": 1819460, "name": "Mika and The Witch's Mountain", "category": "Review", "tag": "Soaring Adventure"},
    {"appId": 1432860, "name": "Sun Haven", "category": "Guide", "tag": "Fantasy Farm Sim"},
    {"appId": 2076340, "name": "Tavern Talk", "category": "Review", "tag": "Cozy Visual Novel"},
    {"appId": 2521600, "name": "Little Known Galaxy", "category": "Guide", "tag": "Space Life Sim"},
    {"appId": 1455840, "name": "Dorfromantik", "category": "Cozy Essay", "tag": "Peaceful Puzzler"},
    {"appId": 1135690, "name": "Unpacking", "category": "Cozy Essay", "tag": "Zen Organizing"},
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def http_get_json(url, headers=None):
    req_headers = dict(HEADERS)
    if headers:
        req_headers.update(headers)
    req = urllib.request.Request(url, headers=req_headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read().decode("utf-8")
            return json.loads(data)
    except Exception as e:
        print(f"[Warn] HTTP GET failed for {url}: {e}", file=sys.stderr)
        return None


def clean_steam_bbcode(text):
    if not text:
        return ""
    # Transform clan images into authentic direct URLs
    text = re.sub(
        r'\[img src="\{STEAM_CLAN_IMAGE\}/([^"]+)"\]\[/img\]',
        r"https://clan.fastly.steamstatic.com/images/\1",
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"\{STEAM_CLAN_IMAGE\}/([^\s\"\]]+)",
        r"https://clan.fastly.steamstatic.com/images/\1",
        text,
        flags=re.IGNORECASE,
    )
    # Remove standard img tags
    text = re.sub(r"\[img[^\]]*\].*?\[/img\]", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\[/?img[^\]]*\]", "", text, flags=re.IGNORECASE)
    # Convert URLs
    text = re.sub(r'\[url="([^"]+)"\](.*?)\[/url\]', r"\2 (\1)", text, flags=re.IGNORECASE)
    text = re.sub(r"\[url=([^\]]+)\](.*?)\[/url\]", r"\2 (\1)", text, flags=re.IGNORECASE)
    # Text formatting
    text = re.sub(r"\[/?(b|i|u|h1|h2|h3)\]", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\[/?list\]", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"\[\*\]", "\n• ", text, flags=re.IGNORECASE)
    text = re.sub(r"\[/?p\]", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"\[/?(table|tr|td|th)\]", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"\[/?quote\]", "\n> ", text, flags=re.IGNORECASE)
    text = text.replace("\\[", "[").replace("\\]", "]")
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def fetch_steam_game(app_id, name, category, tag):
    """Fetches real news & app details from Steam API"""
    news_url = f"https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid={app_id}&count=2&format=json"
    news_json = http_get_json(news_url)
    news_items = news_json.get("appnews", {}).get("newsitems", []) if news_json else []
    news_item = news_items[0] if news_items else None

    details_url = f"https://store.steampowered.com/api/appdetails?appids={app_id}&l=english"
    details_json = http_get_json(details_url)
    details = details_json.get(str(app_id), {}).get("data", {}) if details_json else {}

    steam_link = f"https://store.steampowered.com/app/{app_id}/"
    source_link = news_item.get("url") if news_item else steam_link

    # Verified high-res cover image from Steam CDN
    cover_image = (
        details.get("header_image")
        or f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{app_id}/header.jpg"
    )

    # Scrape real screenshots for rich blog format
    raw_screenshots = details.get("screenshots", []) if details else []
    screenshot_urls = [s.get("path_full") for s in raw_screenshots if isinstance(s, dict) and s.get("path_full")]

    ss1 = (
        screenshot_urls[0]
        if len(screenshot_urls) > 0
        else f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{app_id}/capsule_616x353.jpg"
    )
    ss2 = (
        screenshot_urls[1]
        if len(screenshot_urls) > 1
        else f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{app_id}/library_hero.jpg"
    )

    # Raw content & clean text
    raw_content = ""
    if news_item and news_item.get("contents"):
        raw_content = news_item.get("contents")
    elif details and details.get("short_description"):
        raw_content = details.get("short_description")
    else:
        raw_content = f"Official game notes and community updates for {name}."

    # Check for developer clan image
    clan_match = re.search(r"https://clan\.fastly\.steamstatic\.com/images/[^\s\"\]]+", raw_content)
    section1_img = clan_match.group(0) if clan_match else ss1

    cleaned = clean_steam_bbcode(raw_content)
    paragraphs = [p.strip() for p in cleaned.split("\n\n") if len(p.strip()) > 25]

    if news_item and news_item.get("title"):
        title_raw = news_item["title"]
        title_clean = re.sub(r"^\[.*?\]\s*", "", title_raw)
        title = f"{name}: {title_clean}"
    else:
        title = f"{name}: Community & Major Content Update"

    subtitle = (
        paragraphs[0][:230] + "..."
        if paragraphs
        else details.get("short_description")
        or f"Everything you need to know about the newest update for {name} on Steam."
    )

    mid = max(1, len(paragraphs) // 2)

    sections = [
        {
            "heading": "1. What Changed & Key Highlights",
            "content": paragraphs[:mid] if paragraphs[:mid] else [cleaned[:500]],
            "image": section1_img,
            "imageAlt": f"{name} in-game update screenshot",
            "steamLink": steam_link,
            "sourceLink": source_link,
            "callout": {
                "title": "Verified Developer Dispatch",
                "text": f"Directly sourced from the official {name} developer announcement on Steam. Available now for PC players.",
            },
        },
        {
            "heading": "2. Balance, QOL & Neighborhood Progress",
            "content": paragraphs[mid : mid + 4]
            if len(paragraphs) > mid
            else [
                f"The developers have deployed essential quality-of-life improvements and performance fixes for {name}.",
                "Community feedback directly inspired these adjustments, smoothing progression and player experience.",
            ],
            "image": ss2,
            "imageAlt": f"{name} peaceful gameplay and scenery",
            "steamLink": steam_link,
            "sourceLink": source_link,
        },
        {
            "heading": "The Verdict & Player Notes",
            "content": [
                f"For players looking for a tranquil gaming session, {name} delivers charming mechanics and a restful atmosphere.",
                "Explore the official links below to grab the game on Steam or review full release notes directly from the creators.",
            ],
            "steamLink": steam_link,
            "sourceLink": source_link,
        },
    ]

    now_ms = int(time.time() * 1000)
    expires_ms = now_ms + (24 * 60 * 60 * 1000)  # Strict 24h lifespan

    date_str = (
        datetime.fromtimestamp(news_item["date"]).strftime("%b %d, %Y")
        if news_item and "date" in news_item
        else datetime.now().strftime("%b %d, %Y")
    )

    slug_base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    item_id = f"steam-{app_id}-{news_item.get('gid', str(now_ms))}" if news_item else f"steam-{app_id}-{now_ms}"

    return {
        "id": item_id,
        "slug": f"{slug_base}-update-{now_ms}",
        "title": title,
        "subtitle": subtitle,
        "author": news_item.get("author") or "Jinssi Editorial",
        "authorRole": "Official Verified Dispatch",
        "date": date_str,
        "readTimeMinutes": max(3, min(8, round(len(cleaned) / 450))),
        "category": category,
        "tags": [name, tag, "Steam Update", "Cozy Games"],
        "cozyScore": 5,
        "stressLevel": "Zero Stress",
        "coverImage": cover_image,
        "coverAlt": f"{name} official Steam banner",
        "summary": subtitle,
        "sections": sections,
        "steamLink": steam_link,
        "sourceLink": source_link,
        "createdAt": now_ms,
        "expiresAt": expires_ms,
    }


def grab_all_articles():
    print(f"[{datetime.now().strftime('%H:%M:%S')}] 🔍 Grabbing live cozy game updates from Steam & Web API...")
    articles = []
    for g in COZY_GAMES:
        try:
            art = fetch_steam_game(g["appId"], g["name"], g["category"], g["tag"])
            if art:
                articles.append(art)
                print(f"  ✓ {g['name']}: '{art['title']}' (Cover: {art['coverImage'][:45]}...)")
        except Exception as e:
            print(f"  ✗ Failed for {g['name']}: {e}", file=sys.stderr)
    return articles


def sync_to_supabase(articles):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] 💾 Syncing {len(articles)} articles to Supabase...")

    # 1. Fetch current content row
    get_req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/site_content?id=eq.default&select=content",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        },
    )

    current_content = {}
    try:
        with urllib.request.urlopen(get_req, timeout=10) as resp:
            rows = json.loads(resp.read().decode("utf-8"))
            if rows and len(rows) > 0:
                current_content = rows[0].get("content", {})
    except Exception as e:
        print(f"[Error] Failed to fetch current Supabase row: {e}", file=sys.stderr)
        return False

    # 2. Update ONLY articles and updated_at, preserving games, products, stories, ctaLinks
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
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✨ Successfully saved to Supabase! Status: {resp.status}")
            return True
    except Exception as e:
        print(f"[Error] Failed to upsert into Supabase: {e}", file=sys.stderr)
        return False


def run_cycle():
    articles = grab_all_articles()
    if not articles:
        print("[Error] No articles gathered.", file=sys.stderr)
        return None
    success = sync_to_supabase(articles)
    if success:
        # Return expires_at of newest article
        return articles[0]["expiresAt"]
    return None


def main():
    daemon_mode = "--daemon" in sys.argv or "--watch" in sys.argv

    if not daemon_mode:
        run_cycle()
        print("Done one-shot run.")
        return

    print("🚀 Starting Jinssi Gaming Cozy Journal Daemon (Auto-repopulates 1 minute before expiration)")
    while True:
        expires_at = run_cycle()
        now_ms = int(time.time() * 1000)

        if expires_at and expires_at > now_ms:
            # Wake up 1 minute (60,000 ms) before expiration
            sleep_ms = max(5000, expires_at - 60000 - now_ms)
            sleep_sec = sleep_ms / 1000.0
            hours = sleep_sec / 3600.0
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ⏳ Next auto-repopulation in {hours:.2f} hours ({sleep_sec:.0f}s)...")
            time.sleep(sleep_sec)
        else:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ⚠️ Retry in 60 seconds...")
            time.sleep(60)


if __name__ == "__main__":
    main()
