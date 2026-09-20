---
id: search
title: Global Search API
sidebar_label: Search
---

# Global Cross-Category Search API

<span className="badge-get">GET</span> `/api/v1/search`

Performs an aggregated, cross-category search querying all registered catalog modules in parallel.

---

## Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `q` | `string` | **Yes** | Search keyword or title query |

---

## Example Request

```bash
curl -X GET "https://api.mylists.cc/api/v1/search?q=dune"
```

---

## Example Response (`200 OK`)

```json
{
  "query": "dune",
  "results": {
    "movies": [
      {
        "id": "mov_01j7abc89",
        "category": "movies",
        "title": "Dune: Part Two",
        "director": "Denis Villeneuve",
        "release_year": 2024
      }
    ],
    "books": [
      {
        "id": "bk_01j7book01",
        "category": "books",
        "title": "Dune",
        "author": "Frank Herbert",
        "publication_year": 1965
      }
    ],
    "tvshows": []
  }
}
```
