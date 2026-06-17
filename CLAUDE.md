# Sahaj Atlas — Developer Guide (AGENTS.md / CLAUDE.md)

Map-based atlas of Sahaja Yoga events and venues, shipped as an **embeddable web
component** (`<syatlas-map>`). Host sites drop in the custom element with an API
key; it renders a full Mapbox experience with a country → region → area → venue →
event hierarchy.

## Overall instructions

- **Package manager is `pnpm`** (`pnpm@9.15.0`). Never use `npm`/`yarn` to
  install, run, or exec — a hook blocks it. `npm view` / `npm why` are fine for
  read-only registry queries.
- **Run `git` from the project root directly.** Don't `cd <project> && git …` or
  `git -C <path> …` — a hook blocks both.
- **Prefer MCP tools over `WebFetch`** when an MCP server covers the source:
  use the **github** MCP for issues/PRs/code search and the **Playwright** MCP
  for driving the running widget in a browser (screenshots, clicks, map
  interaction). See `.claude/docs/mcp-setup.md`.
- **Modular rules & docs.** Path-scoped guidance lives in `.claude/rules/*.md`
  (auto-loaded when you edit matching files) and reference docs in
  `.claude/docs/*.md`. Skim the relevant rule before editing a subsystem.
- **Commit messages** end with:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

## Project overview

| Concern        | Choice |
| -------------- | ------ |
| Build tool     | Vite 5 (`vite.config.ts`), SPA, `type: module` |
| UI             | React 18, **NextUI v2** (`@nextui-org/react`), Tailwind 3 + **tailwind-variants** |
| Map            | **Mapbox GL** via `react-map-gl`, `@mapbox/search-js-react`, `@turf/*` geo helpers |
| Routing        | `react-router` v7, **HashRouter** (basename `!`) — the widget owns the URL hash |
| Data           | **TanStack Query** + `axios` (`src/config/api/`), **zod**-validated responses |
| State          | **zustand** stores (`src/config/store.ts`) |
| i18n           | `i18next` + `react-i18next`, HTTP backend loads `public/locales/<lng>/<ns>.json` |
| Forms          | `react-hook-form` + `zod` (`@hookform/resolvers`) |
| Misc           | `framer-motion`, `swiper`, `luxon` (dates), `dompurify`, `fathom-client` (analytics), `react-helmet-async` |
| Embedding      | `@r2wc/react-to-web-component` (`src/Widget.tsx`), CSS injected by JS for shadow-free embedding |
| Deploy         | **Cloudflare Pages** (project `atlas-legacy`); SPA fallback via `public/_redirects` |

The app is also runnable standalone in dev (`index.html` → `src/main.tsx`); the
embeddable entry is `src/Widget.tsx` (demo in `demo.html`).

## Essential commands

```bash
pnpm dev          # Vite dev server (http://localhost:5173)
pnpm build        # tsc (typecheck) + vite build → dist/
pnpm preview      # serve the production build locally
pnpm typecheck    # tsc --noEmit (no build output)
pnpm lint         # eslint . (report only)
pnpm lint:fix     # eslint . --fix (auto-fix + Prettier)
```

There is **no test suite yet**. CI (`.github/workflows/ci.yml`) gates PRs on
lint + typecheck + build. If you add tests, wire them into CI and the
`pr-prep` skill.

## Code quality

- **Formatting** is Prettier (`.prettierrc`, shared across all SY projects:
  no semicolons, single quotes, trailing commas, width 100). The PostToolUse
  hooks run Prettier + `eslint --fix` on every edited file automatically.
- **Type checking**: `pnpm typecheck`. A PostToolUse hook also runs `tsc` after
  each `.ts`/`.tsx` edit and surfaces errors for the edited file.
- After changing code, the hooks handle format/lint; run `pnpm typecheck`
  yourself for cross-file type safety before opening a PR.

## File layout

