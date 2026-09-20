---
id: getting-started
title: Developer Getting Started
sidebar_label: Getting Started
---

# Developer Getting Started

Set up your local workstation to develop on the MTVL backend and frontend.

---

## Prerequisites

- **Go**: `1.24+` (Go 1.26 recommended)
- **Node.js**: `v20.0.0+`
- **npm**: `v10+`
- **PostgreSQL** or a **Neon Database** account (or local Docker container)

---

## 1. Setting Up the Backend (`mtvl`)

```bash
# Clone the repository
git clone https://github.com/mylists/mtvl.git
cd mtvl

# Download Go module dependencies
go mod download

# Run test suite to verify setup
go test -v ./...
```

### Environment Configuration

The backend supports the following environment variables:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `SERVER_PORT` | `8080` | Port for the HTTP server |
| `DB_DRIVER` | `postgres` | Database driver (`postgres`, `mysql`, `sqlite3`) |
| `DB_DSN` | `postgres://...` | Database connection string |
| `JWT_SECRET` | `secret` | Secret key used to sign JWT tokens |
| `AUTH_PROVIDER_TYPE` | `jwt` | Auth engine: `jwt` or `external` |
| `CORS_ALLOWED_ORIGINS`| `*` | Allowed CORS origins (e.g. `http://localhost:5173`) |

### Starting the Backend

```bash
# Using local Postgres or Neon DSN
DB_DRIVER=postgres DB_DSN="postgres://user:pass@localhost:5432/mtvl?sslmode=disable" go run main.go
```

The server automatically applies all pending Goose migrations upon startup.

---

## 2. Setting Up the Frontend (`mtvl-frontend`)

```bash
# In a separate terminal
git clone https://github.com/mylists/mtvl-frontend.git
cd mtvl-frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser. The frontend will proxy API requests to `http://localhost:8080`.
