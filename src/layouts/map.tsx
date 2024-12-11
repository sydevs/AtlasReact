import { Navbar } from "@/components/navbar";
import Mapbox from "@/components/mapbox/map";
import { MapProvider } from "react-map-gl";
import { Outlet } from "react-router-dom";

export default function MapLayout() {
  const hasNavbar = true;

  return (
    <MapProvider>
      <div className="w-dvw h-[80dvh] md:fixed md:h-dvh">
        <Mapbox />
      </div>
      <div className={`flex flex-col w-screen md:h-screen pointer-events-none ${hasNavbar ? 'pb-16 md:p-0' : ''}`}>
        {hasNavbar && <Navbar className="fixed bottom-0 border-t-medium shadow-md md:static pointer-events-auto" />}
        <Outlet />
      </div>
    </MapProvider>
  );
}
