import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar";
import { List, ListItem } from "@/components/list";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { useMap } from "react-map-gl";
import { useEffect } from "react";
import { bboxPolygon } from "@turf/bbox-polygon";
import { useViewState } from "@/config/store";
import { useTranslation } from "react-i18next";

export default function RegionPage() {
  let { id } = useParams();
  const { mapbox } = useMap();
  const { t } = useTranslation('common');
  const setBoundary = useViewState(s => s.setBoundary);
  const { data, isLoading, error } = useQuery({
    queryKey: ['region', id],
    queryFn: () => api.getRegion(Number(id)),
  });

  useEffect(() => {
    if (mapbox && data) {
      setBoundary(bboxPolygon(data.bounds))
      mapbox.fitBounds(data.bounds)
    }
  }, [data, mapbox]);

  return (
    <Main>
      {data &&
        <Helmet>
          <title>{t('locations.title', { location: data.label })}</title>
          <meta name="description" content={t('locations.description', { count: data.eventCount, location: data.label })} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar
              onSelect={value => console.log(value)}
              header={data.label}
              returnLink={data.parentPath}
            />
            <List>
              {data.areas.filter(area => area.eventCount > 0).map((area) => (
                <ListItem key={area.id} label={area.label} subtitle={area.subtitle} count={area.eventCount} link={area.path} />
              ))}
            </List>
          </>}
      </Loader>
    </Main>
  );
}
