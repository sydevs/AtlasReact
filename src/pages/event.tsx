import api from "@/config/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Panel } from "@/components/base/panel";
import { useNavigationState, useViewState } from "@/config/store";
import EventMetadata from "@/components/event/metadata";
import { Link } from "@nextui-org/react";
import { UpArrowIcon } from "@/components/icons";
import useMapbox from "@/hooks/use-mapbox";
import { lazy } from "react";

const EventPanelContent = lazy(() => import("@/components/event/panel"))

function EventPanel({ eventId }: { eventId: number }) {
  const { mapbox, moveMap } = useMapbox();
  const setMapSelection = useViewState(s => s.setSelection);
  const { data: event } = useSuspenseQuery({
    queryKey: ['event', eventId],
    queryFn: () => api.getEvent(Number(eventId)),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!mapbox) return;
    
    setMapSelection({ ...event.location, approximate: event.online })
    moveMap({
      center: [event.location.longitude, event.location.latitude],
      zoom: event.online ? 7 : 15,
    })

    return () => {
      setMapSelection(null)
    }
  }, [event, mapbox])

  const previousPath = useNavigationState(s => s.previousPath);
  const parentPath = (event.online || previousPath != event.location.venuePath ? event.location.areaPath : event.location.venuePath)

  return (
    <>
      <Link className="text-3xl absolute top-5 left-2.5 z-20 bg-background rounded hover:opacity-100 hover:bg-primary-50 transition-colors" href={parentPath}>
        <UpArrowIcon size={32} className="text-lg" />
      </Link>
      <EventMetadata event={event} />
      <EventPanelContent event={event} />
    </>
  );
}

export default function EventPage() {
  let { id } = useParams();

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel width={467} mapWindow={180}>
      <EventPanel eventId={Number(id)} />
    </Panel>
  );
}
