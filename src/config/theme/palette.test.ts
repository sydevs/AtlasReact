import { describe, it, expect } from 'vitest'

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

  it('respects the seed hue + lightness and caps saturation', () => {
    // Dark maroon stays dark; its ≈94% saturation is capped to the muted register.
    const maroon = parse(buildScale('#64032e').DEFAULT)

    expect(maroon.h).toBe(333)
    expect(maroon.l).toBe(20) // the seed's own lightness, preserved
    expect(maroon.s).toBe(60) // capped from 94

    // A muted seed keeps its low saturation (not pushed up to the cap).
    expect(parse(buildScale('#82b1ae').DEFAULT).s).toBe(23)
  })

  it('keeps a near-neutral seed neutral (the cap leaves low saturation alone)', () => {
    // Charcoal is achromatic; min(s, cap) preserves its ~0 saturation, so it never
    // becomes a vivid color from colord's hue=0 convention.
    expect(parse(buildScale('#333333').DEFAULT).s).toBeLessThan(10)
  })

  it('caps a near-white solid so it stays visible on the light canvas', () => {
    // A near-white seed (#fafafa, L98) would be invisible as bg-primary; the solid
    // lightness is capped, mirroring the dark-mode floor.
    expect(parse(buildScale('#fafafa').DEFAULT).l).toBeLessThanOrEqual(70)
  })
})

describe('foreground contrast', () => {
  it('picks a readable on-color for the brand solid (by its lightness)', () => {
    expect(buildScale('#82b1ae').foreground).toBe('0 0% 0%') // light teal → black
    expect(buildScale('#64032e').foreground).toBe('0 0% 100%') // dark maroon → white
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

    expect(props.get('--nextui-primary')).toBe('333 60% 20%')
    expect(props.get('--nextui-primary-foreground')).toBe('0 0% 100%')
    expect(props.get('--nextui-primary-100')).toBeDefined()
    expect(props.get('--nextui-primary-900')).toBeDefined()
    // Focus follows primary.
    expect(props.get('--nextui-focus')).toBe('333 60% 20%')
  })

  it('lifts a dark solid to a visible tone in dark mode (no vanishing primary)', () => {
    const { root, props } = fakeRoot()

    applyPalette(root, { primary: '#64032e' }, 'dark')

    const def = parse(props.get('--nextui-primary')!)

    expect(def.h).toBe(333) // hue preserved
    expect(def.s).toBe(60) // capped saturation
    expect(def.l).toBe(60) // lifted from the seed's dark 20 to the dark minimum
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
    expect(props.get('--nextui-primary')).toBe('333 60% 20%')
  })
})
