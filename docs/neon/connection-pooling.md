---
id: connection-pooling
title: Neon Connection Pooling & pgBouncer
sidebar_label: Connection Pooling
---

# Neon Connection Pooling & pgBouncer

When running multi-instance MTVL deployments or serverless frontends, connection management is critical to prevent Postgres connection exhaustion.

---

## Direct vs. Pooled Connection Strings

Neon provides two distinct connection endpoints for every database branch:

```
Direct Endpoint:
postgres://user:pass@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
                                  ^^^^^^ (Direct to Postgres Compute)

Pooled Endpoint:
postgres://user:pass@ep-cool-cloud-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
                                         ^^^^^^^ (Routes through pgBouncer)
```

| Feature | Direct Endpoint | Pooled Endpoint (`-pooler`) |
| :--- | :--- | :--- |
| **Max Concurrent Connections** | Up to 100-500 (Compute size dependent) | Up to **10,000+** |
| **Ideal For** | Schema migrations, DDL scripts | HTTP API servers, GORM backend instances |
| **Pooling Mode** | None | **Transaction Pooling** |
| **Prepared Statements** | Full support | Supported with binary parameter binding |

---

## Best Practices for MTVL with Neon

1. **Use Pooled DSN for Backend API**: Set `DB_DSN` with `-pooler` for runtime API instances.
2. **GORM Connection Pool Tuning**: Configure GORM connection pool limits inside Go to match your workload:
```go
sqlDB, err := database.DB()
if err == nil {
    // SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
    sqlDB.SetMaxIdleConns(10)
    // SetMaxOpenConns sets the maximum number of open connections to the database.
    sqlDB.SetMaxOpenConns(50)
    // SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
    sqlDB.SetConnMaxLifetime(time.Hour)
}
```
3. **Always enforce SSL**: Keep `sslmode=require` enabled in all connection strings.
