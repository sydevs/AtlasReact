import Loader from "@/components/loader";
import api from "@/config/api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { EventsList } from "@/components/list";
import SearchBar from "@/components/search-bar";

export default function AreaPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['area', id],
    queryFn: () => api.getArea(Number(id)),
  });

  console.log('area', data)
  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar onSelect={value => console.log(value)} header={data.label} returnLink={`/${data.parentType}/${data.parentId}`} />
            <EventsList events={data.events} />
          </>}
      </Loader>
    </MapLayout>
  );
}
