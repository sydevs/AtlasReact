import { Navigate, Route, Routes, useLocation } from "react-router";

import IndexPage from "@/pages/index";
import CountryPage from "@/pages/country";
import RegionPage from "@/pages/region";
import AreaPage from "@/pages/area";
import VenuePage from "@/pages/venue";
import EventPage from "@/pages/event";
import MapLayout from "./layouts/map";
import { Helmet } from "react-helmet-async";
import Providers from "./providers";
import useLocale from "./hooks/use-locale";
import { Suspense, useEffect } from "react";
import { useNavigationState } from "./config/store";
import * as Fathom from "fathom-client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary"
import api from "./config/api";
import { ErrorFallback, LoadingFallback } from "./components/base/fallbacks";


import "@/styles/globals.css";
import "@/config/i18n";


// ===== APP ===== //

type AppProps = {
  apiKey: string | undefined | null,
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
  );
}


// ===== APP ROUTER ===== //

function AppRouter({
  apiKey
}: AppProps) {
  if (!apiKey || apiKey == "") {
    throw new Error("Missing api key.");
  }

  const { data: client } = useSuspenseQuery({
    queryKey: ['client', apiKey],
    queryFn: () => api.getClient(apiKey),
  });

  const { locale } = useLocale();
  const location = useLocation();
  const setCurrentPath = useNavigationState(s => s.setCurrentPath);
  useEffect(() => setCurrentPath(location.pathname), [location]);

  if (import.meta.env.VITE_FATHOM_ID && !client.domain.includes('localhost')) {
    Fathom.load(import.meta.env.VITE_FATHOM_ID)

    useEffect(() => {
      Fathom.trackPageview({
        url: `https://${client.domain}/${location.pathname}`,
      })
    }, [location]);
  }

  return <>
    <Helmet>
      <meta property="og:locale" content={locale} />
    </Helmet>
    <MapLayout>
      <Routes>
        <Route path="/search" element={<IndexPage />} />
        <Route path="/countries/:countryCode" element={<CountryPage />} />
        <Route path="/regions/:id" element={<RegionPage />} />
        <Route path="/areas/:id" element={<AreaPage />} />
        <Route path="/venues/:id" element={<VenuePage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="*" element={<Navigate to={client.initialPath || "/search"} />} />
      </Routes>
    </MapLayout>
  </>;
}
