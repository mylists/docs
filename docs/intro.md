---
id: intro
title: Introduction to MTVL
sidebar_label: Overview
slug: /
---

# MTVL: Modular Media & Literature Tracking Platform

**MTVL** (Media Tracking & Virtual Lists) is an extensible, high-performance tracking platform built in **Go** and **React 19**. It allows individuals and communities to catalog, monitor, and rate media across diverse domains including **movies**, **TV shows**, **books**, **anime**, **manga**, and **video games**.

```
+-------------------------------------------------------------------------+
|                                MTVL Platform                            |
+-------------------------------------------------------------------------+
|  +---------------------------+       +-------------------------------+  |
|  |     mtvl-frontend         |       |         MTVL REST API         |  |
|  |  (React 19 + TypeScript)  |<----->|          (Go + Chi)           |  |
|  +---------------------------+       +-------------------------------+  |
|                                                      |                  |
|                                      +---------------+---------------+  |
|                                      |                               |  |
|                                      v                               v  |
|                       +----------------------------+   +-------------+  |
|                       |  Neon Serverless Postgres  |   | MySQL /     |  |
|                       |   (Goose Migrations)       |   | SQLite      |  |
|                       +----------------------------+   +-------------+  |
+-------------------------------------------------------------------------+
```

---

## Core Architecture Highlights

### 1. Dual-Tier Data Model (Public Catalogs + Personal Lists)
MTVL cleanly decouples shared catalog data from individual user tracking states:
- **Public Catalogs**: Shared global repository of media items (e.g., *Inception*, *Breaking Bad*, *Dune*). Anyone can browse, search, and discover items without authentication.
- **Personal Tracking Lists**: Authenticated users add catalog items to their private tracking lists, recording custom statuses (e.g. *Watching*, *Completed*, *Plan to Watch*), episode/page counts, personal scores, and private notes.

### 2. Extensible Category Module System
Every category (movies, TV shows, books, etc.) is implemented as a standalone Go module conforming to the `core.CategoryModule` interface. New categories can be generated in seconds using the built-in CLI generator:
```bash
go run cmd/create-category/main.go -name podcasts -display "Podcasts"
```

### 3. Multi-Database Architecture & Neon Serverless Postgres
Driven by **Goose SQL migrations**, MTVL supports PostgreSQL, MySQL, and SQLite. For modern cloud deployments, MTVL is natively optimized for **Neon Serverless Postgres**, supporting auto-scaling compute, connection pooling, branch workflows, and SSL encryption.

### 4. Pluggable Authentication
The backend features an abstract `auth.AuthProvider` interface with:
- **Built-in JWT Authentication**: Native user registration, login, bcrypt password hashing, and API personal access token management.
- **External Auth Adapter**: Drop-in compatibility with OpenID Connect (OIDC), Clerk, Auth0, Supabase, or Keycloak.

---

## Ecosystem Components

| Component | Repository | Technology Stack | Description |
| :--- | :--- | :--- | :--- |
| **Backend** | [`mylists/mtvl`](https://github.com/mylists/mtvl) | Go 1.26, Chi v5, GORM, Goose | Core REST API, authentication, modular category registry |
| **Frontend** | [`mylists/mtvl-frontend`](https://github.com/mylists/mtvl-frontend) | React 19, TypeScript, Vite, Tailwind CSS | Single-page application, interactive dashboard, search & tracking UI |
| **Deployments** | [`mylists/kubernetes`](https://github.com/mylists/kubernetes) | Helm 3, Klu, Ingress-NGINX | Production Kubernetes charts for containerized deployments |
| **Database** | [Neon Postgres](https://neon.tech) | PostgreSQL 16+ Serverless | Cloud serverless database with branch isolation and pgBouncer pooling |

---

## Navigating the Documentation

- 📱 [**MTVL App User Guide**](/app/overview): Learn how to browse catalogs, manage lists, track reading/watching progress, and manage API keys.
- 🔌 [**MTVL REST API Reference**](/api/overview): Detailed documentation of all API routes, parameters, request/response bodies, and code examples.
- 🛠️ [**Developer Guide**](/developer/architecture): Architectural deep-dive, adding custom modules, pluggable auth providers, and frontend extensions.
- ⚡ [**Neon Postgres Setup**](/neon/overview): Step-by-step guide to setting up and optimizing Neon Serverless Postgres for MTVL.
