import { Navbar } from "@/components/navbar";
import Mapbox from "@/components/mapbox/map";
import { MapProvider } from "react-map-gl";

type Props = {
  children: React.ReactNode;
  width?: number;
};

export default function MapLayout({
  children,
  width = 400,
}: Props) {
  const hasNavbar = true;

  return (
    <MapProvider>
      <div className="fixed w-dvw h-dvh z-10">
        <Mapbox />
      </div>
      <div className="fixed w-screen h-screen z-50 pointer-events-none">
        {hasNavbar && <Navbar />}
        <main className={`fixed z-50 shadow-md flex flex-col`} style={{ width: width}}>
          {children}
        </main>
      </div>
    </MapProvider>
  );
}

//backdrop-blur-lg backdrop-saturate-150 bg-background/70