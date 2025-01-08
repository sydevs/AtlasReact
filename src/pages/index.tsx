import SearchBar from "@/components/search-bar";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import { List, DynamicEventsList, ListItem } from "@/components/list";
import { useSearchState, useViewState } from "@/config/store";
import { useShallow } from 'zustand/react/shallow'
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { CircleFlag } from 'react-circle-flags'
import { useTranslation } from "react-i18next";
import useLocale from "@/hooks/use-locale";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useMapbox from "@/hooks/use-mapbox";

export default function IndexPage() {
  const { t } = useTranslation('common');
  const [searchParams] = useSearchParams();
  const { regionNames } = useLocale();
  const onlineOnly = useSearchState(s => s.onlineOnly);
  const { moveMap, fitBounds } = useMapbox();
  const setBoundary = useViewState(s => s.setBoundary);
  const [ zoom, latitude, longitude ] = useViewState(useShallow(s => [s.zoom, s.latitude, s.longitude]))
  const { data, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: () => api.getCountries(),
  });

  const showCountries = zoom < 7 && !onlineOnly;

  useEffect(() => {
    setBoundary(undefined)
    const bbox = searchParams.get('bbox')
    const center = searchParams.get('center')

    if (bbox) {
      let bounds = bbox.split(',').map(v => parseFloat(v)) as [number, number, number, number]
      fitBounds(bounds)
    } else if (center) {
      let coords = center.split(',').map(v => parseFloat(v)) as [number, number]
      moveMap({ center: { lng: coords[0], lat: coords[1] }, zoom: 15 })
    } else {
      moveMap({ zoom: 0 })
    }
  }, [data, fitBounds, moveMap, setBoundary]);

  return (
    <Main footerHeight={170}>
      <Helmet>
        <title>{t('free_meditation_classes')}</title>
        <meta property="og:url" content="https://wemeditate.com/map" />
        <link rel="canonical" href="https://wemeditate.com/map" />
      </Helmet>
      <SearchBar onSelect={value => console.log(value)} filterable={true} eventCount={showCountries && data?.reduce((acc, country) => acc + country.eventCount, 0) || undefined} />
      { !showCountries ?
        <DynamicEventsList
          latitude={latitude}
          longitude={longitude}
          onlineOnly={onlineOnly}
        /> :
        <Loader isLoading={isLoading} error={error}>
          <List>
            {data &&
              data.filter(country => country.eventCount > 0).map((country) => (
                <ListItem key={country.id} label={regionNames.of(country.code) || country.label} count={country.eventCount} link={country.path}>
                  <CircleFlag countryCode={country.code.toLocaleLowerCase()} className="w-7 h-7 mr-3 border border-divider rounded-full bg-divider" />
                </ListItem>
              ))}
          </List>
        </Loader>}
    </Main>
  );
}
