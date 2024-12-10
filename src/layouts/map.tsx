import { Navbar } from "@/components/navbar";
import Mapbox from "@/components/mapbox/map";
import { MapProvider } from "react-map-gl";
import { Outlet } from "react-router-dom";

export default function MapLayout() {
  const hasNavbar = true;

  return (
    <MapProvider>
      <div className="fixed w-dvw h-dvh z-10">
        <Mapbox />
      </div>
      <div className="fixed w-screen h-screen z-50 pointer-events-none">
        {hasNavbar && <Navbar />}
        <Outlet />
      </div>
    </MapProvider>
  );
}
