import Loader from "@/components/loader";
import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Main } from "@/components/base/main";
import { useNavigationState, useViewState } from "@/config/store";
import EventMetadata from "@/components/event/metadata";
import { Link } from "@nextui-org/react";
import { LeftArrowIcon } from "@/components/icons";
import useMapbox from "@/hooks/use-mapbox";
import { lazy } from "react";

const EventPanel = lazy(() => import("@/components/event/panel"))

export default function EventPage() {
  const { id } = useParams();
  const { mapbox, moveMap } = useMapbox();
  const returnPath = useNavigationState(s => s.returnPath);
  const returnViewState = useNavigationState(s => s.returnViewState);
  const setMapSelection = useViewState(s => s.setSelection);
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api.getEvent(Number(id)),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!mapbox || !data) return;
    
    setMapSelection({ ...data.location, approximate: data.online })
    moveMap({
      center: [data.location.longitude, data.location.latitude],
      zoom: data.online ? 7 : 15,
    })

    return () => {
      setMapSelection(null)
      if (returnViewState) {
        moveMap({
          center: [returnViewState.longitude, returnViewState.latitude],
          zoom: returnViewState.zoom,
        })
      } else {
        moveMap({ zoom: mapbox.getZoom() - 2 })
      }
    }
  }, [data, mapbox])

  return (
    <Main width={467} mapWindow={180}>
      <Link className="text-3xl absolute top-5 left-2.5 z-20 bg-background rounded hover:opacity-100 hover:bg-primary-50 transition-colors" href={returnPath || "/"}>
        <LeftArrowIcon size={32} className="text-lg" />
      </Link>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <EventMetadata event={data} />
            <EventPanel event={data} />
          </>}
      </Loader>
    </Main>
  );
}
