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

// Per-step lightness (HSL L%) lifted from the hand-tuned TEAL_COLOR ramp in
// tailwind.config.js. We keep the seed's hue + saturation and only walk this
// lightness ladder, so a generated scale carries the same visual weight at each
// step as today's default (a near-linear 5%/step ramp, with `10` a light tint).
// Verified by palette.test.ts against the original teal hexes.
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

// Dark-mode tone shift (Material 3 tonal guidance: preserve hue, raise tone,
// desaturate slightly) so a dark brand color stays visible on the dark canvas
// instead of vanishing into it. Lightness is clamped into a mid-high band (any
// seed lands somewhere visible); saturation is eased back slightly.
const darkTone = (c: Colord): Colord => {
  const { h, s, l } = c.toHsl()

  return colord({ h, s: s * 0.9, l: Math.min(Math.max(l, 60), 82) })
}

// Derive a NextUI color scale from a seed hex: the seed *is* the DEFAULT (so a
// tenant's chosen brand color is used as-is in light mode), the 10…900 steps
// follow SCALE_LIGHTNESS at the seed's hue/saturation, and `foreground` is the
// readable on-color for the DEFAULT. Mode-aware DEFAULT/foreground for dark mode
// are computed in applyPalette; this scale is the light-mode/canonical form.
export function buildScale(seedHex: string): ColorScale {
  const seed = colord(seedHex)
  const { h, s } = seed.toHsl()

  const steps = Object.fromEntries(
    Object.entries(SCALE_LIGHTNESS).map(([shade, l]) => [shade, channel(h, s, l)]),
  ) as Omit<ColorScale, 'DEFAULT' | 'foreground'>

  return {
    ...steps,
    DEFAULT: toChannel(seed),
    foreground: foregroundFor(seed),
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

  // DEFAULT + foreground are the most visible (bg-primary / text-primary). Light
  // mode uses the scale's seed-based values as-is; dark lightens the tone so a
  // dark brand color stays visible on the dark canvas.
  const tone = mode === 'dark' ? darkTone(seed) : null
  const base = tone ? toChannel(tone) : scale.DEFAULT
  const foreground = tone ? foregroundFor(tone) : scale.foreground

  root.style.setProperty(`--nextui-${token}`, base)
  root.style.setProperty(`--nextui-${token}-foreground`, foreground)

  return base
}

// Repaint a root element in the supplied palette by writing NextUI's CSS vars
// inline. Omitted roles are left untouched (built-in default stands). `mode`
// drives the DEFAULT/foreground tone and gates the background override.
export function applyPalette(root: HTMLElement, palette: PaletteRoles, mode: ThemeMode) {
  if (palette.primary) {
    const primaryDefault = setRole(root, 'primary', palette.primary, mode)

    // The focus ring follows the primary brand color.
    if (primaryDefault) root.style.setProperty('--nextui-focus', primaryDefault)
  }

  if (palette.secondary) setRole(root, 'secondary', palette.secondary, mode)

  // The background override applies to light mode only; dark keeps its dark
  // neutral, so we clear any previously-set value when flipping to dark.
  const background = palette.background ? colord(palette.background) : null

  if (background?.isValid()) {
    if (mode === 'light') {
      root.style.setProperty('--nextui-background', toChannel(background))
    } else {
      root.style.removeProperty('--nextui-background')
    }
  }
}
