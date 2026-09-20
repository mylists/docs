---
id: deployment
title: Production Deployment with Neon
sidebar_label: Production Deployment
---

# Production Deployment with Neon

Complete recipes for deploying MTVL backend and frontend connected to a Neon Serverless Postgres instance.

---

## Deployment Architectures

```
                    [ Users & Web Browsers ]
                               |
                               v
            +------------------------------------+
            |      Ingress / Cloudflare / CDN    |
            +------------------------------------+
                 |                          |
                 v                          v
    +-------------------------+  +----------------------+
    |  mtvl-frontend (NGINX)  |  |   mtvl (Go Backend)  |
    +-------------------------+  +----------------------+
                                            |
                                            v (TLS Connection Pooling)
                                 +----------------------+
                                 |  Neon Postgres DB    |
                                 +----------------------+
```

---

## Recipe 1: Docker Compose

```yaml title="docker-compose.yml"
version: '3.8'

services:
  backend:
    image: ghcr.io/mylists/mtvl:latest
    ports:
      - "8080:8080"
    environment:
      - SERVER_PORT=8080
      - DB_DRIVER=postgres
      - DB_DSN=postgres://user:password@ep-cool-cloud-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
      - JWT_SECRET=supersecretproductionjwtkey
      - CORS_ALLOWED_ORIGINS=https://app.mylists.cc
    restart: always

  frontend:
    image: ghcr.io/mylists/mtvl-frontend:latest
    ports:
      - "80:80"
    environment:
      - API_BASE_URL=https://api.mylists.cc
    restart: always
```

---

## Recipe 2: Kubernetes with Helm / Klu

MTVL includes pre-configured Helm charts in the [`kubernetes`](https://github.com/mylists/kubernetes) repository.

### 1. Create the Database Secret
```bash
kubectl create secret generic mtvl-backend-secrets \
  --from-literal=db-dsn="postgres://user:password@ep-cool-cloud-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" \
  --from-literal=jwt-secret="production-jwt-key-256"
```

### 2. Deploy Helm Chart
```bash
helm upgrade --install mtvl ./kubernetes/charts/mtvl \
  --set backend.env.dbDriver=postgres \
  --set backend.existingSecret=mtvl-backend-secrets \
  --set ingress.enabled=true \
  --set ingress.host=mylists.cc
```

---

## Recipe 3: Fly.io Deployment

```bash
# 1. Set secrets on Fly.io
fly secrets set \
  DB_DRIVER="postgres" \
  DB_DSN="postgres://user:password@ep-cool-cloud-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" \
  JWT_SECRET="your-fly-secret-jwt"

# 2. Deploy backend
fly deploy --app mtvl-api
```
