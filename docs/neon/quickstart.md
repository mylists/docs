---
id: quickstart
title: "Neon Quickstart: Connecting MTVL"
sidebar_label: "Quickstart"
---

# Neon Quickstart: Connecting MTVL

Follow these steps to provision a Neon database and connect your MTVL backend in under 5 minutes.

---

## Step 1: Create a Neon Project

### Option A: Via Neon Web Console
1. Navigate to [console.neon.tech](https://console.neon.tech) and sign in.
2. Click **Create Project**.
3. Name your project (e.g. `mtvl-production`).
4. Select your preferred Cloud Region (e.g., `AWS us-east-2` or `AWS eu-central-1`) and PostgreSQL version (`16` or `17`).
5. Click **Create Project**.

### Option B: Via Neon CLI
```bash
# Install Neon CLI
npm install -g neonctl

# Authenticate
neonctl auth

# Create new project
neonctl projects create --name mtvl-production
```

---

## Step 2: Obtain Connection String (DSN)

In your Neon Dashboard:
1. Navigate to the **Connection Details** widget.
2. Select your branch (e.g. `main`) and database (e.g. `neondb`).
3. Toggle **Connection Pooling** ON.
4. Copy the connection URI:

```
postgres://user:password@ep-xyz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

:::important SSL Requirement
Neon requires SSL connections. Ensure `sslmode=require` is appended to your DSN connection string.
:::

---

## Step 3: Configure MTVL Environment Variables

Set the following environment variables when running MTVL:

```bash
export DB_DRIVER="postgres"
export DB_DSN="postgres://alex:secretpassword@ep-icy-pond-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
export JWT_SECRET="your-256-bit-secret-key-here"
export SERVER_PORT="8080"
```

---

## Step 4: Run the Backend & Verify Migrations

Start the backend:

```bash
go run main.go
```

The output will confirm successful connection and automatic Goose migration execution:

```log
2026/09/20 03:30:00 [Init] Starting backend server on port 8080
2026/09/20 03:30:00 [Init] Database driver: postgres, DSN: postgres://...
2026/09/20 03:30:01 [DB] Connected to database successfully
2026/09/20 03:30:01 [Goose] Applied migration: 20260804191235_users.sql
2026/09/20 03:30:01 [Goose] Applied migration: 20260804191237_movies.sql
2026/09/20 03:30:01 [Goose] Applied migration: 20260804191238_tv_shows.sql
2026/09/20 03:30:01 [Goose] Applied migration: 20260804191240_books.sql
2026/09/20 03:30:01 [Auth] Initialized Built-in JWT Auth Provider
2026/09/20 03:30:01 [Server] Listening on :8080
```
