---
id: import-export
title: Import & Export API
sidebar_label: Import & Export
---

# Import & Export API

Programmatic endpoints for backing up and restoring user tracking data.

---

## 1. Export Data Backup

<span className="badge-get">GET</span> `/api/v1/export`

Exports a full JSON snapshot of all tracking lists and associated catalog references belonging to the current user.

### Headers
```http
Authorization: Bearer <token>
```

### Response (`200 OK`)
Returns JSON document containing full user tracking state.

---

## 2. Import Data Backup

<span className="badge-post">POST</span> `/api/v1/import`

Imports tracking lists and adds missing catalog items.

### Request Body
JSON payload matching the export schema format.

### Response (`200 OK`)

```json
{
  "imported_categories": ["movies", "tvshows", "books"],
  "total_records_processed": 142,
  "status": "success"
}
```
