---
id: stats
title: Statistics & Dashboard Metrics API
sidebar_label: Statistics
---

# Statistics & Dashboard Metrics API

<span className="badge-get">GET</span> `/api/v1/stats`

Calculates and returns aggregated metrics across all categories for the authenticated user.

---

## Authentication
Requires `Authorization: Bearer <token>`.

---

## Example Response (`200 OK`)

```json
{
  "total_items": 142,
  "completed_total": 89,
  "in_progress_total": 14,
  "plan_to_total": 35,
  "average_score": 8.4,
  "categories": {
    "movies": {
      "total": 65,
      "completed": 50,
      "watching": 2,
      "plan_to_watch": 13,
      "average_rating": 8.6
    },
    "tvshows": {
      "total": 32,
      "completed": 15,
      "watching": 7,
      "total_episodes_watched": 342,
      "average_rating": 8.2
    },
    "books": {
      "total": 45,
      "completed": 24,
      "reading": 5,
      "total_pages_read": 8450,
      "average_rating": 8.5
    }
  }
}
```
