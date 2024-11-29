import { Navbar } from "@/components/navbar";
import Map, { GeolocateControl } from 'react-map-gl';

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasNavbar = true;

  return (
    <>
      <div className="fixed w-dvw h-dvh z-10">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
          mapStyle="mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq"
          //{...viewState}
          //onMove={evt => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          reuseMaps
          attributionControl={false}
        >
          <GeolocateControl />
        </Map>
      </div>
      <div className="fixed w-screen h-screen z-50 pointer-events-none">
        {hasNavbar && <Navbar />}
        <main className='fixed z-50 w-96 p-10 backdrop-blur-lg backdrop-saturate-150 bg-background/70'>
          {children}
        </main>
      </div>
    </>
  );
}
