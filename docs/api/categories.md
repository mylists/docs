---
id: categories
title: Dynamic Category Discovery
sidebar_label: Categories
---

# Dynamic Category Discovery

MTVL utilizes a runtime category registry. Frontend clients and external integrations can dynamically query the server to discover active tracking modules without hardcoding category endpoints.

---

## List Registered Categories

<span className="badge-get">GET</span> `/api/v1/categories`

Returns metadata for all tracking category modules registered in the Go backend.

### Headers
*No authentication required (Public Endpoint).*

### Example Request

```bash
curl -X GET "https://api.mylists.cc/api/v1/categories"
```

### Example Response (`200 OK`)

```json
[
  {
    "id": "movies",
    "name": "movies",
    "display_name": "Movies",
    "description": "Track movies watched and plan to watch",
    "endpoint": "/api/v1/movies",
    "icon": "Film"
  },
  {
    "id": "tvshows",
    "name": "tvshows",
    "display_name": "TV Shows",
    "description": "Track television series and episodic progress",
    "endpoint": "/api/v1/tvshows",
    "icon": "Tv"
  },
  {
    "id": "books",
    "name": "books",
    "display_name": "Books",
    "description": "Track books, reading progress, and page counts",
    "endpoint": "/api/v1/books",
    "icon": "BookOpen"
  }
]
```
