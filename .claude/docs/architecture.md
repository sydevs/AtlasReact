# Architecture

High-level map of Sahaj Atlas. For subsystem-specific rules see `.claude/rules/`.

## What it is

An embeddable, map-first directory of Sahaja Yoga events and venues. It ships as
a **custom element** (`<syatlas-map>`) that host sites embed with an API key, and
also runs standalone in dev.

```
Host page  →  <syatlas-map api-key="…" locale="…">
                 │  (@r2wc/react-to-web-component, src/Widget.tsx)
                 ▼
              <App>  (HashRouter, basename "!")
                 │
   ┌─────────────┼──────────────────────────────┐
   │ Providers   │ Routes (react-router v7)      │
   │ (NextUI,    │  /search          IndexPage   │
   │  ReactQuery,│  /countries/:code CountryPage  │
   │  Helmet)    │  /regions/:id     RegionPage   │
   │             │  /areas/:id       AreaPage     │
   │  MapLayout  │  /venues/:id      VenuePage    │
   │   └ Mapbox  │  /events/:id      EventPage    │
   └─────────────┴──────────────────────────────┘
                 │
            React Query  →  axios client (src/config/api)
                 │              │ Bearer <apiKey>, ?locale=<lng>
                 ▼              ▼
            zod parse      Atlas REST API (VITE_API_ENDPOINT)
```

## Entry points

- **`src/Widget.tsx`** — defines `customElements.define('syatlas-map', …)`, sets
  the API key + locale, ensures `window.location.hash`, and mounts `<App>` inside
  a `HashRouter` (basename `!`). This is the embeddable build.
- **`src/main.tsx`** — standalone dev entry (`index.html`).
- **`src/App.tsx`** — bootstraps the client (`useSuspenseQuery(['client', apiKey])`),
  sets locale, tracks navigation + Fathom pageviews, renders the router inside
  `MapLayout`, wrapped in `Suspense` + `ErrorBoundary`.

## Layers

| Layer       | Where                         | Responsibility |
| ----------- | ----------------------------- | -------------- |
| Web component | `src/Widget.tsx`            | Host-page embedding, props → app |
| Routing     | `src/App.tsx`, `src/pages/`   | HashRouter, entity pages |
| Layout      | `src/layouts/`                | `map` (map + panel), `default` |
| Map         | `src/components/mapbox/`      | ReactMapGL, layers, clustering, search |
| UI          | `src/components/`             | NextUI/Tailwind components per feature |
| Data        | `src/config/api/`             | axios client, zod-validated fetchers, mutations |
| State       | `src/config/store.ts`         | zustand: view / navigation / search |
| i18n        | `src/config/i18n.ts`, `public/locales/` | i18next + HTTP backend |
| Types       | `src/types/`                  | zod schemas + inferred entity types |

## Data flow

1. The widget receives `apiKey` (+ optional `locale`) from the host page.
2. `App` fetches the **client** record (domain, default locale, initial path)
   via React Query and configures locale + analytics from it.
3. The map fetches a clustered **geojson** source of all event points; clicking a
   cluster expands zoom, clicking a point navigates to the entity route.
4. Entity pages fetch their record (`getCountry`/`getRegion`/`getArea`/`getVenue`/
   `getEvent`), each zod-validated, and drive the map camera/selection via the
   `useViewState` store.
5. Every axios request carries `Authorization: Bearer <apiKey>` and `?locale=` via
   the request interceptor.

## Build & deploy

- **Build**: `pnpm build` → `tsc` (typecheck gate) then `vite build` → `dist/`.
  CSS is injected by JS (`vite-plugin-css-injected-by-js`) so the widget styles
  itself when embedded.
- **Deploy**: Vercel serves `dist/` with an SPA rewrite (`vercel.json`: all paths
  → `/`).
- **Theming ("accent")**: `accent.json` + `.github/workflows/{push,sync}-accent.yml`
  sync a shared accent theme. Out of scope unless the task is about theming.

## Conventions index

- Map: `.claude/rules/mapbox.md`
- Data layer: `.claude/rules/data-layer.md`
- i18n + state: `.claude/rules/i18n-and-state.md`
- Components: `.claude/rules/components.md`
- Code style: `.claude/rules/code-style.md`
