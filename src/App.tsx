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
import { useEffect } from "react";
import { useNavigationState } from "./config/store";
import atlasAuth from "./config/api/auth";
import * as Fathom from "fathom-client";

import "@/styles/globals.css";
import "@/config/i18n";
import { Alert } from "@nextui-org/react";
import useAtlasClient from "./hooks/use-atlas-client";
import { Loading } from "./components/loader";


// ===== APP ===== //

type AppProps = {
  Router?: typeof BrowserRouter | typeof HashRouter;
}

export default function App(props: AppProps) {
  if (!atlasAuth.apiKey) {
    return <AppError message="Missing api key." />;
  }

  return (
    <OuterProviders>
      <AppClient apiKey={atlasAuth.apiKey} {...props} />
    </OuterProviders>
  );
}


// ===== APP CLIENT ===== //

type AppClientProps = {
  apiKey: string,
  Router?: typeof BrowserRouter | typeof HashRouter,
}

function AppClient({
  apiKey,
  Router = BrowserRouter,
} : AppClientProps) {

  const { client, isClientLoading, clientError } = useAtlasClient(apiKey);

  if (isClientLoading) {
    return <div className="flex-center w-dvw h-dvh p-10 bg-background">
        <Loading />
      </div>;
  } else if (clientError || !client) {
    return <AppError message={clientError?.message || "Invalid api key."} />;
  }

  return (
    <Router basename={client.basePath}>
      <InnerProviders>
        <AppRouter domain={client.domain} />
      </InnerProviders>
    </Router>
  );
}


// ===== APP ROUTER ===== //

type AppRouterProps = AppProps & {
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

function AppError({ message }: { message: string }) {
  return <div className="flex-center w-dvw h-dvh p-10 bg-background">
    <Alert color="danger" title="Sahaj Atlas" description={message} classNames={{ base: "max-w-xs" }} />
  </div>;
}