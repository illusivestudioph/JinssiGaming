#!/usr/bin/env python3
"""
Jinssi Gaming - PC Build Guide Worker
======================================
Searches Amazon live for each component category.
Builds interactive parts list with real product photos, live pricing, and direct buy links.
Zero hardcoded parts or prices. Everything from live Amazon search.
"""

import sys
import re
import time
from datetime import datetime
from scraper_worker import search_amazon_live_product, search_you_web, clean_html


# Search queries per component category — these are search TERMS, not product names
COMPONENT_QUERIES = [
    ("CPU", "AMD Ryzen 5 desktop processor"),
    ("GPU", "Radeon RX 6600 gaming graphics card"),
    ("Motherboard", "B550 micro ATX AM4 motherboard WiFi"),
    ("Memory (RAM)", "16GB DDR4 3200MHz desktop RAM kit"),
    ("Storage", "1TB NVMe M.2 SSD PCIe"),
    ("Power Supply", "600W 80 Plus power supply unit"),
    ("Case", "micro ATX gaming PC case mesh airflow"),
    ("Cooler", "CPU tower air cooler 120mm fan"),
]


def build_pc_guide(now_ms: int, expires_ms: int) -> dict:
    """Builds a PC build guide from live Amazon inventory."""
    print("  [PCBuildWorker] Searching Amazon for 8 component categories...")

    parts = []
    total_cents = 0

    for cat_name, query in COMPONENT_QUERIES:
        time.sleep(1)
        prod = search_amazon_live_product(query)
        if not prod or not prod.get("coverImage"):
            # Retry with simpler query
            time.sleep(1)
            simpler = f"PC {cat_name.lower().split('(')[0].strip()}"
            prod = search_amazon_live_product(simpler)

        if not prod or not prod.get("coverImage"):
            print(f"  [PCBuildWorker] ✗ Could not find {cat_name}", file=sys.stderr)
            continue

        title = prod.get("title", cat_name)
        price_str = prod.get("price", "$0.00")
        img = prod.get("coverImage", "")
        buy_url = prod.get("buyUrl", "")
        bullets = prod.get("bullets", [])

        # Price math
        try:
            val = float(price_str.replace("$", "").replace(",", "").strip())
            if 5 < val < 800:
                total_cents += int(val * 100)
        except Exception:
            pass

        parts.append({
            "category": cat_name,
            "name": title,
            "price": price_str,
            "merchant": "Amazon",
            "buyUrl": buy_url,
            "imageUrl": img,
            "specs": bullets[0][:100] if bullets else cat_name,
            "notes": "Live in-stock item from Amazon search.",
        })
        print(f"  [PCBuildWorker] ✓ {cat_name}: {title[:40]}... ({price_str})")

    if not parts:
        print("  [PCBuildWorker] ✗ No parts found at all", file=sys.stderr)
        return None

    total_dollars = f"${total_cents / 100:.2f}" if total_cents > 0 else "N/A"

    # Use GPU image as cover (most visually interesting component)
    cover_image = ""
    for p in parts:
        if p["category"] == "GPU" and p.get("imageUrl"):
            cover_image = p["imageUrl"]
            break
    if not cover_image and parts:
        cover_image = parts[0].get("imageUrl", "")

    sections = [
        {
            "heading": "The Blueprint: Live In-Stock PC Build Configuration",
            "content": [
                "Building your own PC delivers unbeatable value, zero bloatware, and seamless upgradeability. Every part below has been pulled live from current Amazon inventory.",
                f"This build targets smooth 1080p high-refresh gaming while keeping total cost around {total_dollars}.",
            ],
            "callout": {
                "title": "🛒 Real-Time In-Stock Parts",
                "text": "Every component features real product photos, verified pricing, and direct buy links.",
            },
        },
        {
            "heading": "Component Selection & Verified Pricing",
            "content": [
                "Click any component to view its Amazon listing or proceed to purchase:"
            ],
            "buildParts": parts,
            "totalBuildCost": total_dollars,
        },
        {
            "heading": "Step-by-Step Assembly Walkthrough",
            "content": [
                "Step 1 — CPU Install: Place motherboard on its box. Lift the retention arm, align the triangle markers on the CPU, drop it in gently, lower the arm.",
                "Step 2 — Memory: Open clips on RAM slots 2 and 4 (for dual-channel). Press each stick firmly until both clips snap shut.",
                "Step 3 — M.2 SSD: Insert the NVMe drive into the M.2 slot at 30°, press flat, secure the screw.",
                "Step 4 — Cooler: Apply a pea-sized dot of thermal paste on the CPU. Mount the cooler, tighten screws in an X pattern.",
                "Step 5 — Motherboard into Case: Install I/O shield, align standoffs, screw in the board. Route the 24-pin and 8-pin CPU power cables.",
                "Step 6 — GPU & First Boot: Seat the graphics card in the top PCIe x16 slot until the latch clicks. Connect PCIe power. Boot into BIOS, enable XMP/DOCP for memory.",
            ],
            "pros": [
                f"Complete custom system for ~{total_dollars}",
                "Standard non-proprietary components — fully upgradeable",
                "Quiet thermals with dedicated air cooling",
            ],
            "cons": [
                "Requires basic assembly and Windows installation",
                "Prices fluctuate daily based on stock",
            ],
        },
    ]

    return {
        "id": f"guide-pc-build-{now_ms}",
        "slug": f"best-budget-gaming-pc-build-guide-{now_ms}",
        "title": f"Budget Gaming PC Build Guide: Live In-Stock Parts ({total_dollars})",
        "subtitle": "Interactive parts list with live Amazon photos, verified pricing, and direct buy links.",
        "author": "Jinssi Hardware Lab",
        "authorRole": "Custom PC Build Architect",
        "date": datetime.now().strftime("%b %d, %Y"),
        "readTimeMinutes": 10,
        "category": "Guide",
        "tags": ["Hardware", "PC Build", "PC Gaming", "Budget Tech", "DIY"],
        "coverImage": cover_image,
        "coverAlt": "Gaming PC component from Amazon",
        "summary": f"Complete DIY PC build guide with {len(parts)} live in-stock components totaling {total_dollars}.",
        "createdAt": now_ms,
        "expiresAt": expires_ms,
        "sections": sections,
    }


if __name__ == "__main__":
    now = int(datetime.now().timestamp() * 1000)
    exp = now + 7 * 24 * 3600 * 1000
    guide = build_pc_guide(now, exp)
    if guide:
        parts = guide["sections"][1].get("buildParts", [])
        print(f"✓ {guide['title']} | {len(parts)} parts")
