import { Route, Routes } from "react-router";

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

import "@/styles/globals.css";
import '@/config/i18n';

export default function App() {
  const { locale } = useLocale();

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
