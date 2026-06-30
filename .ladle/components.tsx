import type { GlobalProvider } from '@ladle/react'

import { useEffect } from 'react'
import { ThemeState, useLadleContext } from '@ladle/react'
import { MemoryRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'

import storyI18n from './i18n'

import Providers from '@/providers'
import { applyTheme } from '@/hooks/use-theme'

import '@/styles/globals.css'

// Global decorator for every story.
//
// Mirrors src/providers.tsx (NextUI + React Query + Helmet) and supplies the two
// things the app entry normally provides but stories otherwise lack:
//   1. a Router — NextUIProvider and many components call react-router hooks
//      (Link / useNavigate / useSearchParams); MemoryRouter keeps the preview
//      URL clean.
//   2. i18n with bundled resources (see ./i18n) wired through I18nextProvider.
//
// The widget injects its CSS via JS in production, so stories must import
// globals.css explicitly.
//
// Theme: Ladle's own light/dark/auto toggle drives the whole canvas. We map its
// active theme onto the root `light`/`dark` class — through the same applyTheme
// seam useTheme uses — that Tailwind (darkMode: 'class'), NextUI, and useTheme
// all read, so flipping Ladle's toggle re-themes every story, including the
// Mapbox basemap (which follows useTheme). `auto` resolves against the OS
// preference and tracks it live. The canvas background is left to Ladle's own
// theme so it matches the surrounding chrome.
export const Provider: GlobalProvider = ({ children }) => {
  const { globalState } = useLadleContext()
  const ladleTheme = globalState.theme

  useEffect(() => {
    if (ladleTheme === ThemeState.Auto) {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      const sync = () => applyTheme(media.matches ? 'dark' : 'light')

      sync()
      media.addEventListener('change', sync)

      return () => media.removeEventListener('change', sync)
    }

    applyTheme(ladleTheme === ThemeState.Dark ? 'dark' : 'light')
  }, [ladleTheme])

  return (
    <I18nextProvider i18n={storyI18n}>
      <MemoryRouter>
        <Providers>
          <main className="min-h-screen p-6 text-foreground">{children}</main>
        </Providers>
      </MemoryRouter>
    </I18nextProvider>
  )
}
