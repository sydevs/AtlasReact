---
description: React component patterns — NextUI, tailwind-variants, widget context.
globs:
  - "src/components/**/*.tsx"
  - "src/layouts/**/*.tsx"
  - "src/pages/**/*.tsx"
  - "src/providers.tsx"
alwaysApply: false
---

# Components (NextUI + Tailwind)

## Prefer built-ins

Before hand-rolling UI, check **NextUI v2** (`@nextui-org/react`) for an existing
component (Button, Card, Chip, Dropdown, Modal, Listbox, Spinner, Skeleton…).
Fewer custom components means less maintenance and a consistent look. Reach for
a custom component only when no NextUI primitive fits, and keep it under
`src/components/base/`.

## Styling

- Tailwind 3 utility classes are the default. For components with variants
  (size/color/state), use **`tailwind-variants`** (`tv(...)`) rather than
  ad-hoc `clsx` string concatenation — it's already a dependency and matches the
  NextUI styling model.
- `clsx` is fine for simple conditional class joins.
- Global styles and Tailwind layers live in `src/styles/globals.css`. The
  widget injects its CSS via JS (`vite-plugin-css-injected-by-js`) so it works
  when embedded — don't rely on a separate stylesheet `<link>`.

## Widget / embedding constraints

This app ships as the `<syatlas-map>` custom element (`src/Widget.tsx`) embedded
in host pages, **and** runs standalone in dev. Because of that:

- Routing uses **HashRouter** with basename `!` (the widget owns `window.location.hash`).
  Build links with `react-router` `<Link>` / `useNavigate`, never hardcode `#!`.
- Don't assume control of `<head>`, global CSS, or the full viewport — the host
  page owns those. Scope styles to the widget's own DOM.
- Provider stack lives in `src/providers.tsx` (NextUI + React Query + Helmet).
  Add new context providers there, not scattered across the tree.

## Structure

- Group multi-file features in a folder (`event/`, `list/`, `mapbox/`).
- Keep components presentational where possible; pull data via hooks
  (`src/hooks/`) and React Query (`src/config/api`), and read shared state from
  zustand selectors. See `.claude/rules/data-layer.md` and
  `.claude/rules/i18n-and-state.md`.

## Accessibility

`jsx-a11y` is enabled. Pair `onClick` on non-button elements with keyboard
handlers (or use a real `<button>` / NextUI `Button`), and provide `alt`/ARIA
labels. The lint warns; don't ignore it on interactive elements.
