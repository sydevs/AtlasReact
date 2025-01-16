import { Route, Routes, useLocation } from "react-router";

import IndexPage from "@/pages/index";
import CountryPage from "@/pages/country";
import RegionPage from "@/pages/region";
import AreaPage from "@/pages/area";
import VenuePage from "@/pages/venue";
import EventPage from "@/pages/event";
import MapLayout from "./layouts/map";
import { Helmet } from "react-helmet-async";
import { Provider } from "./provider";
import useLocale from "./hooks/use-locale";
import { useEffect } from "react";
import { useNavigationState } from "./config/store";
import atlasAuth from "./config/api/auth";

import "@/styles/globals.css";
import "@/config/i18n";
import { Alert } from "@nextui-org/react";

export default function App() {
  const { locale } = useLocale();
  const location = useLocation();
  const setCurrentPath = useNavigationState(s => s.setCurrentPath);
  useEffect(() => setCurrentPath(location.pathname), [location]);

  const searchParams = new URLSearchParams(window.location.search);
  atlasAuth.apiKey = searchParams.get('key') || import.meta.env.VITE_ATLAS_API_KEY;

  if (!atlasAuth.apiKey) {
    return <div className="flex-center w-dvw h-dvh p-10 bg-background">
      <Alert color="danger" title="Sahaj Atlas" description="Map cannot be loaded without an API key." classNames={{ base: "max-w-xs" }} />
    </div>;
  }

  return (
    <Provider>
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
    </Provider>
  );
}
