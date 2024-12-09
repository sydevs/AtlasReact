import Loader from "@/components/loader";
import api from "@/config/graphql-api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { StaticEventsList } from "@/components/list";
import SearchBar from "@/components/search-bar";

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
            <SearchBar onSelect={value => console.log(value)} header={data.name} returnLink={`/${data.parentType.toLowerCase()}/${data.parentId}`} />
            <StaticEventsList eventIds={data.eventIds || []} />
          </>}
      </Loader>
    </MapLayout>
  );
}
