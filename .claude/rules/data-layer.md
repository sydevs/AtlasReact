---
description: API/data layer — axios client, zod-validated fetchers, TanStack Query.
globs:
  - "src/config/api/**/*.ts"
  - "src/types/**/*.ts"
alwaysApply: false
---

# Data layer (axios + zod + TanStack Query → SahajCloud)

The widget reads **SahajCloud** (PayloadCMS v3, REST-only) as a third-party,
API-key client. We talk to it over plain `axios` + `zod` — no Payload SDK, no new
runtime deps (the bundle is public). `src/types/payload/` holds the synced
`payload-types.ts` + endpoint `response-types.ts` (run `pnpm types:cms`) as
supplementary compile-time types — keep zod schemas aligned with them.

## The shared axios client (`src/config/api/client.ts`)

- **One** shared `axios` instance, `baseURL = ${VITE_SAHAJCLOUD_URL}/api`, used by
  both `fetch.ts` and `mutate.ts`.
- A request interceptor attaches `Authorization: clients API-Key <atlasAuth.apiKey>`
  and a SahajCloud `locale` param (mapped from i18next via `toSahajLocale`) to
  **every** request. Don't re-attach auth/locale per call.
- Query params are serialized with `qs` (bracket notation) so Payload's nested
  `select` / `populate` / `where` objects encode correctly.
- The API key is set once from the widget's `apiKey` prop (`auth.ts`, wired in
  `Widget.tsx`). Never hardcode a key.

## SahajCloud query rules (enforced — 400 on violation)

- **`select` is required on every client read.** Each fetcher passes a `select`
  object. Build it to mirror the zod schema it parses into.
- **`populate` is required when `depth > 1`.** We read at `depth: 1` with an
  explicit `populate` (e.g. `{ regions: { slug, level, breadcrumbs, … } }`) to
  slim relationships rather than relying on the default depth.

## Fetchers = raw reads + client-derived shaping

SahajCloud exposes only raw collection reads plus two custom endpoints
(`GET /api/events/geojson`, `POST /api/events/:id/register`). It does **not**
provide `eventCount`, `bounds`, region geometry, `path`, `distance`, or HTML
descriptions — those are derived client-side:

- **`getGeojson`** → `/events/geojson` (the single source of map points, counts,
  and geometry). Parsed through `GeojsonSchema`; feature `properties` is a
  `FeedEvent` (internal field names).
- **`getCountries` / `getCountry` / `getRegion` / `getArea` / `getVenue`** → raw
  `/api/regions` (`where[level]` + `where[slug]`, a `where[parent]` children
  query) **plus** the geojson feed, with `eventCount` + `bounds` derived via
  `src/lib/shape` (breadcrumb ancestry) and `src/lib/geo` (`@turf`). Region
  taxonomy is `country / region / city / center` → routed `city`→area,
  `center`→venue (`src/lib/shape/path.ts`).
- **`getEvents`** → nearest events from the feed, sorted by `@turf/distance`.
- **`getEvent`** → raw `/api/events/:id` (depth 1, region + images populated).
  The Lexical `description` is serialized to HTML client-side
  (`src/lib/shape/lexical.ts`) and rendered through DOMPurify in `EventPanel`.
- **`getClient`** → `/api/clients/me` (API-key self-read: locale, theme colors,
  home `region`). **`getAtlasConfig`** → `sy-atlas-config` global (map defaults).

Every fetcher parses through a zod schema from `src/types/` (raw `*DocSchema` /
`FeedEventSchema` / `GeojsonSchema` for the wire, the derived view-model schemas
for what components consume) and keeps a stable `queryKey`
(`['geojson']`, `['client', apiKey]`, `['country', slug]`, …). A SahajCloud shape
change should surface as a parse error, not a deep runtime crash.

## Mutations (`src/config/api/mutate.ts`)

- `createRegistration` → `POST /api/events/:id/register` with
  `{ email, name, startingAt?, questions? }`; the confirmation is parsed through
  `RegistrationResponseSchema`.

## Consuming data — TanStack Query only

- Components fetch via `useQuery` / `useSuspenseQuery`, never by calling the axios
  fetcher directly in an effect.
- Endpoints that key off locale: the interceptor sends the resolved locale, so
  switching language refetches when the locale is part of the query key or the
  resolved language varies the data.

## Errors

- Network/parse failures bubble to the `react-error-boundary` `<ErrorBoundary>`
  in `App.tsx` (`ErrorFallback`). Suspense queries show `LoadingFallback`. Don't
  swallow errors in fetchers — let them propagate so the boundary renders.
