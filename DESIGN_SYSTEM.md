# Sahaj Atlas — Design System

This document defines how components in the Sahaj Atlas widget are **classified,
organised, exported, typed, and styled**. It is the contract that
[`.claude/rules/components.md`](.claude/rules/components.md) points at and that
every new component should follow.

Companion doc: [`STORYBOOK.md`](STORYBOOK.md) — how we preview these components in
[Ladle](https://ladle.dev/) and the planned story-helper conventions.

> **Scope guardrail.** NextUI v2 (`@nextui-org/react`) stays our primitive layer.
> This system adds *structure and previews* around the existing components — it is
> not a rebuild of NextUI-backed components and not a visual redesign.

## Atomic taxonomy

We follow [atomic design](https://bradfrost.com/blog/post/atomic-web-design/),
adapted to our NextUI + Mapbox stack. Components live under `src/components/`,
grouped by **tier** rather than by domain:

```
src/components/
  atoms/        # primitives: render from props; no data fetching or navigation
  molecules/    # small compositions of atoms; data passed in via props
  organisms/    # data-connected / stateful sections (React Query, the map, forms)
  <tier>/index.ts   # one barrel per tier — the public import surface
src/layouts/    # templates: page-level layout scaffolds (see below)
```

### What goes where

| Tier          | Definition                                                                                                   | May use                                                        | Must **not** do                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------------------- |
| **Atom**      | Smallest building block. Renders from its props alone.                                                        | NextUI primitives, Tailwind, icons, `useTheme`/`useLocale`/i18n labels | Fetch data, read app stores, navigate                    |
| **Molecule**  | A small, reusable composition of atoms forming one UI unit.                                                   | Everything an atom may, plus light store reads / a `useNavigate` link | Own a data-fetch lifecycle, drive the map                |
| **Organism**  | A complex, often data-connected section of the UI.                                                            | React Query, zustand stores, the Mapbox instance, `react-hook-form` | —                                                        |
| **Template**  | Page-level layout scaffold that arranges organisms/molecules and owns no business logic. Lives in `src/layouts/`. | Composition + responsive layout                               | Fetch data, own entity state                             |

Atomic design is a guide, not a straitjacket: a molecule reading a single store
slice or rendering a router `<Link>` is fine. The dividing line that matters most
here is **organisms own data/network/map lifecycles; atoms and molecules don't.**

### Current classification

**Atoms** (`src/components/atoms/`)

| File                  | Exports                              | Notes                                         |
| --------------------- | ------------------------------------ | --------------------------------------------- |
| `icons/` (sub-module) | `*Icon`, `Logo`, `SocialIcon`, …     | SVG primitives; keeps its own `index.tsx` barrel |
| `chip.tsx`            | `Chip`, `TimezoneChip`               | Wraps NextUI `Chip` with app defaults (`tv()`) |
| `dropdown.tsx`        | `Dropdown`                           | Single-select wrapper over NextUI `Dropdown`  |
| `language.tsx`        | `LanguageSelect`                     | Locale switcher (`useLocale`)                 |
| `panel.tsx`           | `Panel`                              | Suspense + ErrorBoundary layout shell         |
| `lightbox-image.tsx`  | `LightboxImage`                      | Thumbnail → modal lightbox                    |
| `fallbacks.tsx`       | `LoadingFallback`, `ErrorFallback`   | Suspense / error-boundary fallbacks           |
| `theme-switch.tsx`    | `ThemeSwitch`                        | Light/dark toggle (`useTheme`)                |

**Molecules** (`src/components/molecules/`)

| File                  | Exports                                        | Notes                                  |
| --------------------- | ---------------------------------------------- | -------------------------------------- |
| `navbar.tsx`          | `Navbar`                                        | Logo + theme switch + language         |
| `search-bar.tsx`      | `SearchBar`                                     | Search input; reads `useSearchState`   |
| `list.tsx`            | `List`                                          | Scrollable `<ul>` container            |
| `list-item.tsx`       | `ListItem`                                      | Generic labelled list row              |
| `list-header.tsx`     | `ListHeader`                                    | Back-button + title row                |
| `event-item.tsx`      | `EventItem`                                     | Per-event summary card in a list       |
| `event-time.tsx`      | `EventTime`                                     | Formatted event time range             |
| `event-share.tsx`     | `ShareButton`, `ShareModal`, `ShareContent`     | Share-event modal                      |
| `event-images.tsx`    | `EventImages`                                   | Swiper image carousel                  |
| `event-soon.tsx`      | `EventSoonChip`, `isSoon`                       | "Starting soon" chip + predicate       |
| `event-metadata.tsx`  | `EventMetadata`                                 | Schema.org / OG `<head>` tags (Helmet) |

**Organisms** (`src/components/organisms/`)

| File                     | Exports                                                       | Notes                              |
| ------------------------ | ------------------------------------------------------------- | ---------------------------------- |
| `mapbox/` (sub-module)   | `Map`, `MapSearch`, `layers.ts`, `themes.ts`                  | The Mapbox surface; see [`.claude/rules/mapbox.md`](.claude/rules/mapbox.md) |
| `events-list.tsx`        | `EventsList`, `DynamicEventsList`                              | List + distance-sorted fetch       |
| `event-panel.tsx`        | `EventPanel`                                                   | Full event detail panel            |
| `event-details.tsx`      | `EventContactDetails`, `EventTimingDetails`, `EventLocationDetails`, `EventDetail` | Detail cards     |
| `event-registration.tsx` | `RegistrationButton`, `RegistrationModal`, `RegistrationFields` | Registration form (RHF + mutation) |

**Templates** — `src/layouts/{default,map}.tsx` (`DefaultLayout`, `MapLayout`).
Layouts stay in `src/layouts/` (route-level scaffolds owned by `App.tsx`); they
are the template tier and are not re-exported through the component barrels.

## Conventions

### Exports — named, one barrel per tier

- **Use named exports** for every component (no `export default`). This makes the
  per-tier barrels (`atoms/index.ts`, …) clean and keeps import names greppable.
  The `icons/` sub-module already worked this way; we extend it everywhere.
- **Import from the tier barrel**, not the file:
  `import { Chip } from '@/components/atoms'` — never
  `@/components/atoms/chip`. The barrel is the public surface; file layout can
  change behind it.
- Each tier's `index.ts` re-exports its components (and the `icons/` / `mapbox/`
  sub-barrels). Keep barrels free of logic — re-exports only (the one tolerated
  exception is the tiny `List` wrapper, co-located in `list.tsx`).
- Filenames stay **kebab-case**; components are `PascalCase`; hooks `useX`;
  zustand stores `useXState` (see [`.claude/rules/code-style.md`](.claude/rules/code-style.md)).

### Props typing

- Every component that takes props declares a named props type called
  `<Component>Props` and destructures it in the signature.
- Use an **`interface`** for a plain object shape; use a **`type`** when composing
  with `&` (e.g. extending a NextUI component's props, as `Chip` extends
  `ChipProps`). Don't inline non-trivial prop shapes.
- `strict` is on — prefer precise types over `any` (see code-style rules).

### Styling & `tailwind-variants`

- Tailwind utility classes are the default; `clsx` for simple conditional joins.
- For any component with **size / color / state variants**, define them with
  **`tailwind-variants` (`tv()`)** instead of ad-hoc string concatenation — it is
  already a dependency and matches the NextUI styling model. `chip.tsx` is the
  reference implementation (variant-driven content/colour styling).
- Global styles live in `src/styles/globals.css`. The widget injects CSS via JS
  when embedded, so don't rely on a separate stylesheet `<link>`.

### When to wrap a NextUI primitive

Wrap a NextUI component in our own atom **only** when we need to:

1. **Bake in app defaults** used in many places (e.g. `Chip` fixes `radius`,
   `size`, `variant`, and uppercased bold content), or
2. **Add app-specific behaviour** a raw primitive can't express (e.g.
   `TimezoneChip`'s tooltip, `Panel`'s Suspense + error boundary).

Otherwise, **use the NextUI primitive directly.** Don't create a pass-through
wrapper that only renames props — it's maintenance with no payoff.

## Previews (Ladle)

Every **atom, molecule, and non-map organism** has a co-located
`*.stories.tsx` covering its key variants in **both light and dark** themes. Map
organisms get lighter, token-gated coverage. Run `pnpm ladle` to browse them. See
[`STORYBOOK.md`](STORYBOOK.md) for story conventions and the global decorator.

## Adding a component — checklist

1. Pick the tier (atom / molecule / organism) using the table above.
2. Create `src/components/<tier>/<kebab-name>.tsx` with a **named** export and a
   `<Name>Props` type.
3. Re-export it from `src/components/<tier>/index.ts`.
4. Use `tv()` if it has variants; reuse existing icons from `atoms/icons/`.
5. Add `<kebab-name>.stories.tsx` next to it (light + dark; key variants).
6. `pnpm typecheck` and `pnpm ladle:build` must stay green.
