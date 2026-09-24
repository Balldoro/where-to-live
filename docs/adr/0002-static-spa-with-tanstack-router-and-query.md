# Static SPA with TanStack Router and TanStack Query, served by Caddy

The frontend is a client-only single-page app built with Vite + React, using TanStack Router for routing and TanStack Query for server state. The app needs no SSR or server functions: FastAPI is the only backend, and a second server runtime would add hosting cost and blur the boundary between frontend and API. TanStack Router was chosen for its typed, validated search params, since the Candidate location lives in the URL.

The frontend calls the API through `openapi-fetch`, typed by `openapi-typescript` from the OpenAPI schema FastAPI generates. They generate only types, add a thin runtime, and address endpoints by their real paths, so frontend calls map one to one onto FastAPI routes.

The production build is a set of static files served by Caddy, running in a Docker container in the same Compose stack as the API. Caddy also reverse-proxies `/api/*` to FastAPI, so the frontend and the API share one origin.

## Consequences

- No Node.js server in production. The frontend image is a multi-stage build: Node builds `dist/`, and the final Caddy image only serves the files, with a fallback to `index.html` for client-side routes.
- Because the frontend and API share one origin, there is no CORS setup, and the httpOnly session cookie works with `SameSite=Lax`.
- The generated types are only as good as the schema: every route declares its response model and its error responses, and distinct states (e.g. "no stops" vs unknown Coverage) are distinct shapes in the schema.
