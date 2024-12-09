import { ListHeader } from "@/components/list";
import Loader from "@/components/loader";
import api from "@/config/graphql-api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EventPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api.getEvent(Number(id)),
  });

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data && <ListHeader title={data.label} returnLink={`/${data.location.type.toLowerCase()}/${data.location.id}`} />}
        <div className="bg-panel p-5">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </Loader>
    </MapLayout>
  );
}
