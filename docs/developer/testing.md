---
id: testing
title: Testing & Quality Assurance
sidebar_label: Testing
---

# Testing & Quality Assurance

MTVL enforces strict testing across both backend and frontend layers.

---

## Backend Automated Tests (Go)

The Go backend utilizes `go test` along with `go-sqlmock` for isolated database mock testing.

```bash
# Run all unit and integration tests
go test -v ./...

# Run tests with race condition detector
go test -race ./...

# Run test coverage analysis
go test -coverprofile=coverage.out ./...
go tool cover -func=coverage.out
```

### Key Test Suites
- `internal/auth/jwt_test.go`: Tests token generation, validation, expiration, and password hashing.
- `internal/core/registry_test.go`: Tests module registration, duplicates, and dynamic route mounting.
- `internal/db/db_test.go`: Tests Goose SQL migration execution and database driver compatibility.
- `internal/health/health_test.go`: Tests Kubernetes liveness (`/livez`) vs readiness (`/readyz`) probes.

---

## Frontend Automated Verification

```bash
# Type checking with TypeScript compiler
npm run lint

# Production build verification
npm run build
```
