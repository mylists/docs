---
id: pluggable-auth
title: Pluggable Authentication System
sidebar_label: Pluggable Auth
---

# Pluggable Authentication Subsystem

MTVL supports flexible authentication backends through the `auth.AuthProvider` interface, enabling native JWT auth or enterprise identity providers (Clerk, Auth0, Supabase, Keycloak, OIDC).

---

## The `AuthProvider` Interface

```go
package auth

import (
    "net/http"
    "github.com/go-chi/chi/v5"
)

type AuthProvider interface {
    // RegisterRoutes registers auth endpoints (/login, /register, etc.)
    RegisterRoutes(r chi.Router)
    
    // AuthenticateMiddleware enforces authentication on protected routes
    AuthenticateMiddleware(next http.Handler) http.Handler
    
    // GetUserIDFromContext retrieves the authenticated user ID from context
    GetUserIDFromContext(r *http.Request) (string, error)
}
```

---

## 1. Built-in JWT Auth Provider (`jwt.go`)

- **Storage**: Stores users and password hashes in the application database using `bcrypt` cost factor 12.
- **Tokens**: Signs JWT tokens containing `user_id`, `username`, and `exp` claims with HMAC-SHA256.
- **API Personal Access Tokens**: Validates opaque token prefixes (`mtvl_pat_...`) against the `api_tokens` database table.

```go
// Initialized when AUTH_PROVIDER_TYPE=jwt
authProvider = auth.NewJWTAuthProvider(database, cfg.JWTSecret)
```

---

## 2. External Identity Adapter (`adapter.go`)

For organizations using OAuth2 / OIDC providers (Clerk, Supabase, Auth0, Keycloak):

```go
// Initialized when AUTH_PROVIDER_TYPE=external
authProvider = auth.NewExternalAuthProvider("https://your-domain.clerk.accounts.dev", "mtvl-client-id")
```

The adapter:
1. Validates standard OpenID Connect JWT signatures via JWKS public keys.
2. Extracts the subject claim (`sub`) as the canonical user identifier.
3. Automatically maps external users to MTVL personal lists without requiring local password storage.
