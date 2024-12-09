import Loader from "@/components/loader";
import api from "@/config/graphql-api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ListHeader, StaticEventsList } from "@/components/list";

export default function AreaPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`area-${id}`],
    queryFn: () => api.getArea(Number(id)),
  });

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <ListHeader title={data.name} returnLink={`/${data.parentType.toLowerCase()}/${data.parentId}`} />
            <StaticEventsList eventIds={data.eventIds || []} />
          </>}
      </Loader>
    </MapLayout>
  );
}
