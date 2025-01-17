import api from "@/config/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import SearchBar from "@/components/search-bar";
import { List, ListItem } from "@/components/list";
import { Panel } from "@/components/base/panel";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { bboxPolygon } from "@turf/bbox-polygon";
import { useViewState } from "@/config/store";
import { useTranslation } from "react-i18next";
import useMapbox from "@/hooks/use-mapbox";

function RegionPanel({ regionId }: { regionId: number }) {
  const { fitBounds } = useMapbox();
  const { t } = useTranslation('common');
  const setBoundary = useViewState(s => s.setBoundary);
  const { data: region } = useSuspenseQuery({
    queryKey: ['region', regionId],
    queryFn: () => api.getRegion(regionId),
  });

  useEffect(() => {
    setBoundary(bboxPolygon(region.bounds))
    fitBounds(region.bounds)
  }, [region, fitBounds]);

  return (
    <>
      <Helmet>
        <title>{t('locations.title', { location: region.label })}</title>
        <meta name="description" content={t('locations.description', { count: region.eventCount, location: region.label })} />
      </Helmet>
      <SearchBar
        onSelect={value => console.log(value)}
        header={region.label}
        returnLink={region.parentPath}
      />
      <List>
        {region.areas.filter(area => area.eventCount > 0).map((area) => (
          <ListItem key={area.id} label={area.label} subtitle={area.subtitle} count={area.eventCount} link={area.path} />
        ))}
      </List>
    </>
  );
}

export default function RegionPage() {
  let { id } = useParams();

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel>
      <RegionPanel regionId={Number(id)} />
    </Panel>
  );
}
