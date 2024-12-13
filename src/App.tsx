import { Route, Routes } from "react-router";

import IndexPage from "@/pages/index";
import CountryPage from "@/pages/country";
import RegionPage from "@/pages/region";
import AreaPage from "@/pages/area";
import VenuePage from "@/pages/venue";
import EventPage from "@/pages/event";
import MapLayout from "./layouts/map";
import i18n from "./config/i18n";
import { Helmet } from "react-helmet-async";
import { Provider } from "./provider";

import "@/styles/globals.css";
import "@/styles/embla.css";
import '@/config/i18n';

export default function App() {
  return (
    <Provider>
      <Helmet>
        <meta property="og:locale" content={i18n.resolvedLanguage} />
      </Helmet>
      <Routes>
        <Route element={<MapLayout />} path="/">
          <Route element={<IndexPage />} index />
          <Route element={<CountryPage />} path="/country/:code" />
          <Route element={<RegionPage />} path="/region/:id" />
          <Route element={<AreaPage />} path="/area/:id" />
          <Route element={<VenuePage />} path="/venue/:id" />
          <Route element={<EventPage />} path="/event/:id" />
        </Route>
      </Routes>
    </Provider>
  );
}
