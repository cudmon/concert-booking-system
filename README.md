# Concert Booking System

NestJS API + Next.js web + PostgreSQL, packaged for one-command Docker deploys.

## Stack

- `api/` — NestJS 11, TypeORM, PostgreSQL
- `web/` — Next.js 16, Mantine, React Query
- `docker-compose.yml` — db + api + web

## Quick start

```bash
docker compose up -d --build
```

Web UI will be available at http://localhost:3000

## Environment

All variables have safe defaults in `.env.example`. The only one you **must** set is `JWT_SECRET`.

| Variable      | Used by   | Default    |
| ------------- | --------- | ---------- |
| `DB_NAME`     | db, api   | `postgres` |
| `DB_USERNAME` | db, api   | `postgres` |
| `DB_PASSWORD` | db, api   | `postgres` |
| `DB_PORT`     | db        | `5432`     |
| `JWT_SECRET`  | api       | `secret`   |
| `WEB_PORT`    | web       | `3000`     |

# Future improvements

1. Performance optimizations
   - Implement caching strategies for frequently accessed data.
   - Optimize database queries and indexing.
   - Use a CDN for static assets.
2. Concurrency handling
   - Use in-memory databases like Redis to manage concurrent booking requests and handle transactions in job queues,
