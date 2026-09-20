---
id: search-and-discovery
title: Global Search & Cross-Category Discovery
sidebar_label: Search & Discovery
---

# Global Search & Cross-Category Discovery

MTVL features a powerful, instant cross-category search engine designed for rapid discovery across all registered modules.

---

## Global Quick Search Modal

Press `Ctrl + K` (Windows/Linux) or `Cmd + K` (macOS) from anywhere in the application to open the **Global Search Modal**.

### Features
- **Cross-Category Aggregation**: Simultaneously queries Movies, TV Shows, Books, and custom modules in a single request (`GET /api/v1/search?q=query`).
- **Debounced Live Queries**: Searches execute smoothly as you type with low latency.
- **Categorized Results**: Search results are grouped by category with visual badges, metadata previews, and status indicators.
- **Direct Actions**: Add items directly to your list from the search popup without navigating away from your current page.

---

## In-Category Filtering

Within any category view, use the contextual search bar to search specific metadata:
- Search by **Author** or **ISBN** in Books.
- Search by **Director** or **Actor** in Movies and TV Shows.
- Search by **Tags** and **Genres**.
