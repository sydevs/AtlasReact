import Loader from "@/components/loader";
import api from "@/config/api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EventPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`event-${id}`],
    queryFn: () => api.getEvent(Number(id)),
  });

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {JSON.stringify(data)}
      </Loader>
    </MapLayout>
  );
}
