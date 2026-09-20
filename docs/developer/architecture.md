---
id: architecture
title: Backend & Frontend Architecture
sidebar_label: Architecture
---

# Architecture Deep-Dive

MTVL is designed with a strict modular separation of concerns. This guide explains how the Go backend and React frontend interact.

---

## Backend Directory Layout

```
mtvl/
├── cmd/
│   └── create-category/     # CLI code generator for new tracking categories
├── config/                  # Environment variable configuration loader
├── internal/
│   ├── auth/                # Pluggable authentication subsystem (JWT & External)
│   ├── core/                # Core interfaces (CategoryModule, Registry)
│   ├── db/                  # Database connection & Goose migration runner
│   ├── docs/                # OpenAPI 3.0 spec generation & Swagger UI handler
│   ├── health/              # Kubernetes liveness, readiness & health probes
│   ├── idgen/               # Snowflake/UUID identifier generation
│   ├── modules/             # Category domain modules
│   │   ├── books/           # Books module (GORM models, handlers, routes)
│   │   ├── movies/          # Movies module
│   │   └── tvshows/         # TV Shows module
│   └── services/            # Cross-cutting business services (Stats, Search, Export)
├── migrations/
│   ├── postgres/            # Goose SQL migrations for PostgreSQL / Neon
│   └── mysql/               # Goose SQL migrations for MySQL
└── main.go                  # Server initialization & route mounting
```

---

## Core Backend Interfaces

### 1. `core.CategoryModule`
Every category module must satisfy the `CategoryModule` interface:

```go
package core

import "github.com/go-chi/chi/v5"

type ModuleInfo struct {
    ID          string `json:"id"`
    Name        string `json:"name"`
    DisplayName string `json:"display_name"`
    Description string `json:"description"`
    Endpoint    string `json:"endpoint"`
    Icon        string `json:"icon"`
}

type CategoryModule interface {
    Info() ModuleInfo
    RegisterPublicRoutes(r chi.Router)
    RegisterProtectedRoutes(r chi.Router)
}
```

### 2. `auth.AuthProvider`
Authentication is decoupled behind an abstract provider interface:

```go
package auth

import "net/http"

type AuthProvider interface {
    RegisterRoutes(r chi.Router)
    AuthenticateMiddleware(next http.Handler) http.Handler
    GetUserIDFromContext(r *http.Request) (string, error)
}
```

---

## Data Flow & Request Lifecycle

```
[ HTTP Request ]
       |
       v
[ Chi Router Middleware Stack ]
  - CORS Middleware
  - Request Logger & Panic Recovery
  - Auth Middleware (Validates JWT / PAT if protected)
       |
       v
[ Core Registry / Category Module Handler ]
       |
       v
[ GORM ORM Layer / Transaction Management ]
       |
       v
[ Neon PostgreSQL / MySQL ]
```
