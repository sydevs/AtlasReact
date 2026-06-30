// originally written by @imoaazahmed; reworked to observe the root class so a
// single theme signal drives NextUI, Tailwind, and the Mapbox basemap.

import { useCallback, useSyncExternalStore } from 'react'

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

const applyTheme = (theme: Theme) => {
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

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(ThemeProps.key, next)
    applyTheme(next)
  }, [])

  const setLightTheme = useCallback(() => setTheme(ThemeProps.light), [setTheme])
  const setDarkTheme = useCallback(() => setTheme(ThemeProps.dark), [setTheme])
  // Read the live class rather than closing over `theme`, so the callback stays
  // stable and never toggles from a stale value.
  const toggleTheme = useCallback(
    () => setTheme(getSnapshot() === ThemeProps.dark ? ThemeProps.light : ThemeProps.dark),
    [setTheme],
  )

  return {
    theme,
    isDark: theme === ThemeProps.dark,
    isLight: theme === ThemeProps.light,
    setLightTheme,
    setDarkTheme,
    toggleTheme,
  }
}
