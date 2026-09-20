---
id: adding-categories
title: Adding a New Category Module
sidebar_label: Adding Categories
---

# Adding a New Category Module

MTVL's modular architecture makes adding custom tracking categories (e.g. *Anime*, *Video Games*, *Podcasts*, *Board Games*) fast and straightforward.

---

## Method A: Using the CLI Code Generator (Recommended)

MTVL includes an automated code generator CLI:

```bash
# In the backend repo root:
go run cmd/create-category/main.go \
  -name videogames \
  -display "Video Games" \
  -description "Track video game backlog and playthrough progress"
```

### What the Generator Creates
1. **PostgreSQL Migration**: `migrations/postgres/0000X_videogames.sql`
2. **MySQL Migration**: `migrations/mysql/0000X_videogames.sql`
3. **Module Package**: `internal/modules/videogames/`
   - `model.go` (GORM models for catalog item & personal list entry)
   - `repository.go` (Database queries)
   - `handler.go` (HTTP handlers)
   - `module.go` (Implements `core.CategoryModule`)

---

## Method B: Manual Module Implementation

If you are creating custom fields or unique business logic, follow these 4 steps:

### Step 1: Create Goose DB Migrations

Create `migrations/postgres/20261001000000_videogames.sql`:

```sql
-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS videogames (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    developer VARCHAR(255) DEFAULT '',
    platform VARCHAR(100) DEFAULT '',
    release_year INTEGER DEFAULT 0,
    cover_url TEXT DEFAULT '',
    description TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_videogame_lists (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    item_id VARCHAR(64) NOT NULL REFERENCES videogames(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'plan_to_play',
    hours_played INTEGER DEFAULT 0,
    rating INTEGER DEFAULT 0,
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS user_videogame_lists;
DROP TABLE IF EXISTS videogames;
-- +goose StatementEnd
```

### Step 2: Implement `core.CategoryModule`

```go
package videogames

import (
    "github.com/go-chi/chi/v5"
    "gorm.io/gorm"
    "mtvl/internal/core"
)

type Module struct {
    db      *gorm.DB
    handler *Handler
}

func NewModule(db *gorm.DB) *Module {
    return &Module{
        db:      db,
        handler: NewHandler(db),
    }
}

func (m *Module) Info() core.ModuleInfo {
    return core.ModuleInfo{
        ID:          "videogames",
        Name:        "videogames",
        DisplayName: "Video Games",
        Description: "Track game backlog and completion progress",
        Endpoint:    "/api/v1/videogames",
        Icon:        "Gamepad2",
    }
}

func (m *Module) RegisterPublicRoutes(r chi.Router) {
    r.Get("/api/v1/videogames", m.handler.ListCatalog)
    r.Get("/api/v1/videogames/{id}", m.handler.GetCatalogItem)
}

func (m *Module) RegisterProtectedRoutes(r chi.Router) {
    r.Post("/api/v1/videogames", m.handler.CreateCatalogItem)
    r.Get("/api/v1/videogames/list", m.handler.GetUserList)
    r.Post("/api/v1/videogames/list", m.handler.AddToList)
    r.Put("/api/v1/videogames/list/{id}", m.handler.UpdateListItem)
    r.Delete("/api/v1/videogames/list/{id}", m.handler.RemoveFromList)
}
```

### Step 3: Register in `main.go`

In `main.go`, register your new module with the central registry:

```go
registry := core.NewRegistry()
registry.Register(movies.NewModule(database))
registry.Register(tvshows.NewModule(database))
registry.Register(books.NewModule(database))
registry.Register(videogames.NewModule(database)) // Register new module
```

### Step 4: Register in Frontend (`mtvl-frontend`)

Add the frontend module config in `src/modules/registry.ts`:

```typescript
import { Gamepad2 } from 'lucide-react';
import { CategoryConfig } from './types';

export const videoGamesConfig: CategoryConfig = {
  id: 'videogames',
  name: 'videogames',
  displayName: 'Video Games',
  icon: Gamepad2,
  endpoint: '/api/v1/videogames',
  progressLabel: 'Hours Played',
  statuses: [
    { value: 'plan_to_play', label: 'Plan to Play' },
    { value: 'playing', label: 'Playing' },
    { value: 'completed', label: 'Completed' },
    { value: 'dropped', label: 'Dropped' },
  ],
};
```
