import React from "react";
import { Geocoder } from "@mapbox/search-js-react";
import { GeocodingFeature } from "@mapbox/search-js-core";
import { useMap } from "react-map-gl";
import { controlTheme } from "./themes";
import { useSearchParams } from "react-router";

interface SearchProps {
  onSelect: (value: GeocodingFeature) => void;
}

export default function SearchBox({ onSelect }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get("q") || "");
  const { mapbox: map } = useMap();

  return (
    // @ts-ignore: 'Geocoder' cannot be used as a JSX component.
    <Geocoder
      value={searchQuery}
      onChange={(query) => {
        setSearchQuery(query)
        setSearchParams({ q: query })
      }}
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
