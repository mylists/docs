---
id: overview
title: Setting up MTVL with Neon Serverless Postgres
sidebar_label: Neon Overview
---

# Setting up MTVL with Neon Serverless Postgres

[**Neon**](https://neon.tech) is a modern serverless PostgreSQL platform built for cloud scalability. By separating storage from compute, Neon provides features uniquely suited for MTVL deployments.

---

## Why Neon for MTVL?

```
+-------------------------------------------------------------------------+
|                                Neon Postgres                            |
+-------------------------------------------------------------------------+
|   [ Direct / Pooled Connection String (sslmode=require) ]               |
|                               |                                         |
|                               v                                         |
|  +-------------------------------------------------------------------+  |
|  | Neon Autoscaling Compute Endpoint (Scale to Zero during idle)     |  |
|  +-------------------------------------------------------------------+  |
|                               |                                         |
|                               v                                         |
|  +-------------------------------------------------------------------+  |
|  | Serverless Storage Engine (Instant Branching: main, dev, staging) |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
```

1. **Scale-to-Zero & Cost Efficiency**: Neon automatically pauses compute during periods of inactivity and awakens instantly upon incoming queries, ideal for self-hosted instances.
2. **Built-in Connection Pooling (pgBouncer)**: Serverless functions and microservices can open thousands of connections without exhausting Postgres connection limits.
3. **Instant Database Branching**: Create point-in-time copy-on-write clones of your production database in under a second for testing migrations or running staging environments.
4. **100% Postgres Compatibility**: MTVL's standard GORM models and Goose SQL migrations run seamlessly without code modifications.
