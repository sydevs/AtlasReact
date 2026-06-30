// originally written by @imoaazahmed; reworked to observe a configurable root
// class so a single theme signal drives NextUI, Tailwind, and the Mapbox basemap.

import { useSyncExternalStore } from 'react'

const ThemeProps = {
  key: 'theme',
  light: 'light',
  dark: 'dark',
} as const

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark

// The theme root's class is the single source of truth: NextUI, Tailwind
// (darkMode: 'class'), and the Mapbox basemap (MAP_STYLES[theme]) all key off
// it. Standalone, the root is the host page's <html>. Embedded, the widget
// scopes it to its own wrapper (via setThemeRoot) so it never mutates the host
// page's <html> — its brand vars and theme class stay inside the widget.
let themeRoot: HTMLElement | null = null

const getThemeRoot = (): HTMLElement => themeRoot ?? document.documentElement

// Subscriptions that must re-observe when the root element changes (see
// subscribe). A Set so each live useTheme caller re-attaches its observer.
const rootListeners = new Set<() => void>()

// Point the theme machinery at a specific element (the widget wrapper), or pass
// null to fall back to <html>. Notifies live subscribers so they re-observe the
// new root and re-read the current theme.
export const setThemeRoot = (el: HTMLElement | null) => {
  if (themeRoot === el) return
  themeRoot = el
  rootListeners.forEach((notify) => notify())
}

// useTheme observes the root's class so every consumer reacts to a change made
// anywhere — ThemeSwitch, the Ladle theme toggle, etc. The observer follows the
// active root: if setThemeRoot swaps it, each subscription re-attaches.
const subscribe = (onChange: () => void) => {
  let observer: MutationObserver | null = null

  const attach = () => {
    observer?.disconnect()
    observer = new MutationObserver(onChange)
    observer.observe(getThemeRoot(), { attributes: true, attributeFilter: ['class'] })
  }

  const onRootChange = () => {
    attach()
    onChange()
  }

  rootListeners.add(onRootChange)
  attach()

  return () => {
    rootListeners.delete(onRootChange)
    observer?.disconnect()
  }
}

const getSnapshot = (): Theme =>
  getThemeRoot().classList.contains(ThemeProps.dark) ? ThemeProps.dark : ThemeProps.light

// Stories and unit tests render via renderToStaticMarkup (no DOM); default light.
const getServerSnapshot = (): Theme => ThemeProps.light

// The single seam for writing the theme to the root class — used by useTheme's
// setters, initTheme, and the Ladle decorator so the mechanism never drifts.
export const applyTheme = (theme: Theme) => {
  const root = getThemeRoot()

  root.classList.remove(ThemeProps.light, ThemeProps.dark)
  root.classList.add(theme)
}

// localStorage can throw — not just be absent — in sandboxed iframes (a
// `sandbox` without `allow-same-origin`) and some privacy modes, which matters
// since this ships as an embeddable widget. Wrap reads/writes so the theme class
// still updates; the choice just isn't persisted.
const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(ThemeProps.key)

    return stored === ThemeProps.dark || stored === ThemeProps.light ? stored : null
  } catch {
    return null
  }
}

const persistTheme = (theme: Theme) => {
  try {
    localStorage.setItem(ThemeProps.key, theme)
  } catch {
    // storage unavailable — ignore; the root class still reflects the choice
  }
}

// Resolve the theme to render on first paint (persisted choice, else default)
// without touching the DOM — used by the widget to set its wrapper's initial
// class so there's no flash before useTheme/initTheme take over.
export const getInitialTheme = (defaultTheme: Theme = ThemeProps.light): Theme =>
  readStoredTheme() ?? defaultTheme

// Apply the persisted (or default) theme to the root class once at startup, so
// the standalone app and widget restore the user's choice. Afterwards useTheme's
// setters keep the class in sync. Guarded to be a no-op outside the browser.
export const initTheme = (defaultTheme: Theme = ThemeProps.light) => {
  if (typeof document === 'undefined') return

  applyTheme(readStoredTheme() ?? defaultTheme)
}

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setTheme = (next: Theme) => {
    persistTheme(next)
    applyTheme(next)
  }

  return {
    theme,
    isDark: theme === ThemeProps.dark,
    isLight: theme === ThemeProps.light,
    setLightTheme: () => setTheme(ThemeProps.light),
    setDarkTheme: () => setTheme(ThemeProps.dark),
    // Read the live class rather than closing over `theme`, so the toggle never
    // acts on a stale value.
    toggleTheme: () =>
      setTheme(getSnapshot() === ThemeProps.dark ? ThemeProps.light : ThemeProps.dark),
  }
}
