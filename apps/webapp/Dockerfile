FROM node:26-trixie-slim AS build

WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV HUSKY=0
RUN npm install --global corepack@0.36.0 && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Mapbox public token; it ships in the JS bundle by design.
# hadolint ignore=DL3064
ARG VITE_MAPBOX_API_KEY
RUN pnpm build

FROM caddy:2.11
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
