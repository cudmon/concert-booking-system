FROM node:24-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV CI=true

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY api/package.json api/

RUN pnpm install --frozen-lockfile

COPY api/ api/

RUN pnpm -F api run build

RUN pnpm -F api deploy --prod /app/deploy

RUN cp -r /app/api/dist /app/deploy/dist

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=build /app/deploy ./

RUN mkdir -p /app/uploads && chown node:node /app/uploads

USER node

EXPOSE 80

CMD ["node", "dist/main"]
