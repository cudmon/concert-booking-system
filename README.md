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
| `DB_PORT`     | db (host) | `5432`     |
| `JWT_SECRET`  | api       | `secret`   |
| `WEB_PORT`    | web(host) | `3000`     |
