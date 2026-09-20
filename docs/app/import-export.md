---
id: import-export
title: "Data Portability: Import & Export"
sidebar_label: "Import & Export"
---

# Data Portability: Import & Export

Your data belongs to you. MTVL provides full JSON backup export and restore mechanisms to ensure maximum portability.

---

## Exporting Your Data

1. Click the **Export / Backup** button in the top navigation bar or your profile menu.
2. The server generates a complete snapshot JSON file containing:
   - All shared catalog records referenced by your account.
   - All personal tracking list records across every category (statuses, progress, ratings, notes, timestamps).
3. The browser automatically downloads a file named `mtvl-backup-YYYY-MM-DD.json`.

---

## Importing Data & Restoring Backups

To restore a previous backup or import data from another instance:

1. Click **Import** in the navigation bar.
2. Select your `mtvl-backup-*.json` file.
3. Choose the merge strategy:
   - **Merge & Update**: Adds missing items and updates existing items if newer.
   - **Skip Existing**: Only imports items not currently present in your list.
4. Click **Start Import**. The app displays a progress bar and summary of imported items.

```json title="Example MTVL Backup JSON Structure"
{
  "version": "1.0",
  "exported_at": "2026-09-20T12:00:00Z",
  "data": {
    "movies": [
      {
        "id": "mov_01j7abc89",
        "title": "Interstellar",
        "status": "completed",
        "rating": 10,
        "notes": "Masterpiece soundtrack and visuals."
      }
    ],
    "tvshows": [
      {
        "id": "tv_01j7def12",
        "title": "Severance",
        "status": "watching",
        "episodes_watched": 8,
        "total_episodes": 9,
        "rating": 9
      }
    ],
    "books": [
      {
        "id": "bk_01j7ghi34",
        "title": "Dune",
        "status": "completed",
        "pages_read": 688,
        "total_pages": 688,
        "rating": 10
      }
    ]
  }
}
```
