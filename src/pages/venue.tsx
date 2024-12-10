import Loader from "@/components/loader";
import api from "@/config/graphql-api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "@/components/search-bar";
import { StaticEventsList } from "@/components/list";
import { useEffect } from "react";

export default function VenuePage() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['venue', id],
    queryFn: () => api.getVenue(Number(id))
  });

  useEffect(() => {
    if (data && data.eventIds.length < 2) {
      navigate(`/area/${data.parentId}`, { replace: true });
    }
  }, [data, navigate]);

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
