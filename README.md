# MTVL Documentation Site

Official documentation site for the **MTVL** (Media Tracking & Virtual Lists) platform, built using [Docusaurus](https://docusaurus.io/).

---

## Content Structure

- **MTVL App Guide**: Public catalogs, personal tracking lists, ratings, episode/page progress, global search, backup import/export, profile & API tokens.
- **REST API Reference**: Authentication (JWT / Bearer), category discovery, movies, TV shows, books, search, statistics, import/export, personal tokens, health probes.
- **Developer Guide**: Go backend architecture, adding custom categories with `cmd/create-category`, Goose migrations, pluggable auth providers, React 19 frontend integration, test suites.
- **Neon Postgres Guide**: Serverless database setup, pooled vs direct DSN, pgBouncer connection pooling, Goose database migrations, database branching workflows, and containerized cloud deployment recipes.

---

## Local Development

```bash
# Install dependencies
npm install

# Start local preview server with hot reloading
npm run start

# Build production static website bundle
npm run build

# Run automated documentation validation test suite
npm test
```