```
src/
  Widget.tsx          # Web-component entry — defines <syatlas-map>, wraps <App>
  App.tsx             # Router + providers + client bootstrap (HashRouter)
  main.tsx            # Standalone dev entry
  providers.tsx       # NextUI + React Query + Helmet providers
  components/
    base/             # Generic UI (chip, dropdown, panel, language, fallbacks…)
    event/            # Event detail subcomponents
    list/             # Event list views
    mapbox/           # Map, search, layer defs (layers.ts), themes
    icons/            # SVG icon components
  config/
    api/              # axios client + zod-parsed fetchers (fetch.ts, mutate.ts, auth.ts)
    store.ts          # zustand stores (view / navigation / search state)
    i18n.ts           # i18next init
    site.ts, responsive.ts
  hooks/              # use-locale, use-mapbox, use-theme
  layouts/            # default, map
  pages/              # index(search), country, region, area, venue, event
  types/              # zod schemas + inferred types per entity
public/locales/<lng>/ # translation JSON (en, fr, … hand-maintained)
```

## Conventions (see `.claude/rules/` for detail)

- **Path aliases**: `@/*` → `src/*` (Vite + tsconfig). Prefer `@/…` over deep
  relative imports.
- **API layer**: every fetcher in `src/config/api/fetch.ts` parses the response
  through a zod schema from `src/types/`. Keep that contract — see
  `.claude/rules/data-layer.md`.
- **State**: zustand stores are the single source of truth for map view,
  navigation history, and search filters. Read with `useShallow` selectors in
  hot paths (the map). See `.claude/rules/i18n-and-state.md`.
- **Map**: layer definitions live in `src/components/mapbox/layers.ts`; never
  inline layer paint/layout in JSX. See `.claude/rules/mapbox.md`.
- **Components**: prefer NextUI built-ins + `tailwind-variants` over hand-rolled
  styled components. See `.claude/rules/components.md`.

## Environment

Vite env vars are prefixed `VITE_` and read via `import.meta.env`. Public
(non-secret) defaults live in `.env`; secrets live in `.env.local` (gitignored,
matched by `*.local`). Full list in `.claude/docs/environment.md`. Key vars:

- `VITE_API_ENDPOINT` — Atlas REST API base (default `https://atlas.sydevelopers.com/api`)
- `VITE_MAPBOX_ACCESSTOKEN` — Mapbox GL public token (`pk.…`)
- `VITE_HOST` — origin used to load `public/locales` over HTTP
- `VITE_ATLAS_API_KEY` — client API key passed to the widget in dev
- `VITE_FATHOM_ID` — Fathom analytics site id (optional)

**Never** commit real secrets. `MAPBOX_SECRET_ACCESSTOKEN` (`sk.…`) and other
non-`VITE_` secrets must never appear in client code — the bundle is public.

## Deployment

**Cloudflare Pages** (project `atlas-legacy`) builds `pnpm build` and serves
`dist/`. Build command and output dir are configured in the Cloudflare
dashboard, not in the repo (there's no `wrangler`/`_routes.json`). The only
repo-level deploy file is `public/_redirects` (`/* /index.html 200`), which
gives the standalone `BrowserRouter` build its SPA deep-link fallback — Cloudflare
Pages reads it from `dist/`. (The embeddable widget uses `HashRouter`, so it
doesn't depend on the fallback; the standalone build does.)

There is also an "accent" theme sync via
`.github/workflows/{push,sync}-accent.yml` (driven by `accent.json`) — leave
those workflows alone unless the task is about theming. Use the **cloudflare-docs**
MCP for Cloudflare Pages questions.

## Git / PR workflow

- Branch from `main`: `<type>/<short-slug>` (e.g. `feat/venue-clustering`).
- Conventional commits: `<type>(<scope>): <subject>` (see
  `.claude/skills/draft-ticket/conventions.md`).
- Use the `/implement-issue`, `/pr-prep`, `/draft-ticket`, and
  `/reflect-session` skills for structured workflows.
- Never force-push `main`, never skip hooks (`--no-verify`), never commit
  `.env.local` or any `sk.`/API secret.
