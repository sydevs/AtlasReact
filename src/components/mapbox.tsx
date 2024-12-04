import React from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';
import { Geocoder } from "@mapbox/search-js-react";
import { GeocodingFeature } from "@mapbox/search-js-core";
import { useMap } from "react-map-gl";

const MAPBOX_THEME = {
  variables: {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    unit: '14px',
    padding: '1em',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '0',
    boxShadow: 'none',
    //boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  }
};

interface SearchProps {
  onSelect: (value: GeocodingFeature) => void;
}

export function SearchBox({ onSelect }: SearchProps) {
  const [location, setLocation] = React.useState('');
  const { map } = useMap();

  return (
    // @ts-ignore: 'Geocoder' cannot be used as a JSX component.
    <Geocoder
      value={location}
      onChange={setLocation}
      onRetrieve={onSelect}
      accessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      theme={MAPBOX_THEME}
      // @ts-ignore: Type 'Map$1' is not assignable to type 'Map'.
      map={map?.getMap()}
      options={{
        language: 'en',
        proximity: {
          lng: -122.431297,
          lat: 37.773972,
        },
      }}
    />
  );
}

export function Mapbox() {
  return (
    <MapGL
      id="map"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      mapStyle="mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq"
      //{...viewState}
      //onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      reuseMaps
      attributionControl={false}
    >
      <GeolocateControl />
    </MapGL>
  );
}