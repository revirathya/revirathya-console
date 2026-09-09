# Revirathya Console

Admin console for the Revirathya platform — a single-page web app for managing
personal finance records (expenses and their master data) against a GraphQL
backend.

> **Status:** pre-release (`v0.0.1`). APIs, schema, and UI are still changing.

## Features

- **Expenses** — list, create, edit, and delete expense transactions
  (`/finance/expenses`), filterable by transaction date.
- **Masters** — manage expense categories (`/finance/masters`).
- **Profile** — view the current user's account details, including Telegram
  chat ID (`/profile`).
- Light/dark theme with no flash-of-wrong-theme on load, persisted to
  `localStorage`.
- Toast notifications, confirm dialogs, data tables, and a reusable
  atom/molecule/organism component library.

## Tech stack

| Concern    | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | Svelte 5 (runes) + Vite 8                         |
| Language   | TypeScript                                        |
| Routing    | `sv-router`                                       |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`)             |
| Icons      | `@lucide/svelte`                                  |
| Data       | GraphQL via `graphql-request`                     |
| Codegen    | GraphQL Code Generator (`client` preset)          |
| Deploy     | Static build served by nginx (multi-stage Docker) |

The app follows a feature-oriented structure under `src/lib/features/*`, with
each feature split into `model` / `mapper` / `repository` (interface +
`.http` implementation) / `store` layers.

## Getting started

### Prerequisites

- Node.js 22+
- A running Revirathya GraphQL API (default `http://localhost:8080/graphql`)

### Install

```bash
npm install
```

### Configure

Environment variables are read by Vite at build/dev time (`VITE_*` values are
inlined into the bundle):

| Variable                | Description                             | Default    |
| ----------------------- | -------------------------------------- | ---------- |
| `VITE_GRAPHQL_ENDPOINT` | GraphQL endpoint (absolute URL or path) | `/graphql` |
| `VITE_DEFAULT_USER_ID`  | User ID the console loads data for      | `''`       |

Local defaults live in `.env` / `.env.local` (not committed).

### Develop

```bash
npm run dev       # start Vite dev server
npm run check     # svelte-check + tsc type checking
npm run build     # production build to dist/
npm run preview   # preview the production build
```

### GraphQL codegen

Types and typed documents in `src/lib/graphql/generated/` are generated from
the operations in `src/lib/graphql/operation/**/*.graphql` against the live
schema:

```bash
npm run codegen
```

The schema URL is configured in `codegen.ts` (`http://localhost:8080/graphql`).

## Docker

Multi-stage build (Vite build → nginx). nginx serves the SPA and proxies
`/graphql` to the backend given by `API_UPSTREAM`.

```bash
docker build -t revirathya/revirathya-console:latest \
  --build-arg VITE_DEFAULT_USER_ID=<user-id> .

docker run --rm -p 5173:80 \
  -e API_UPSTREAM=http://host.docker.internal:8080 \
  revirathya/revirathya-console
```

The app is then available at http://localhost:5173.

## Project layout

```
src/
  App.svelte, main.ts        app entry
  app.css                    Tailwind + design tokens
  router/                    route table + nav model
  pages/                     route components
  lib/
    api/                     GraphQL client + config
    graphql/                 schema, operations, generated types
    features/                user, finance/expenses, finance/categories
    components/              atoms / molecules / organisms / templates
    stores/                  theme, toast, ui
    utils/                   formatting helpers
docker/                      nginx config template
dev-notes/                   scratch commands
```

## License

TBD.
