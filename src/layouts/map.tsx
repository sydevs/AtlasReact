import { Navbar } from "@/components/navbar";
import Mapbox from "@/components/mapbox/map";
import { MapProvider } from "react-map-gl";
import { Outlet } from "react-router";

export default function MapLayout() {
  const hasNavbar = false;

  return (
    <MapProvider>
      {hasNavbar &&
        <Navbar className="fixed top-0 border-t-medium shadow-md md:static pointer-events-auto" />}
      <div className="w-dvw h-dvh fixed">
        <Mapbox />
      </div>
      <div className={`flex flex-col w-screen h-screen pointer-events-none`}>
        <Outlet />
      </div>
    </MapProvider>
  );
}
