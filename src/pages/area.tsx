import Loader from "@/components/loader";
import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EventsList } from "@/components/list";
import SearchBar from "@/components/search-bar";
import { Main } from "@/components/base/main";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useViewState } from "@/config/store";
import { circle as geoCircle } from "@turf/circle";
import { bbox } from "@turf/bbox";
import { useTranslation } from "react-i18next";
import useMapbox from "@/hooks/use-mapbox";

export default function AreaPage() {
  let { id } = useParams();
  const { fitBounds } = useMapbox();
  const { t } = useTranslation('common');
  const setBoundary = useViewState(s => s.setBoundary);
  const { data, isLoading, error } = useQuery({
    queryKey: ['area', id],
    queryFn: () => api.getArea(Number(id)),
  });

  useEffect(() => {
    if (data) {
      let circle = geoCircle([data.longitude, data.latitude], data.radius)
      setBoundary(circle)
      let box = bbox(circle) as [number, number, number, number]
      fitBounds(box)
    }
  }, [data, fitBounds]);

  return (
    <Main>
      {data &&
        <Helmet>
          <title>{t('locations.title', { location: data.label })}</title>
          <meta name="description" content={t('locations.description', { count: data.events.length, location: data.label })} />
        </Helmet>}
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar
              header={data.label}
              subheader={data.subtitle || undefined}
              returnLink={data.parentPath}
            />
            <EventsList events={data.events} />
          </>}
      </Loader>
    </ Main>
  );
}
