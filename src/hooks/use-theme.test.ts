import { afterEach, describe, expect, it, vi } from 'vitest'

import { applyTheme, initTheme } from './use-theme'

// The unit lane is node-only (no jsdom — see .claude/rules/tests.md), so we stub
// the minimal `<html>` classList surface and `localStorage` that the theme
// helpers touch, then assert their DOM-light contracts directly.
function stubDocument() {
  const classes = new Set<string>()

  vi.stubGlobal('document', {
    documentElement: {
      classList: {
        add: (c: string) => classes.add(c),
        remove: (...cs: string[]) => cs.forEach((c) => classes.delete(c)),
        contains: (c: string) => classes.has(c),
      },
    },
  })

  return classes
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('applyTheme', () => {
  it('adds the requested theme class and clears the other', () => {
    const classes = stubDocument()

    applyTheme('dark')
    expect(classes.has('dark')).toBe(true)
    expect(classes.has('light')).toBe(false)

    applyTheme('light')
    expect(classes.has('light')).toBe(true)
    expect(classes.has('dark')).toBe(false)
  })
})

describe('initTheme', () => {
  it('is a no-op outside the browser (no document)', () => {
    expect(() => initTheme()).not.toThrow()
  })

  it('restores the persisted theme', () => {
    const classes = stubDocument()

    vi.stubGlobal('localStorage', { getItem: () => 'dark', setItem: () => {} })

    initTheme()
    expect(classes.has('dark')).toBe(true)
  })

  it('falls back to the default theme when nothing is stored', () => {
    const classes = stubDocument()

    vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => {} })

    initTheme('dark')
    expect(classes.has('dark')).toBe(true)
  })

  it('falls back to the default when localStorage throws (sandboxed iframe)', () => {
    const classes = stubDocument()

    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('SecurityError')
      },
      setItem: () => {
        throw new Error('SecurityError')
      },
    })

    expect(() => initTheme()).not.toThrow()
    expect(classes.has('light')).toBe(true)
  })
})
