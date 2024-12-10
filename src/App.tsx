import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CountryPage from "@/pages/country";
import RegionPage from "@/pages/region";
import AreaPage from "@/pages/area";
import VenuePage from "@/pages/venue";
import EventPage from "@/pages/event";
import MapLayout from "./layouts/map";

function App() {
  return (
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
  );
}

export default App;
