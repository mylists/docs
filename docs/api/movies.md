---
id: movies
title: Movies API Reference
sidebar_label: Movies
---

# Movies API Reference

Endpoints for browsing shared movie catalog records and managing personal movie tracking lists.

---

## 1. List Public Movie Catalog

<span className="badge-get">GET</span> `/api/v1/movies`

Retrieves public movie catalog entries with query search, pagination, and sorting.

### Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `q` | `string` | `""` | Search term (matches title, director, overview) |
| `sort_by` | `string` | `"created_at"` | Field: `title`, `release_year`, `rating`, `created_at` |
| `order` | `string` | `"desc"` | Sort direction: `asc` or `desc` |
| `page` | `integer` | `1` | Page number |
| `limit` | `integer` | `24` | Items per page |

### Example Response (`200 OK`)

```json
{
  "items": [
    {
      "id": "mov_01j7abc89",
      "title": "Interstellar",
      "director": "Christopher Nolan",
      "release_year": 2014,
      "duration": 169,
      "poster_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      "created_at": "2026-08-04T19:12:37Z"
    }
  ],
  "total": 128,
  "page": 1,
  "limit": 24
}
```

---

## 2. Create Movie in Public Catalog

<span className="badge-post">POST</span> `/api/v1/movies`

Adds a new movie to the shared global catalog. Requires authentication.

### Request Body

```json
{
  "title": "Oppenheimer",
  "director": "Christopher Nolan",
  "release_year": 2023,
  "duration": 180,
  "poster_url": "https://example.com/oppenheimer.jpg",
  "description": "The story of American scientist J. Robert Oppenheimer."
}
```

---

## 3. Get User Personal Movie List

<span className="badge-get">GET</span> `/api/v1/movies/list`

Retrieves movies saved on the authenticated user's personal list.

### Query Parameters
- `status`: Filter by status (`watching`, `completed`, `on_hold`, `dropped`, `plan_to_watch`).

### Response (`200 OK`)

```json
[
  {
    "id": "uml_99a81b2c",
    "item_id": "mov_01j7abc89",
    "title": "Interstellar",
    "director": "Christopher Nolan",
    "release_year": 2014,
    "duration": 169,
    "status": "completed",
    "rating": 10,
    "notes": "Incredible movie experience.",
    "updated_at": "2026-09-18T20:15:00Z"
  }
]
```

---

## 4. Add Movie to Personal List

<span className="badge-post">POST</span> `/api/v1/movies/list`

Adds a movie to the user's tracking list.

### Request Body

```json
{
  "item_id": "mov_01j7abc89",
  "status": "watching",
  "rating": 9,
  "notes": "Re-watching in 4K"
}
```

---

## 5. Bulk Operations

### Bulk Update Status
<span className="badge-post">POST</span> `/api/v1/movies/bulk-status`

```json
{
  "ids": ["mov_01j7abc89", "mov_01j7def12"],
  "status": "completed"
}
```

### Bulk Delete
<span className="badge-post">POST</span> `/api/v1/movies/bulk-delete`

```json
{
  "ids": ["mov_01j7abc89", "mov_01j7def12"]
}
```
