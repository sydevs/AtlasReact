import api from "@/config/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EventsList } from "@/components/list";
import SearchBar from "@/components/search-bar";
import { Panel } from "@/components/base/panel";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useViewState } from "@/config/store";
import { circle as geoCircle } from "@turf/circle";
import { bbox } from "@turf/bbox";
import { useTranslation } from "react-i18next";
import useMapbox from "@/hooks/use-mapbox";

function AreaPanel({ areaId }: { areaId: number }) {
  const { fitBounds } = useMapbox();
  const { t } = useTranslation('common');
  const setBoundary = useViewState(s => s.setBoundary);
  const { data: area } = useSuspenseQuery({
    queryKey: ['area', areaId],
    queryFn: () => api.getArea(Number(areaId)),
  });

  useEffect(() => {
    let circle = geoCircle([area.longitude, area.latitude], area.radius)
    setBoundary(circle)
    let box = bbox(circle) as [number, number, number, number]
    fitBounds(box)
  }, [area, fitBounds]);

  return (
    <>
      <Helmet>
        <title>{t('locations.title', { location: area.label })}</title>
        <meta name="description" content={t('locations.description', { count: area.events.length, location: area.label })} />
      </Helmet>
      <SearchBar
        header={area.label}
        subheader={area.subtitle || undefined}
        returnLink={area.parentPath}
      />
      <EventsList events={area.events} />
    </>
  );
}

export default function AreaPage() {
  let { id } = useParams();

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel>
      <AreaPanel areaId={Number(id)} />
    </Panel>
  );
}
