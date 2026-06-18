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

Each component lives in its own **PascalCase folder** (mirroring WeMeditateWeb):

```
src/components/
  atoms/        # primitives: render from props; no data fetching or navigation
  molecules/    # small compositions of atoms; data passed in via props
  organisms/    # data-connected / stateful sections (React Query, the map, forms)
  atoms/Chip/                 # one folder per component
    Chip.tsx                  #   the component (PascalCase, matches the folder)
    Chip.stories.tsx          #   co-located Ladle stories
    index.ts                  #   component barrel: `export * from './Chip'`
  <tier>/index.ts             # tier barrel — the public import surface
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

| Folder                | Exports                              | Notes                                         |
| --------------------- | ------------------------------------ | --------------------------------------------- |
| `Icons/` (sub-module) | `*Icon`, `Logo`, `SocialIcon`, …     | SVG primitives; grouped module with its own `index.tsx` |
| `Chip/`               | `Chip`, `TimezoneChip`               | Wraps NextUI `Chip` with app defaults (`tv()`) |
| `SelectionDropdown/`  | `SelectionDropdown`                  | Single-select wrapper over NextUI `Dropdown`  |
| `LanguageSelector/`   | `LanguageSelector`                   | Locale switcher (`useLocale`)                 |
| `Panel/`              | `Panel`                              | Suspense + ErrorBoundary layout shell         |
| `LightboxImage/`      | `LightboxImage`                      | Thumbnail → modal lightbox                    |
| `Fallbacks/`          | `LoadingFallback`, `ErrorFallback`   | Suspense / error-boundary fallbacks           |
| `ThemeSwitch/`        | `ThemeSwitch`                        | Light/dark toggle (`useTheme`)                |

**Molecules** (`src/components/molecules/`)

| Folder              | Exports                                        | Notes                                  |
| ------------------- | ---------------------------------------------- | -------------------------------------- |
| `Navbar/`           | `Navbar`                                        | Logo + theme switch + language         |
| `SearchBar/`        | `SearchBar`                                     | Search input; reads `useSearchState`   |
| `List/`             | `List`                                          | Scrollable `<ul>` container            |
| `ListItem/`         | `ListItem`                                      | Generic labelled list row              |
| `ListHeader/`       | `ListHeader`                                    | Back-button + title row                |
| `EventItem/`        | `EventItem`                                     | Per-event summary card in a list       |
| `EventTime/`        | `EventTime`                                     | Formatted event time range             |
| `EventShare/`       | `ShareButton`, `ShareModal`, `ShareContent`     | Share-event modal                      |
| `EventImages/`      | `EventImages`                                   | Swiper image carousel                  |
| `EventSoon/`        | `EventSoonChip`, `isSoon`                       | "Starting soon" chip + predicate       |
| `EventMetadata/`    | `EventMetadata`                                 | Schema.org / OG `<head>` tags (Helmet) |

**Organisms** (`src/components/organisms/`)

| Folder                   | Exports                                                       | Notes                              |
| ------------------------ | ------------------------------------------------------------- | ---------------------------------- |
| `Mapbox/` (sub-module)   | `Mapbox`, `MapSearch` (+ `layers.ts`, `themes.ts` helpers)    | The Mapbox surface; see [`.claude/rules/mapbox.md`](.claude/rules/mapbox.md) |
| `EventsList/`            | `EventsList`, `DynamicEventsList`                              | List + distance-sorted fetch       |
| `EventPanel/`            | `EventPanel`                                                   | Full event detail panel            |
| `EventDetails/`          | `EventContactDetails`, `EventTimingDetails`, `EventLocationDetails`, `EventDetail` | Detail cards     |
| `EventRegistration/`     | `RegistrationButton`, `RegistrationModal`, `RegistrationFields` | Registration form (RHF + mutation) |

**Templates** — `src/layouts/{default,map}.tsx` (`DefaultLayout`, `MapLayout`).
Layouts stay in `src/layouts/` (route-level scaffolds owned by `App.tsx`); they
are the template tier and are not re-exported through the component barrels.

## Conventions

### Exports — named, one barrel per tier

- **Use named exports** for every component (no `export default`). This keeps the
  barrels clean and import names greppable.
- **Two barrel layers.** Each component folder has an `index.ts`
  (`export * from './Chip'`); each tier has an `index.ts` re-exporting its
  component folders. The `Icons/` and `Mapbox/` sub-modules group several files
  behind their own `index`.
- **App code (pages, layouts, stories) imports from the tier barrel**:
  `import { Chip } from '@/components/atoms'`. The barrel is the public surface;
  layout can change behind it.
- **Inside `src/components`, components import each other by the _component folder_
  path** (`@/components/atoms/Chip`, `@/components/molecules/EventTime`), not
  through a tier barrel. Going through the tier barrel here risks import cycles (a
  molecule that embeds an organism vs. an organism that embeds a molecule) and TDZ
  bugs; the per-component folder index is cycle-safe.
- Keep barrels free of logic — re-exports only (the one tolerated exception is the
  tiny `List` wrapper, co-located in `List/List.tsx`).
- **Code-split exception:** a heavy organism that is lazy-loaded (the event detail
  page lazy-imports `EventPanel`) is intentionally left _out_ of its tier barrel,
  so a barrel import doesn't pull it back into the static graph. Such components —
  and any reached only through them (`EventDetails`, `EventRegistration`) — are
  imported by direct folder path. See `organisms/index.ts`.
- Component folders and files are **PascalCase** (`Chip/Chip.tsx`); non-component
  files stay kebab-case (hooks `use-x.ts` exporting `useX`, config, types, pages,
  layouts); zustand stores `useXState` (see [`.claude/rules/code-style.md`](.claude/rules/code-style.md)).

### Props typing

- Every component that takes props declares a named props type and destructures
  it in the signature. Prefer `<Component>Props`; fall back to a local `Props`
  when that name would clash with an imported type — e.g. `Chip` composes NextUI's
  `ChipProps`, so its own props type is `Props` to avoid the collision.
- Use an **`interface`** for a plain object shape; use a **`type`** when composing
  with `&` (extending a NextUI component's props, as `Chip` does). Don't inline
  non-trivial prop shapes.
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
2. Create the folder `src/components/<tier>/<Name>/` with:
   - `<Name>.tsx` — **named** export(s) and a `<Name>Props` type;
   - `index.ts` — `export * from './<Name>'`;
   - `<Name>.stories.tsx` — co-located stories (light + dark; key variants).
3. Re-export the folder from `src/components/<tier>/index.ts`.
4. Use `tv()` if it has variants; reuse existing icons from `atoms/Icons/`.
5. Reference siblings by component-folder path (`@/components/<tier>/<Other>`).
6. `pnpm typecheck` and `pnpm ladle:build` must stay green.
