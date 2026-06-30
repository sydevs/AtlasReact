// originally written by @imoaazahmed; reworked to observe the root class so a
// single theme signal drives NextUI, Tailwind, and the Mapbox basemap.

import { useSyncExternalStore } from 'react'

const ThemeProps = {
  key: 'theme',
  light: 'light',
  dark: 'dark',
} as const

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark

// The root <html> class is the single source of truth: NextUI, Tailwind
// (darkMode: 'class'), and the Mapbox basemap (MAP_STYLES[theme]) all key off
// it. useTheme observes the class so every consumer reacts to a change made
// anywhere — ThemeSwitch, the Ladle theme toggle, etc.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  return () => observer.disconnect()
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains(ThemeProps.dark) ? ThemeProps.dark : ThemeProps.light

// Stories and unit tests render via renderToStaticMarkup (no DOM); default light.
const getServerSnapshot = (): Theme => ThemeProps.light

// The single seam for writing the theme to the root class — used by useTheme's
// setters, initTheme, and the Ladle decorator so the mechanism never drifts.
export const applyTheme = (theme: Theme) => {
  const root = document.documentElement

  root.classList.remove(ThemeProps.light, ThemeProps.dark)
  root.classList.add(theme)
}

// Apply the persisted (or default) theme to the root class once at startup, so
// the standalone app and widget restore the user's choice. Afterwards useTheme's
// setters keep the class in sync. Guarded to be a no-op outside the browser.
export const initTheme = (defaultTheme: Theme = ThemeProps.light) => {
  if (typeof document === 'undefined') return

  const stored =
    typeof localStorage === 'undefined'
      ? null
      : (localStorage.getItem(ThemeProps.key) as Theme | null)

  applyTheme(stored ?? defaultTheme)
}

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setTheme = (next: Theme) => {
    localStorage.setItem(ThemeProps.key, next)
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
