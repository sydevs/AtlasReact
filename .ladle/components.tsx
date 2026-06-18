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
// globals.css explicitly.
//
// Theme: matching WeMeditateWeb, the story canvas is **always light** so the
// StorySection helper's gray-900 titles stay legible. Dark previews are shown
// per-section via <StorySection theme="dark">, which applies the `dark` class to
// its own subtree (so NextUI components there render dark). We force the `light`
// class here rather than mapping Ladle's theme toggle to the whole canvas.
export const Provider: GlobalProvider = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement

    root.classList.add('light')
    root.classList.remove('dark')
  }, [])

  return (
    <I18nextProvider i18n={storyI18n}>
      <MemoryRouter>
        <Providers>
          <main className="min-h-screen bg-white p-6 text-gray-900">{children}</main>
        </Providers>
      </MemoryRouter>
    </I18nextProvider>
  )
}
