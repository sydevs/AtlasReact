---
description: API/data layer — axios client, zod-validated fetchers, TanStack Query.
globs:
  - "src/config/api/**/*.ts"
  - "src/types/**/*.ts"
alwaysApply: false
---

# Data layer (axios + zod + TanStack Query)

## The axios client (`src/config/api/fetch.ts`)

- One shared `axios` instance, `baseURL = import.meta.env.VITE_API_ENDPOINT`.
- A request interceptor attaches `Authorization: Bearer <atlasAuth.apiKey>` and a
  `locale` param from `i18n.resolvedLanguage` to **every** request. Don't
  re-attach auth/locale per call — rely on the interceptor.
- The API key is set once from the widget's `apiKey` prop (`src/config/api/auth.ts`,
  wired in `Widget.tsx`). Never hardcode a key.

## Every fetcher validates with zod

- Each `getX` parses the response through a zod schema from `src/types/`
  (`CountrySchema`, `RegionSchema`, `EventSchema`, the `*SlimSchema` list
  variants, `ClientSchema`, …) before returning. **Keep this contract**: a new
  endpoint gets a schema in `src/types/` and parses through it, so a backend
  shape change surfaces as a parse error, not a deep runtime crash.
- Export new fetchers from the default object in `fetch.ts` and re-export via
  `src/config/api/index.ts`.
- Mutations live in `src/config/api/mutate.ts`.

## Consuming data — TanStack Query only

- Components fetch via `useQuery` / `useSuspenseQuery`, never by calling the
  axios fetcher directly in an effect.
- **Cache keys**: use a stable, descriptive `queryKey` array (`['geojson']`,
  `['client', apiKey]`, `['country', code]`). Keep keys consistent so caches
  dedupe and invalidation works.
- Endpoints that key off locale: include the locale (or rely on the resolved
  language being part of what makes the data vary) so switching language
  refetches correctly.

## Errors

- Network/parse failures bubble to the `react-error-boundary` `<ErrorBoundary>`
  in `App.tsx` (`ErrorFallback`). Suspense queries show `LoadingFallback`.
  Don't swallow errors in fetchers — let them propagate so the boundary renders.
