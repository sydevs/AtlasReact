import { useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import api from "@/config/api";
import { List, ListItem } from "@/components/list";
import SearchBar from "@/components/search-bar";
import { Panel } from "@/components/base/panel";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useViewState } from "@/config/store";
import { bboxPolygon } from "@turf/bbox-polygon";
import { useTranslation } from "react-i18next";
import useLocale from "@/hooks/use-locale";
import useMapbox from "@/hooks/use-mapbox";

function CountryPanel({ countryCode }: { countryCode: string }) {
  const { fitBounds } = useMapbox();
  const { t } = useTranslation('common');
  const { regionNames } = useLocale();
  const setBoundary = useViewState(s => s.setBoundary);
  const { data: country } = useSuspenseQuery({
    queryKey: ['country', countryCode],
    queryFn: () => api.getCountry(countryCode),
  });

  useEffect(() => {
    setBoundary(bboxPolygon(country.bounds))
    fitBounds(country.bounds)
  }, [country, fitBounds]);

  const countryName = regionNames.of(country.code) || country.label

  return (
    <>
      <Helmet>
        <title>{t('locations.title', { location: countryName })}</title>
        <meta name="description" content={t('locations.description', { count: country.eventCount, location: countryName })} />
      </Helmet>
      <SearchBar
        onSelect={value => console.log(value)}
        header={countryName}
        returnLink="/search"
      />
      <List>
        {country.children.map((child) => (
          child.eventCount > 0 &&
            <ListItem key={child.id} label={child.label} subtitle={child.subtitle} count={child.eventCount} link={child.path} />
        ))}
      </List>
    </>
  );
}

export default function CountryPage() {
  let { countryCode } = useParams();

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel>
      <CountryPanel countryCode={countryCode || ""} />
    </Panel>
  );
}
