---
id: overview
title: MTVL REST API Overview
sidebar_label: API Overview
---

# MTVL REST API Overview

The MTVL backend provides a comprehensive, high-throughput RESTful API designed for media tracking, catalog management, and seamless integration with frontends, CLI tools, and automation scripts.

---

## Base URLs

| Environment | Base URL |
| :--- | :--- |
| **Local Development** | `http://localhost:8080` |
| **Production** | `https://api.mylists.cc` |

---

## Interactive OpenAPI 3.0 & Swagger UI

The backend includes built-in interactive OpenAPI 3.0 documentation:
- **OpenAPI 3.0 JSON Schema**: `GET /api/v1/openapi.json`
- **Embedded Swagger / Docs UI**: `GET /api/v1/docs`

---

## Authentication & Headers

Protected endpoints require a JSON Web Token (JWT) or Personal Access Token (PAT) passed in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_or_api_token>
Content-Type: application/json
Accept: application/json
```

---

## Common HTTP Status Codes

| Status Code | Reason | Description |
| :--- | :--- | :--- |
| `200 OK` | Success | Request succeeded. Response body contains requested resource or message. |
| `201 Created` | Created | Resource was created successfully. |
| `400 Bad Request` | Validation Error | Request payload failed validation or required fields are missing. |
| `401 Unauthorized` | Auth Required | Missing, expired, or invalid Bearer token. |
| `403 Forbidden` | Access Denied | Insufficient permissions for the requested resource. |
| `404 Not Found` | Not Found | Target resource or endpoint does not exist. |
| `409 Conflict` | Conflict | Duplicate resource identifier or unique constraint conflict. |
| `500 Internal Error`| Server Error | Unexpected internal failure (database, server fault). |
| `503 Service Unavail`| DB Unreachable | Health probes return 503 when the database is unreachable. |

---

## Standard Error Response Format

When an error occurs, the API returns a JSON error payload:

```json
{
  "error": "Invalid username or password",
  "status": 401,
  "timestamp": "2026-09-20T10:30:00Z"
}
```
