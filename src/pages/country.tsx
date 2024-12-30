import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import { List, ListItem } from "@/components/list";
import SearchBar from "@/components/search-bar";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { useMap } from "react-map-gl";
import { useEffect } from "react";
import { useViewState } from "@/config/store";
import { bboxPolygon } from "@turf/bbox-polygon";
import { useTranslation } from "react-i18next";
import useLocale from "@/hooks/use-locale";

export default function CountryPage() {
  let { countryCode } = useParams();
  const { mapbox } = useMap();
  const { t } = useTranslation('common');
  const { regionNames } = useLocale();
  const setBoundary = useViewState(s => s.setBoundary);
  const { data, isLoading, error } = useQuery({
    queryKey: ['country', countryCode],
    queryFn: () => api.getCountry(countryCode || ""),
  });

  useEffect(() => {
    if (mapbox && data) {
      setBoundary(bboxPolygon(data.bounds))
      mapbox.fitBounds(data.bounds)
    }
  }, [data, mapbox]);

  const countryName = data && (regionNames.of(data.code) || data.label)

  return (
    <Main>
      {data &&
        <Helmet>
          <title>{t('locations.title', { location: countryName })}</title>
          <meta name="description" content={t('locations.description', { count: data.eventCount, location: countryName })} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar
              onSelect={value => console.log(value)}
              header={countryName}
              returnLink="/"
            />
            <List>
              {data.children.map((child) => (
                child.eventCount > 0 &&
                  <ListItem key={child.id} label={child.label} subtitle={child.subtitle} count={child.eventCount} link={child.path} />
              ))}
            </List>
          </>}
      </Loader>
    </Main>
  );
}
