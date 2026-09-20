---
id: migrations
title: Database Migrations with Goose & Neon
sidebar_label: Goose Migrations
---

# Database Migrations with Goose & Neon

MTVL uses [**Goose**](https://github.com/pressly/goose) for versioned, declarative SQL database schema migrations.

---

## Migration Architecture

Migrations reside in `migrations/postgres/`:

- `20260804191235_users.sql`: Creates `users` table and authentication indexes.
- `20260804191237_movies.sql`: Creates `movies` and `user_movie_lists` tables.
- `20260804191238_tv_shows.sql`: Creates `tv_shows` and `user_tv_show_lists` tables.
- `20260804191240_books.sql`: Creates `books` and `user_book_lists` tables.
- `20260912020906_api_tokens.sql`: Creates personal developer `api_tokens` table.

---

## Running Migrations Automatically on Startup

MTVL embeds migrations into the compiled Go binary using `//go:embed migrations/*/*.sql`.

When the backend container starts, it automatically checks the `goose_db_version` table in Neon and executes any unapplied SQL migration files in sequence inside a database transaction.

---

## Running Migrations Manually via CLI

If you prefer applying migrations outside the application runtime (e.g. in a CI/CD pipeline):

```bash
# Install Goose CLI
go install github.com/pressly/goose/v3/cmd/goose@latest

# Set Direct Neon DSN (Direct endpoint is recommended for schema DDL changes)
export DB_DSN="postgres://user:pass@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Check migration status
goose -dir migrations/postgres postgres "$DB_DSN" status

# Apply pending migrations
goose -dir migrations/postgres postgres "$DB_DSN" up

# Rollback last migration if needed
goose -dir migrations/postgres postgres "$DB_DSN" down
```
