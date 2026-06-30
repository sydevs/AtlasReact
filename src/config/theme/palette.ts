// Runtime brand theming for the embedded widget.
//
// NextUI emits every semantic color as an HSL-*channel* CSS variable —
// `--nextui-primary`, `--nextui-primary-{10,50…900}`, `--nextui-primary-foreground`
// — and consumes them as `hsl(var(--nextui-primary) / <alpha>)` (see
// @nextui-org/theme's resolver, which writes the value as `"<h> <s>% <l>%"`).
// Because they're plain custom properties, we can repaint the whole widget at
// runtime by setting those vars inline on a wrapper element: inline values beat
// the `.light`/`.dark` class-defined ones and cascade to every NextUI component.
//
// A tenant supplies one seed hex per role; `buildScale` derives the full ramp
// from it, and `applyPalette` writes the vars (mode-aware) onto the root. When
// no palette is supplied nothing here runs and the static tailwind.config theme
// stands unchanged.

import { colord, extend, type Colord } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'

// `.contrast()` (used to pick a black/white foreground by WCAG ratio).
extend([a11yPlugin])

export type ThemeMode = 'light' | 'dark'

// One seed hex per themeable role; any role may be omitted (then it's left to
// the built-in default). `background` themes the page surface in light mode only.
export type PaletteRoles = {
  primary?: string | null
  secondary?: string | null
  background?: string | null
}

export type ColorScale = {
  DEFAULT: string
  foreground: string
  10: string
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

// Per-step lightness (HSL L%) for the 10…900 tints — the hand-tuned default
// ramp's near-linear ladder (≈5%/step from 50→900, with `10` a light tint).
const SCALE_LIGHTNESS: Record<keyof Omit<ColorScale, 'DEFAULT' | 'foreground'>, number> = {
  10: 96,
  50: 80,
  100: 75,
  200: 70,
  300: 65,
  400: 60,
  500: 55,
  600: 50,
  700: 45,
  800: 40,
  900: 35,
}

// NextUI's channel format: space-separated `<h> <s>% <l>%`, no `hsl()` wrapper.
const channel = (h: number, s: number, l: number) =>
  `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`

const toChannel = (c: Colord) => {
  const { h, s, l } = c.toHsl()

  return channel(h, s, l)
}

const BLACK = '0 0% 0%'
const WHITE = '0 0% 100%'

// Black or white, whichever reads better on the given color (WCAG contrast).
const foregroundFor = (c: Colord) =>
  c.contrast('#000000') >= c.contrast('#ffffff') ? BLACK : WHITE

// Generated scales respect the seed's hue AND lightness — a dark brand color
// stays dark, a light one stays light — while CAPPING saturation. The cap is the
// one normalization: a vivid/neon seed is pulled into the muted brand register
// (the built-in teal ≈ 23%, orange ≈ 62%) so its tints don't read as glaring,
// while a muted or neutral seed passes through untouched (`min(s, 60)`, so e.g. a
// gray stays gray). The 10…900 tints walk the fixed lightness ladder; the DEFAULT
// is the brand color itself (capped), lifted to a visible tone in dark mode.
const MAX_SATURATION = 60

// In dark mode the solid is lifted to at least this lightness so a dark brand
// color stays visible on the dark canvas.
const DARK_MIN_LIGHTNESS = 60

const darkTone = (seed: Colord): Colord => {
  const { h, s, l } = seed.toHsl()

  return colord({ h, s: Math.min(s, MAX_SATURATION), l: Math.max(l, DARK_MIN_LIGHTNESS) })
}

// Derive a NextUI color scale from a seed hex, respecting its hue + lightness and
// capping saturation: the 10…900 tints walk SCALE_LIGHTNESS at the (capped) seed
// saturation, the DEFAULT is the brand color itself, and `foreground` is its
// readable on-color. Mode-aware DEFAULT/foreground for dark mode are computed in
// applyPalette; this scale is the light-mode/canonical form.
export function buildScale(seedHex: string): ColorScale {
  const { h, s, l } = colord(seedHex).toHsl()
  const saturation = Math.min(s, MAX_SATURATION)

  const steps = Object.fromEntries(
    Object.entries(SCALE_LIGHTNESS).map(([shade, stepL]) => [shade, channel(h, saturation, stepL)]),
  ) as Omit<ColorScale, 'DEFAULT' | 'foreground'>

  const solid = colord({ h, s: saturation, l })

  return {
    ...steps,
    DEFAULT: toChannel(solid),
    foreground: foregroundFor(solid),
  }
}

const setRole = (root: HTMLElement, token: string, seedHex: string, mode: ThemeMode) => {
  const seed = colord(seedHex)

  if (!seed.isValid()) return

  const scale = buildScale(seedHex)

  for (const [shade, value] of Object.entries(scale)) {
    if (shade === 'DEFAULT' || shade === 'foreground') continue
    root.style.setProperty(`--nextui-${token}-${shade}`, value)
  }

  // DEFAULT + foreground are the most visible (bg-primary / text-primary). Dark
  // mode lifts the solid to a lighter tone so it stays visible on the dark canvas.
  const tone = mode === 'dark' ? darkTone(seed) : null
  const base = tone ? toChannel(tone) : scale.DEFAULT
  const foreground = tone ? foregroundFor(tone) : scale.foreground

  root.style.setProperty(`--nextui-${token}`, base)
  root.style.setProperty(`--nextui-${token}-foreground`, foreground)

  return base
}

// Every inline var applyPalette can write, cleared before each apply so a role
// dropped between applies — or an invalid value — falls back to the static theme
// instead of leaving a stale override. (We can't blanket-clear the root's inline
// style: the widget wrapper carries `display: contents` there.)
const MANAGED_VARS = [
  ...['primary', 'secondary'].flatMap((token) => [
    `--nextui-${token}`,
    `--nextui-${token}-foreground`,
    ...Object.keys(SCALE_LIGHTNESS).map((shade) => `--nextui-${token}-${shade}`),
  ]),
  '--nextui-focus',
  '--nextui-background',
]

// Repaint a root element in the supplied palette by writing NextUI's CSS vars
// inline. Resets to the static theme first, then layers on only the supplied
// roles, so omitted roles fall back to the built-in default. `mode` drives the
// DEFAULT/foreground tone and gates the background override.
export function applyPalette(root: HTMLElement, palette: PaletteRoles, mode: ThemeMode) {
  for (const name of MANAGED_VARS) root.style.removeProperty(name)

  if (palette.primary) {
    const primaryDefault = setRole(root, 'primary', palette.primary, mode)

    // The focus ring follows the primary brand color.
    if (primaryDefault) root.style.setProperty('--nextui-focus', primaryDefault)
  }

  if (palette.secondary) setRole(root, 'secondary', palette.secondary, mode)

  // The background override applies to light mode only; dark keeps its (already
  // cleared) dark neutral, and an invalid value fails closed to the default.
  const background = palette.background ? colord(palette.background) : null

  if (background?.isValid() && mode === 'light') {
    root.style.setProperty('--nextui-background', toChannel(background))
  }
}
