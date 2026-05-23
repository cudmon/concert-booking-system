FROM node:24-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV CI=true

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY web/package.json web/

RUN pnpm install --frozen-lockfile

COPY web/ web/

ARG API_URL

ENV API_URL=${API_URL}

ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm -F web run build

FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

ENV PORT=3000

ENV HOSTNAME=0.0.0.0

COPY --from=build /app/web/.next/standalone ./

COPY --from=build /app/web/.next/static ./web/.next/static

USER node

EXPOSE 3000

CMD ["node", "web/server.js"]
