---
id: frontend-development
title: Frontend Development & Extension
sidebar_label: Frontend Development
---

# Frontend Architecture & Extension

The MTVL frontend is built with React 19, TypeScript, and Vite. It is engineered around a dynamic module registry pattern.

---

## State Management Architecture

- **`AuthContext` (`src/context/AuthContext.tsx`)**: Manages the logged-in user state, JWT tokens in `localStorage`, login/logout routines, and session expiration.
- **`CategoryContext` (`src/context/CategoryContext.tsx`)**: Fetches active categories from `/api/v1/categories`, manages active category selection, and synchronizes list counts.

---

## Dynamic Runtime Configuration

To support deploying the same Docker container across different environments (Staging, Production, Local) without rebuilding JavaScript bundles, the frontend uses runtime window injection:

```html title="public/config.js"
window.APP_CONFIG = {
  API_BASE_URL: "https://api.mylists.cc"
};
```

In production Docker containers, the NGINX startup script (`40-api-base-url.sh`) rewrites `window.APP_CONFIG.API_BASE_URL` with the `API_BASE_URL` environment variable at container boot.

---

## Adding a Custom Media Card Component

When creating a new category with unique fields (e.g. *Video Games* with `hours_played` and `platform`):

1. Define the TypeScript types in `src/modules/videogames/types.ts`:
```typescript
export interface VideoGameItem {
  id: string;
  title: string;
  developer: string;
  platform: string;
  hours_played: number;
  status: string;
  rating: number;
}
```

2. Register the module in `src/modules/index.ts`. The UI will dynamically render the new category tab, search filters, and progress sliders.
