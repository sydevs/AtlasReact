import { describe, it, expect } from 'vitest'
import { colord } from 'colord'

import { buildScale, applyPalette, type ColorScale } from './palette'

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

  it('uses only the input hue — fixed saturation, ignoring input saturation/lightness', () => {
    // #468503 is a vivid (≈96% sat), dark (≈27% L) green; the scale keeps only
    // its hue and pins saturation + lightness to the fixed ladders.
    const scale = buildScale('#468503')
    const def = parse(scale.DEFAULT)

    expect(def.h).toBe(89) // hue preserved
    expect(def.s).toBe(60) // fixed saturation, not the seed's 96
    expect(def.l).toBe(60) // fixed solid lightness, not the seed's 27

    for (const shade of SHADES) expect(parse(scale[shade]).s).toBe(60)
  })

  it('produces the identical scale for two seeds that share a hue', () => {
    // Bright red and dark maroon are the same hue (0°) at very different
    // saturation/lightness → identical generated scale.
    expect(buildScale('#ff0000')).toEqual(buildScale('#800000'))
  })
})

describe('foreground contrast', () => {
  it('picks a readable on-color for the fixed-lightness solid, by hue', () => {
    // The solid sits at a fixed lightness, so the on-color depends on the hue:
    // a luminous hue reads black, a low-luminance hue reads white.
    expect(buildScale('#468503').foreground).toBe('0 0% 0%') // green → black
    expect(buildScale(colord({ h: 240, s: 60, l: 40 }).toHex()).foreground).toBe('0 0% 100%') // blue → white
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

    expect(props.get('--nextui-primary')).toBe('333 60% 60%')
    expect(props.get('--nextui-primary-foreground')).toBe('0 0% 0%')
    expect(props.get('--nextui-primary-100')).toBeDefined()
    expect(props.get('--nextui-primary-900')).toBeDefined()
    // Focus follows primary.
    expect(props.get('--nextui-focus')).toBe('333 60% 60%')
  })

  it('uses a lighter solid tone in dark mode (no vanishing primary)', () => {
    const { root, props } = fakeRoot()

    applyPalette(root, { primary: '#64032e' }, 'dark')

    const def = parse(props.get('--nextui-primary')!)

    expect(def.h).toBe(333) // hue preserved
    expect(def.s).toBe(60) // fixed saturation
    expect(def.l).toBe(70) // lighter than the light-mode 60
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
    expect(props.get('--nextui-primary')).toBe('333 60% 60%')
  })
})
