import api from "@/config/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import SearchBar from "@/components/search-bar";
import { EventsList } from "@/components/list";
import { useEffect } from "react";
import { Panel } from "@/components/base/panel";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useMapbox from "@/hooks/use-mapbox";

function VenuePanel({ venueId }: { venueId: number }) {
  const { moveMap } = useMapbox();
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const { data: venue } = useSuspenseQuery({
    queryKey: ['venue', venueId],
    queryFn: () => api.getVenue(Number(venueId))
  });

  useEffect(() => {
    if (venue.events.length < 2) {
      navigate(venue.parentPath, { replace: true });
    }
  }, [venue, navigate]);

  useEffect(() => {
    moveMap({ center: [venue.longitude, venue.latitude], zoom: 13 })
  }, [venue, moveMap]);

  return (
    <>
      <Helmet>
        <title>{t('venues.title', { venue: venue.label })}</title>
        <meta name="description" content={t('venues.description', { count: venue.events.length, venue: venue.label })} />
      </Helmet>
      <SearchBar
        onSelect={value => console.log(value)}
        header={venue.label}
        returnLink={venue.parentPath}
      />
      <EventsList events={venue.events} />
    </>
  );
}

export default function VenuePage() {
  let { id } = useParams();

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel mapWindow={240}>
      <VenuePanel venueId={Number(id)} />
    </Panel>
  );
}
