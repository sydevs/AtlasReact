import { Navbar } from "@/components/navbar";
import Mapbox from "@/components/mapbox/map";
import { MapProvider } from "react-map-gl";

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasNavbar = true;

  return (
    <MapProvider>
      <div className="fixed w-dvw h-dvh z-10">
        <Mapbox onZoom={zoom => console.log(zoom)} />
      </div>
      <div className="fixed w-screen h-screen z-50 pointer-events-none">
        {hasNavbar && <Navbar />}
        <main className='fixed z-50 w-96 shadow-md'>
          {children}
        </main>
      </div>
    </MapProvider>
  );
}

//backdrop-blur-lg backdrop-saturate-150 bg-background/70