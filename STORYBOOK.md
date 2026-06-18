# Storybook (Ladle) — Conventions & Helper Migration Plan

We preview components in isolation with [Ladle](https://ladle.dev/) (a fast,
Vite-native Storybook alternative). This doc covers **how we write stories today**
and the **planned migration** to the WeMeditateWeb story-helper style.

Companion doc: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — the component taxonomy and
authoring conventions.

## Running it

```bash
pnpm ladle        # dev server at http://localhost:61000
pnpm ladle:build  # static build (also the CI gate — broken stories fail it)
```

## How it's wired

| Piece                    | What it does |
| ------------------------ | ------------ |
| `.ladle/config.mjs`      | Story glob (`src/**/*.stories.{ts,tsx}`), title, dedicated port, and `viteConfig` pointing at our own Vite config. |
| `.ladle/vite.config.ts`  | Resolves the `@/` alias to `src/` (Ladle relocates Vite's root, so vite-tsconfig-paths can't find our tsconfig). |
| `.ladle/i18n.ts`         | A self-contained i18next instance with the en/fr namespaces bundled as static resources (the app loads them over HTTP; Ladle has no backend). |
| `.ladle/components.tsx`  | The **global decorator** (`export const Provider`): mirrors `src/providers.tsx` (NextUI + React Query + Helmet) and adds a `MemoryRouter` and `<I18nextProvider>`. It maps Ladle's theme addon onto the `dark`/`light` class so every story renders in both themes; imports `globals.css`. |

Because the decorator already supplies every provider, **stories never wrap
themselves in providers** — they just render the component.

## Writing a story (current convention)

Co-locate `<component>.stories.tsx` next to the component. Follow the established
shape (see `src/components/atoms/chip.stories.tsx` for the reference):

```tsx
import type { Story, StoryDefault } from '@ladle/react'

import { Chip } from '@/components/atoms'

// Sidebar grouping: '<Tier> / <Title Case Name>'
export default { title: 'Atoms / Chip' } satisfies StoryDefault

// Each named export is a story.
export const Default = () => <Chip>online</Chip>

export const Colors = () => (
  <div className="flex gap-2">
    <Chip color="primary">primary</Chip>
    <Chip color="secondary">secondary</Chip>
  </div>
)

// Native Ladle controls via typed args:
export const Playground: Story<{ label: string; emphasis: 'solid' | 'subtle' }> = ({
  label,
  emphasis,
}) => <Chip emphasis={emphasis}>{label}</Chip>
Playground.args = { label: 'online', emphasis: 'solid' }
Playground.argTypes = {
  emphasis: { options: ['solid', 'subtle'], control: { type: 'inline-radio' } },
}
```

Rules:

- **Import the subject from its tier barrel** (`@/components/atoms|molecules|organisms`).
  The barrel-excluded, lazy-loaded organisms (`event-panel`, `event-details`,
  `event-registration`) are imported by direct path — see `DESIGN_SYSTEM.md`.
- **Light + dark** is covered by the toolbar theme toggle (the decorator maps it
  onto the `dark` class); don't duplicate stories per theme.
- **Mock data** comes from `src/mocks/` (e.g. `mockEvent`, `mockEventSlim`,
  `mockEventImages`), typed against the zod-inferred entity types. Don't invent
  ad-hoc shapes.
- **Use native controls** (`.args` / `.argTypes`) for text/enum/boolean inputs
  (`control.type`: `text` | `boolean` | `number` | `inline-radio` | `select`).
- **Map / network**: components needing `VITE_MAPBOX_ACCESSTOKEN` or a live API
  are gated (render a "needs token" notice when absent) and wrapped in
  `MapProvider`. Keep their coverage light.
- TypeScript is strict — no unused imports; type `Story<P>` when a story takes args.

## Migration plan → WeMeditateWeb story helpers (deferred)

Today's stories use **plain Ladle controls**. WeMeditateWeb (our sister project)
instead uses a small set of **documentation helpers** that render variant matrices
and "in context" examples rather than interactive knobs. Adopting them here is a
**follow-up**, gated on review of the current plain-control stories. This section
is the plan; nothing below is implemented yet.

### Target helper API

Port three helpers into a new `src/components/ladle/` folder (named exports,
barrel `index.ts`, kebab-case files, per `DESIGN_SYSTEM.md`):

- **`StoryWrapper`** — top-level frame for a story file: sets a max width, padding,
  and an optional title/description; the place to render both theme variants
  side-by-side if we want explicit light/dark comparison rather than the toolbar
  toggle.
- **`StorySection`** — a labelled section within a story (e.g. "Sizes", "States"),
  with a heading and a description slot.
- **`StoryGrid`** — a responsive grid that lays out a matrix of a component's
  variants (e.g. every `color` × every `size`) with per-cell captions.

Sketch of the intended usage:

```tsx
export const Overview = () => (
  <StoryWrapper title="Chip" description="Compact status/label pill.">
    <StorySection title="Variants">
      <StoryGrid>
        <Chip color="primary">primary</Chip>
        <Chip color="secondary">secondary</Chip>
      </StoryGrid>
    </StorySection>
    <StorySection title="Emphasis">
      <StoryGrid>
        <Chip emphasis="solid">solid</Chip>
        <Chip emphasis="subtle">subtle</Chip>
      </StoryGrid>
    </StorySection>
  </StoryWrapper>
)
```

### Standard section ordering

When converting, each component's overview story should present sections in this
order (mirroring WeMeditateWeb): **Variants → Sizes → States → Examples** ("in
context"). Omit sections that don't apply.

### Conversion approach

1. Land the helpers in `src/components/ladle/` with their own stories.
2. Convert one reference component per tier (e.g. `chip`, `event-item`,
   `events-list`) to the helper style as worked examples.
3. Migrate the rest incrementally; keep `Playground` arg-control stories where
   interactive knobs add value (helpers and controls can coexist in one file).
4. Update this doc's "current convention" section once the helper style is the
   default.

### Open questions for the migration

- Do we want explicit side-by-side light/dark in `StoryWrapper`, or keep relying
  on the toolbar toggle? (Side-by-side is better for design QA; the toggle is
  less code.)
- Should `StoryGrid` auto-generate the variant matrix from a component's
  `tailwind-variants` config, or stay manual? Start manual.
