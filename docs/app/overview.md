---
id: overview
title: MTVL App Overview
sidebar_label: App Overview
---

# MTVL Web App: User Guide

The **MTVL Frontend** is a modern Single Page Application (SPA) built with React 19, TypeScript, Vite, and Tailwind CSS. It delivers an intuitive, fast, and responsive interface for managing personal entertainment and reading catalogs.

---

## Key App Capabilities

1. **Multi-Category Navigation**: Effortlessly switch between Movies, TV Shows, Books, and any dynamically registered custom modules.
2. **Unified Stats Dashboard**: View real-time aggregated metrics across all your lists (total items, completed counts, watching/reading rates, average scores).
3. **Public Catalog Explorer**: Browse community or system-wide catalogs with instant live search, pagination, and multi-field sorting.
4. **Personal Tracking Lists**: Track your active watching/reading progress, status flags, custom ratings, and private notes.
5. **Instant Global Search**: Open search anytime using `Ctrl + K` or `Cmd + K` to search across all media types simultaneously.
6. **Data Portability**: Full JSON backup export and restore capabilities for seamless data migration.
7. **Developer Token Portal**: Self-service creation and revocation of personal API access tokens.

---

## Application Layout

```
+-------------------------------------------------------------------------------+
| [ Logo ] MTVL   [ Search Ctrl+K ]      [ Stats ]  [ Export ]  [ User Profile] |
+---------------+---------------------------------------------------------------+
| SIDEBAR       | MAIN CONTENT AREA                                             |
|               |                                                               |
| > Dashboard   | [ Category Header: Movies / TV Shows / Books ]                |
| > Movies      | [ Tabs: "Public Catalog" | "My List (Watching, Completed...)" ]|
| > TV Shows    |                                                               |
| > Books       | [ Search Input ] [ Filter by Status ] [ Sort: Rating/Date ]   |
| > (Custom)    |                                                               |
|               | +-------------+  +-------------+  +-------------+             |
|               | | Media Card  |  | Media Card  |  | Media Card  |             |
|               | | Progress bar|  | Progress bar|  | Progress bar|             |
|               | | Rating stars|  | Rating stars|  | Rating stars|             |
|               | +-------------+  +-------------+  +-------------+             |
|               | [ Pagination: < 1 2 3 4 > ]                                   |
+---------------+---------------------------------------------------------------+
```

---

## Getting Started as a User

### 1. Public Browsing Mode
When you visit the MTVL App without logging in:
- You can browse public catalogs for Movies, TV Shows, Books, etc.
- You can perform global cross-category searches.
- You cannot edit items or save personal lists until you log in.

### 2. Registering an Account
1. Click the **Login / Register** button in the top right header.
2. Switch to the **Register** tab in the auth modal.
3. Enter your **Username**, **Email**, and a secure **Password**.
4. Upon successful registration, the app automatically authenticates you and stores the JWT securely in `localStorage`.

### 3. Adding Your First Item
1. Go to any category (e.g., **Movies**).
2. Browse or search for a title in the **Public Catalog**.
3. Click **Add to My List** on the movie card.
4. Set your current status (e.g. *Plan to Watch* or *Watching*), your personal rating, and click **Save**.
