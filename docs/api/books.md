---
id: books
title: Books API Reference
sidebar_label: Books
---

# Books API Reference

Endpoints for browsing literary works and managing reading progress by pages or chapters.

---

## 1. List Public Book Catalog

<span className="badge-get">GET</span> `/api/v1/books`

### Example Response (`200 OK`)

```json
{
  "items": [
    {
      "id": "bk_01j7book01",
      "title": "Dune",
      "author": "Frank Herbert",
      "total_pages": 688,
      "publication_year": 1965,
      "cover_url": "https://example.com/dune.jpg",
      "description": "Set on the desert planet Arrakis, Dune is the story of Paul Atreides.",
      "created_at": "2026-08-04T19:12:40Z"
    }
  ],
  "total": 85,
  "page": 1,
  "limit": 24
}
```

---

## 2. Personal Reading List

### Get Personal Books List
<span className="badge-get">GET</span> `/api/v1/books/list`

### Add Book to Personal List
<span className="badge-post">POST</span> `/api/v1/books/list`

```json
{
  "item_id": "bk_01j7book01",
  "status": "reading",
  "pages_read": 340,
  "total_pages": 688,
  "rating": 9,
  "notes": "Chapter 22 reached. Amazing world building."
}
```
