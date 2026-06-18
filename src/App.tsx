import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { Suspense, useEffect } from 'react'
import * as Fathom from 'fathom-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import { useNavigationState } from './config/store'
import useLocale from './hooks/use-locale'
import Providers from './providers'
import MapLayout from './layouts/map'
import api from './config/api'

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
}

export default function App(props: AppProps) {
  return (
    <Providers>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRouter {...props} />
        </ErrorBoundary>
      </Suspense>
    </Providers>
  )
}

// ===== APP ROUTER ===== //

function AppRouter({ apiKey, defaultLocale }: AppProps) {
  if (!apiKey || apiKey == '') {
    throw new Error('Missing api key.')
  }

  const { data: client } = useSuspenseQuery({
    queryKey: ['client', apiKey],
    queryFn: () => api.getClient(apiKey),
  })

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

  if (import.meta.env.VITE_FATHOM_ID && !client.domain.includes('localhost')) {
    Fathom.load(import.meta.env.VITE_FATHOM_ID)

    useEffect(() => {
      Fathom.trackPageview({
        url: `https://${client.domain}/${location.pathname}`,
      })
    }, [location])
  }

  return (
    <>
      <Helmet>
        <meta content={locale} property="og:locale" />
      </Helmet>
      <MapLayout>
        <Routes>
          <Route element={<IndexPage />} path="/search" />
          <Route element={<CountryPage />} path="/countries/:countryCode" />
          <Route element={<RegionPage />} path="/regions/:id" />
          <Route element={<AreaPage />} path="/areas/:id" />
          <Route element={<VenuePage />} path="/venues/:id" />
          <Route element={<EventPage />} path="/events/:id" />
          <Route element={<Navigate to={client.initialPath || '/search'} />} path="*" />
        </Routes>
      </MapLayout>
    </>
  )
}
