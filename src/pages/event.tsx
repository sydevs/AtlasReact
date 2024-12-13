import Loader from "@/components/loader";
import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Main } from "@/components/base/main";
import { useViewState } from "@/config/store";
import { useMap } from "react-map-gl";
import EventMetadata from "@/components/event/metadata";
import EventDetails from "@/components/event/details";

export default function EventPage() {
  const { id } = useParams();
  const { mapbox } = useMap();
  const setMapSelection = useViewState(s => s.setSelection);
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api.getEvent(Number(id)),
  });

  useEffect(() => {
    if (!mapbox || !data) return;
    
    setMapSelection(data.location)
    mapbox.easeTo({
      center: [data.location.longitude, data.location.latitude],
      zoom: data.online ? 10 : 15,
    })

    return () => {
      setMapSelection(null)
      mapbox.zoomOut()
    }
  }, [data, mapbox])

  return (
    <Main width={467}>
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
