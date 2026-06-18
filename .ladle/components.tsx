import type { GlobalProvider } from '@ladle/react'

import { useEffect } from 'react'
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
// globals.css explicitly. Ladle's theme addon drives globalState.theme, which we
// map onto the `dark`/`light` class that Tailwind (darkMode: 'class') and NextUI
// read — so every story renders correctly in both themes.
export const Provider: GlobalProvider = ({ children, globalState }) => {
  const isDark = globalState.theme === 'dark'

  useEffect(() => {
    const root = document.documentElement

    root.classList.toggle('dark', isDark)
    root.classList.toggle('light', !isDark)
  }, [isDark])

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
