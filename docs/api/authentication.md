---
id: authentication
title: Authentication Endpoints
sidebar_label: Authentication
---

# Authentication API

MTVL provides authentication endpoints for registering users, issuing JWT tokens, retrieving profile details, updating passwords, and managing accounts.

---

## Register User

<span className="badge-post">POST</span> `/api/v1/auth/register`

Register a new user account.

### Request Body

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SuperSecretPassword123!"
}
```

### Response (`201 Created`)

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 42,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2026-09-20T10:00:00Z"
  }
}
```

---

## Authenticate & Issue Token (Login)

<span className="badge-post">POST</span> `/api/v1/auth/login`

Authenticates credentials and returns a signed JWT token.

### Request Body

```json
{
  "username_or_email": "johndoe",
  "password": "SuperSecretPassword123!"
}
```

### Response (`200 OK`)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 42,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

## Get Current Profile

<span className="badge-get">GET</span> `/api/v1/auth/me`

Retrieves the authenticated user's profile.

### Headers
```http
Authorization: Bearer <token>
```

### Response (`200 OK`)

```json
{
  "id": 42,
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2026-09-20T10:00:00Z"
}
```

---

## Update Profile

<span className="badge-put">PUT</span> `/api/v1/auth/me`

Updates current user username or email.

### Request Body
```json
{
  "username": "john_updated",
  "email": "john.new@example.com"
}
```

---

## Change Password

<span className="badge-put">PUT</span> `/api/v1/auth/password`

Updates the authenticated user's password.

### Request Body
```json
{
  "old_password": "SuperSecretPassword123!",
  "new_password": "NewUltraSecurePassword456!"
}
```

---

## Delete Account

<span className="badge-delete">DELETE</span> `/api/v1/auth/me`

Deletes the user account and associated personal lists. Shared public catalog entries created by the user remain intact.
