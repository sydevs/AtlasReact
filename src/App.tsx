import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CountryPage from "@/pages/country";
import RegionPage from "@/pages/region";
import AreaPage from "@/pages/area";
import EventPage from "@/pages/event";

import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CountryPage />} path="/country/:id" />
      <Route element={<RegionPage />} path="/region/:id" />
      <Route element={<AreaPage />} path="/area/:id" />
      <Route element={<EventPage />} path="/event/:id" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
