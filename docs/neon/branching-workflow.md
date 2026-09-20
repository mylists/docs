---
id: branching-workflow
title: Neon Database Branching for CI/CD & Staging
sidebar_label: Branching Workflows
---

# Neon Database Branching for CI/CD & Staging

One of Neon's defining capabilities is **instant database branching**. You can create an isolated copy of your production data in seconds without paying for duplicate storage.

---

## Branching Concepts for MTVL

```
                  [ production (main branch) ]
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
[ staging branch (for QA) ]          [ pr-42 branch (for CI tests) ]
```

- **Zero-Copy Cloning**: Branches share unchanged storage blocks with the parent branch. You only pay for written deltas.
- **Isolated Testing**: Test destructive migrations or schema updates on a branch without risking production uptime.

---

## Workflow: Testing a New Category Migration

When adding a new category module (e.g. `videogames`):

```bash
# 1. Create a development branch from main
neonctl branches create --name feature-videogames

# 2. Get the connection string for the new branch
export DEV_DB_DSN=$(neonctl connection-string feature-videogames --pooled)

# 3. Run the backend against the branch database
DB_DRIVER=postgres DB_DSN="$DEV_DB_DSN" go run main.go

# 4. Verify test suite passes against branch
go test -v ./...

# 5. Delete the branch once verified
neonctl branches delete feature-videogames
```

---

## GitHub Actions Automated Preview Environments

```yaml title=".github/workflows/preview.yml"
name: Ephemeral Preview Database
on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

jobs:
  neon-branch:
    runs-on: ubuntu-latest
    steps:
      - name: Create Neon Database Branch
        uses: neondatabase/create-branch-action@v5
        if: github.event.action != 'closed'
        with:
          project_id: ${{ secrets.NEON_PROJECT_ID }}
          api_key: ${{ secrets.NEON_API_KEY }}
          branch_name: preview-pr-${{ github.event.number }}
        id: create-branch

      - name: Run Backend Tests
        if: github.event.action != 'closed'
        env:
          DB_DSN: ${{ steps.create-branch.outputs.db_url_with_pooler }}
        run: |
          go test -v ./...

      - name: Delete Branch on PR Merge/Close
        uses: neondatabase/delete-branch-action@v3
        if: github.event.action == 'closed'
        with:
          project_id: ${{ secrets.NEON_PROJECT_ID }}
          api_key: ${{ secrets.NEON_API_KEY }}
          branch_name: preview-pr-${{ github.event.number }}
```
