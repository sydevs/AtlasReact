import React from 'react';
import { Geocoder } from "@mapbox/search-js-react";
import { GeocodingFeature } from "@mapbox/search-js-core";
import { useMap } from "react-map-gl";
import { controlTheme } from './themes';

interface SearchProps {
  onSelect: (value: GeocodingFeature) => void;
}

export default function SearchBox({ onSelect }: SearchProps) {
  const [location, setLocation] = React.useState('');
  const { mapbox: map } = useMap();

  return (
    // @ts-ignore: 'Geocoder' cannot be used as a JSX component.
    <Geocoder
      value={location}
      onChange={setLocation}
      onRetrieve={onSelect}
      accessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      theme={controlTheme}
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
