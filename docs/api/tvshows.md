---
id: tvshows
title: TV Shows API Reference
sidebar_label: TV Shows
---

# TV Shows API Reference

Endpoints for browsing television series and managing episodic watch tracking.

---

## 1. List Public TV Show Catalog

<span className="badge-get">GET</span> `/api/v1/tvshows`

Query television shows from the public catalog.

### Query Parameters
- `q`: Search keyword.
- `sort_by`: `title`, `total_seasons`, `created_at`.
- `page`, `limit`: Pagination parameters.

### Example Response (`200 OK`)

```json
{
  "items": [
    {
      "id": "tv_01j7xyz99",
      "title": "Severance",
      "creator": "Dan Erickson",
      "total_seasons": 2,
      "total_episodes": 19,
      "poster_url": "https://example.com/severance.jpg",
      "description": "Mark leads a team of office workers whose memories have been surgically divided.",
      "created_at": "2026-08-04T19:12:38Z"
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 24
}
```

---

## 2. Create TV Show in Catalog

<span className="badge-post">POST</span> `/api/v1/tvshows`

```json
{
  "title": "Succession",
  "creator": "Jesse Armstrong",
  "total_seasons": 4,
  "total_episodes": 39,
  "poster_url": "https://example.com/succession.jpg",
  "description": "The Roy family is known for controlling the biggest media and entertainment company."
}
```

---

## 3. Personal TV Show List

### Get User TV Show List
<span className="badge-get">GET</span> `/api/v1/tvshows/list`

### Add TV Show to Personal List
<span className="badge-post">POST</span> `/api/v1/tvshows/list`

```json
{
  "item_id": "tv_01j7xyz99",
  "status": "watching",
  "episodes_watched": 9,
  "total_episodes": 19,
  "rating": 10,
  "notes": "Season 1 finale is incredible"
}
```
