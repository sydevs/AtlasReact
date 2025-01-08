import React from "react";
import { Geocoder } from "@mapbox/search-js-react";
import { GeocodingFeature } from "@mapbox/search-js-core";
import { controlTheme } from "./themes";
import { useSearchParams } from "react-router";
import useLocale from "@/hooks/use-locale";
import useMapbox from "@/hooks/use-mapbox";

interface SearchProps {
  onSelect: (value: GeocodingFeature) => void;
}

export default function SearchBox({ onSelect }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get("q") || "");
  const { mapbox } = useMapbox();
  const { locale } = useLocale();

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
      map={mapbox?.getMap()}
      options={{
        language: locale, // TOOD: Make sure this switches when locale changes
        proximity: mapbox?.getCenter(),
      }}
    />
  );
}
