import { describe, it, expect } from 'vitest'
import { colord } from 'colord'

import { buildScale, applyPalette, type ColorScale } from './palette'

// The hand-tuned default ramp from tailwind.config.js — buildScale should
// reproduce it from its seed (#82b1ae) within rounding/drift tolerance.
const TEAL = {
  DEFAULT: '#82b1ae',
  10: '#f4f8f7',
  50: '#c1d8d7',
  100: '#b1cfcc',
  200: '#a2c5c2',
  300: '#92bbb8',
  400: '#82b1ae',
  500: '#73a7a4',
  600: '#639e99',
  700: '#598f8a',
  800: '#4f7f7b',
  900: '#456f6c',
}

const SHADES = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

const parse = (s: string) => {
  const [h, sPct, lPct] = s.split(' ')

  return { h: Number(h), s: Number(sPct.replace('%', '')), l: Number(lPct.replace('%', '')) }
}

const lightnessOf = (scale: ColorScale, shade: (typeof SHADES)[number]) => parse(scale[shade]).l

describe('buildScale', () => {
  it('produces a monotonically darkening lightness ramp (10 → 900)', () => {
    const scale = buildScale('#82b1ae')
    const lightnesses = SHADES.map((shade) => lightnessOf(scale, shade))

    for (let i = 1; i < lightnesses.length; i++) {
      expect(lightnesses[i]).toBeLessThan(lightnesses[i - 1])
    }
  })

  it('approximates the hand-tuned TEAL ramp from its seed', () => {
    const scale = buildScale('#82b1ae')

    for (const shade of SHADES) {
      const generated = parse(scale[shade])
      const original = colord(TEAL[shade]).toHsl()

      // Lightness is lifted directly from the teal ramp → near-exact.
      expect(Math.abs(generated.l - original.l)).toBeLessThanOrEqual(1)
      // Hue is preserved from the seed; the near-white `10` step loses hue
      // precision, so only assert it where the color actually carries hue.
      if (original.l < 90) expect(Math.abs(generated.h - original.h)).toBeLessThanOrEqual(6)
    }
  })

  it('uses the seed verbatim as the DEFAULT', () => {
    const scale = buildScale('#82b1ae')
    const seed = colord('#82b1ae').toHsl()
    const def = parse(scale.DEFAULT)

    expect(def).toEqual({ h: seed.h, s: seed.s, l: seed.l })
  })
})

describe('foreground contrast', () => {
  it('picks black on a light seed and white on a dark seed', () => {
    expect(buildScale('#ffffff').foreground).toBe('0 0% 0%')
    expect(buildScale('#82b1ae').foreground).toBe('0 0% 0%') // teal → black (matches today)
    expect(buildScale('#000000').foreground).toBe('0 0% 100%')
    expect(buildScale('#64032e').foreground).toBe('0 0% 100%') // dark maroon → white
  })

  it('flips black → white as the seed darkens past the contrast boundary', () => {
    // A mid-grey ramp crosses the boundary; the light half reads black, the
    // dark half reads white.
    expect(buildScale('#999999').foreground).toBe('0 0% 0%')
    expect(buildScale('#555555').foreground).toBe('0 0% 100%')
  })
})

// A DOM-light stand-in for the root element so the var writes can be asserted
// in the node-only lane (no jsdom — see .claude/rules/tests.md).
function fakeRoot() {
  const props = new Map<string, string>()
  const root = {
    style: {
      setProperty: (k: string, v: string) => void props.set(k, v),
      removeProperty: (k: string) => void props.delete(k),
    },
  } as unknown as HTMLElement

  return { root, props }
}

describe('applyPalette', () => {
  it('writes the primary scale, DEFAULT, foreground and focus vars', () => {
    const { root, props } = fakeRoot()

    applyPalette(root, { primary: '#64032e' }, 'light')

    expect(props.get('--nextui-primary')).toBe('333 94% 20%')
    expect(props.get('--nextui-primary-foreground')).toBe('0 0% 100%')
    expect(props.get('--nextui-primary-100')).toBeDefined()
    expect(props.get('--nextui-primary-900')).toBeDefined()
    // Focus follows primary.
    expect(props.get('--nextui-focus')).toBe('333 94% 20%')
  })

  it('lightens + desaturates the DEFAULT in dark mode (no vanishing primary)', () => {
    const { root, props } = fakeRoot()

    applyPalette(root, { primary: '#64032e' }, 'dark')

    const def = parse(props.get('--nextui-primary')!)

    expect(def.h).toBe(333) // hue preserved
    expect(def.l).toBeGreaterThanOrEqual(60) // raised tone
    expect(def.s).toBeLessThan(94) // slightly desaturated
  })

  it('leaves omitted roles untouched', () => {
    const { root, props } = fakeRoot()

    applyPalette(root, { primary: '#64032e' }, 'light')

    expect([...props.keys()].some((k) => k.startsWith('--nextui-secondary'))).toBe(false)
    expect(props.has('--nextui-background')).toBe(false)
  })

  it('applies the background override in light mode only', () => {
    const light = fakeRoot()

    applyPalette(light.root, { background: '#f0ece2' }, 'light')
    expect(light.props.get('--nextui-background')).toBe('43 32% 91%')

    const dark = fakeRoot()

    applyPalette(dark.root, { background: '#f0ece2' }, 'dark')
    expect(dark.props.has('--nextui-background')).toBe(false)
  })

  it('ignores invalid seed hexes', () => {
    const { root, props } = fakeRoot()

    applyPalette(root, { primary: 'not-a-color' }, 'light')

    expect(props.size).toBe(0)
  })

  it('clears a role that is dropped on a later apply (reverts to the default)', () => {
    const { root, props } = fakeRoot()

    applyPalette(root, { primary: '#64032e', secondary: '#7a404e', background: '#f0ece2' }, 'light')
    expect(props.has('--nextui-secondary')).toBe(true)
    expect(props.has('--nextui-background')).toBe(true)

    // Re-apply with only primary → secondary + background revert to the default.
    applyPalette(root, { primary: '#64032e' }, 'light')
    expect(props.has('--nextui-secondary')).toBe(false)
    expect(props.has('--nextui-secondary-100')).toBe(false)
    expect(props.has('--nextui-background')).toBe(false)
    expect(props.get('--nextui-primary')).toBe('333 94% 20%')
  })
})
