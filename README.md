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

You can create account directly both Admin and Regular User from the UI with any email and password. Then you can create concerts, view them, and book tickets.

## Environment

All variables have safe defaults in `.env.example`. The only one you **must** set is `JWT_SECRET`.

| Variable      | Used by | Default    |
| ------------- | ------- | ---------- |
| `DB_NAME`     | db, api | `postgres` |
| `DB_USERNAME` | db, api | `postgres` |
| `DB_PASSWORD` | db, api | `postgres` |
| `DB_PORT`     | db      | `5432`     |
| `JWT_SECRET`  | api     | `secret`   |
| `WEB_PORT`    | web     | `3000`     |

# Commands

Before running the commands below, make sure to install dependencies with `pnpm install` at the root of the project.

- `pnpm -F api run dev` - Start the API in development mode with hot-reloading.
- `pnpm -F api run build` - Build the API for production.
- `pnpm -F api run start` - Start the API in production mode after building.
- `pnpm -F api run test` - Run API tests with Jest.
- `pnpm -F web run dev` - Start the web frontend in development mode with hot-reloading.
- `pnpm -F web run build` - Build the web frontend for production.
- `pnpm -F web run start` - Start the web frontend in production mode after building.

# Future improvements

1. Performance optimizations
   - Implement caching strategies for frequently accessed data.
   - Optimize database queries and indexing.
   - Use a CDN for static assets.
2. Concurrency handling
   - Currently, use transactions with serializable isolation level to prevent race conditions during booking.
   - For high-load scenarios, using in-memory databases like Redis to manage concurrent booking requests and handle transactions in job queues to reduce load on the main database.

