import Loader from "@/components/loader";
import api from "@/config/api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ListHeader, EventsList } from "@/components/list";
import { useEffect } from "react";

export default function VenuePage() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: [`venue-${id}`],
    queryFn: () => api.getVenue(Number(id))
  });

  useEffect(() => {
    if (data && data.eventIds.length < 2) {
      navigate(`/area/${data.parentId}`);
    }
  }, [data, navigate]);

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <ListHeader title={data.name} returnLink={`/${data.parentType.toLowerCase()}/${data.parentId}`} />
            <EventsList eventIds={data.eventIds || []} />
          </>}
      </Loader>
    </MapLayout>
  );
}
