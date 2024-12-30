import Loader from "@/components/loader";
import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Main } from "@/components/base/main";
import { useNavigationState, useViewState } from "@/config/store";
import { useMap } from "react-map-gl";
import EventMetadata from "@/components/event/metadata";
import EventDetails from "@/components/event/details";
import { Link } from "@nextui-org/react";
import { LeftArrowIcon } from "@/components/icons";

export default function EventPage() {
  const { id } = useParams();
  const { mapbox } = useMap();
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
    mapbox.easeTo({
      center: [data.location.longitude, data.location.latitude],
      zoom: data.online ? 10 : 15,
    })

    return () => {
      setMapSelection(null)
      if (returnViewState) {
        mapbox.easeTo({
          center: [returnViewState.longitude, returnViewState.latitude],
          zoom: returnViewState.zoom,
        })
      } else {
        mapbox.zoomTo(mapbox.getZoom() - 2)
      }
    }
  }, [data, mapbox])

  return (
    <Main width={467} mapWindow={180}>
      <Link className="text-3xl absolute top-7 left-1.5 z-10" href={returnPath || "/"}>
        <LeftArrowIcon size={32} className="text-lg" />
      </Link>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <EventMetadata event={data} />
            <EventDetails event={data} />
          </>}
      </Loader>
    </Main>
  );
}
