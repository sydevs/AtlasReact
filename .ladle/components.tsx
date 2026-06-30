import type { GlobalProvider } from '@ladle/react'

import { useEffect } from 'react'
import { ThemeState, useLadleContext } from '@ladle/react'
import { MemoryRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'

import storyI18n from './i18n'

import Providers from '@/providers'

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
// active theme onto the root `light`/`dark` class that Tailwind (darkMode:
// 'class'), NextUI, and useTheme all read — so flipping Ladle's toggle re-themes
// every story, including the Mapbox basemap (which follows useTheme). `auto`
// resolves against the OS preference and tracks it live.
export const Provider: GlobalProvider = ({ children }) => {
  const { globalState } = useLadleContext()
  const ladleTheme = globalState.theme

  useEffect(() => {
    const root = document.documentElement

    const apply = (dark: boolean) => {
      root.classList.toggle('dark', dark)
      root.classList.toggle('light', !dark)
    }

    if (ladleTheme === ThemeState.Auto) {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      const onChange = (event: MediaQueryListEvent) => apply(event.matches)

      apply(media.matches)
      media.addEventListener('change', onChange)

      return () => media.removeEventListener('change', onChange)
    }

    apply(ladleTheme === ThemeState.Dark)
  }, [ladleTheme])

  return (
    <I18nextProvider i18n={storyI18n}>
      <MemoryRouter>
        <Providers>
          <main className="min-h-screen bg-background p-6 text-foreground">{children}</main>
        </Providers>
      </MemoryRouter>
    </I18nextProvider>
  )
}
