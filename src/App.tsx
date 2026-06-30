import type { PaletteRoles } from '@/config/theme/palette'

import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { Suspense, useEffect, type RefObject } from 'react'
import * as Fathom from 'fathom-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import { useNavigationState } from './config/store'
import { useLocale } from './hooks/use-locale'
import Providers from './providers'
import MapLayout from './layouts/map'
import { clientQuery } from './config/api'
import { BrandTheme } from './config/theme/BrandTheme'

import { regionPath } from '@/lib/shape'
import { ErrorFallback, LoadingFallback } from '@/components/atoms'
import EventPage from '@/pages/event'
import VenuePage from '@/pages/venue'
import AreaPage from '@/pages/area'
import RegionPage from '@/pages/region'
import CountryPage from '@/pages/country'
import IndexPage from '@/pages/index'
import '@/styles/globals.css'
import '@/config/i18n'
import i18n from '@/config/i18n'

// ===== APP ===== //

type AppProps = {
  apiKey: string | undefined | null
  defaultLocale?: string | null
  // Per-embed brand palette. Theming itself is app-wide (standalone also paints
  // the client's colors onto <html>); only `themeRootRef` — the widget wrapper
  // to scope the vars + theme class to — is widget-specific.
  brand?: PaletteRoles
  themeRootRef?: RefObject<HTMLElement | null>
}

export default function App({ apiKey, defaultLocale, brand, themeRootRef }: AppProps) {
  return (
    <Providers>
      <BrandTheme apiKey={apiKey} palette={brand} rootRef={themeRootRef}>
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRouter apiKey={apiKey} defaultLocale={defaultLocale} />
          </ErrorBoundary>
        </Suspense>
      </BrandTheme>
    </Providers>
  )
}

// ===== APP ROUTER ===== //

function AppRouter({ apiKey, defaultLocale }: AppProps) {
  if (!apiKey || apiKey == '') {
    throw new Error('Missing api key.')
  }

  const { data: client } = useSuspenseQuery(clientQuery(apiKey))

  // The widget's home view is its configured region; fall back to the search index.
  const initialPath =
    client.region && typeof client.region === 'object'
      ? regionPath(client.region.level, client.region.slug)
      : '/search'

  // Primary host for analytics (allowedDomains is a newline-separated list).
  const primaryDomain =
    client.allowedDomains
      ?.split('\n')
      .map((domain) => domain.trim())
      .find(Boolean) ?? ''

  useEffect(() => {
    if (defaultLocale || client.locale) {
      i18n.changeLanguage(defaultLocale || client.locale || 'en')
    }

    return () => {}
  }, [defaultLocale, client.locale])

  const { locale } = useLocale()
  const location = useLocation()
  const setCurrentPath = useNavigationState((s) => s.setCurrentPath)

  useEffect(() => setCurrentPath(location.pathname), [location])

  const fathomEnabled =
    !!import.meta.env.VITE_FATHOM_ID && !!primaryDomain && !primaryDomain.includes('localhost')

  useEffect(() => {
    if (fathomEnabled) Fathom.load(import.meta.env.VITE_FATHOM_ID)
  }, [fathomEnabled])

  useEffect(() => {
    if (fathomEnabled) {
      Fathom.trackPageview({ url: `https://${primaryDomain}/${location.pathname}` })
    }
  }, [location, fathomEnabled, primaryDomain])

  return (
    <>
      <Helmet>
        <meta content={locale} property="og:locale" />
      </Helmet>
      <MapLayout>
        <Routes>
          <Route element={<IndexPage />} path="/search" />
          <Route element={<CountryPage />} path="/countries/:slug" />
          <Route element={<RegionPage />} path="/regions/:slug" />
          <Route element={<AreaPage />} path="/areas/:slug" />
          <Route element={<VenuePage />} path="/venues/:slug" />
          <Route element={<EventPage />} path="/events/:id" />
          <Route element={<Navigate to={initialPath} />} path="*" />
        </Routes>
      </MapLayout>
    </>
  )
}
