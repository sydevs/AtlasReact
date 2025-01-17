import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router";

import IndexPage from "@/pages/index";
import CountryPage from "@/pages/country";
import RegionPage from "@/pages/region";
import AreaPage from "@/pages/area";
import VenuePage from "@/pages/venue";
import EventPage from "@/pages/event";
import MapLayout from "./layouts/map";
import { Helmet } from "react-helmet-async";
import { OuterProviders, InnerProviders } from "./providers";
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
  Router?: typeof BrowserRouter | typeof HashRouter;
}

export default function App(props: AppProps) {
  return (
    <OuterProviders>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppClient {...props} />
        </ErrorBoundary>
      </Suspense>
    </OuterProviders>
  );
}


// ===== APP CLIENT ===== //

function AppClient({
  apiKey,
  Router = BrowserRouter,
} : AppProps) {
  if (!apiKey || apiKey == "") {
    throw new Error("Missing api key.");
  }

  const { data: client } = useSuspenseQuery({
    queryKey: ['client', apiKey],
    queryFn: () => api.getClient(apiKey),
  });

  return (
    <Router basename={client.basePath}>
      <InnerProviders>
        <AppRouter domain={client.domain} />
      </InnerProviders>
    </Router>
  );
}


// ===== APP ROUTER ===== //

type AppRouterProps = {
  domain: string
};

function AppRouter({
  domain,
}: AppRouterProps) {
  const { locale } = useLocale();
  const location = useLocation();
  const setCurrentPath = useNavigationState(s => s.setCurrentPath);
  useEffect(() => setCurrentPath(location.pathname), [location]);

  if (import.meta.env.VITE_FATHOM_ID && !domain.includes('localhost')) {
    Fathom.load(import.meta.env.VITE_FATHOM_ID)

    useEffect(() => {
      Fathom.trackPageview({
        url: `https://${domain}/${location.pathname}`,
      })
    }, [location]);
  }

  return <>
    <Helmet>
      <meta property="og:locale" content={locale} />
    </Helmet>
    <Routes>
      <Route element={<MapLayout />} path="/">
        <Route element={<IndexPage />} index />
        <Route element={<CountryPage />} path="/countries/:countryCode" />
        <Route element={<RegionPage />} path="/regions/:id" />
        <Route element={<AreaPage />} path="/areas/:id" />
        <Route element={<VenuePage />} path="/venues/:id" />
        <Route element={<EventPage />} path="/events/:id" />
      </Route>
    </Routes>
  </>;
}
