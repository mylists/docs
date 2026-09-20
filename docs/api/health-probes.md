---
id: health-probes
title: Health, Liveness & Readiness Probes
sidebar_label: Health Probes
---

# Health, Liveness & Readiness Probes

MTVL includes dedicated health probe endpoints designed for container orchestrators (Kubernetes, Docker Swarm, ECS, Fly.io).

---

## Health Probe Summary

| Endpoint | Probe Type | Checks Database | Expected Status |
| :--- | :--- | :--- | :--- |
| `GET /health` | General Health | Yes (Postgres/MySQL) | `200 OK` (Healthy) / `503` (DB Down) |
| `GET /healthz` | Kubernetes Health | Yes (Postgres/MySQL) | `200 OK` / `503` |
| `GET /livez` | Liveness Probe | **No** (Process only) | `200 OK` |
| `GET /readyz` | Readiness Probe | Yes (Postgres/MySQL) | `200 OK` / `503` |
| `GET /startupz`| Startup Probe | Yes (Postgres/MySQL) | `200 OK` / `503` |

---

## Probe Behavior & Responses

### Liveness Probe (`/livez`)
Checks if the HTTP server process is responsive. Does not ping the database to avoid cascading restarts during transient database network blips.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"status":"alive"}
```

### Readiness & Health Probe (`/readyz`, `/healthz`)
Executes a quick ping (`SELECT 1`) against the configured database.
- If database responds: `200 OK` -> `{"status":"healthy","database":"connected"}`
- If database unreachable: `503 Service Unavailable` -> `{"status":"unhealthy","error":"database unreachable"}`
