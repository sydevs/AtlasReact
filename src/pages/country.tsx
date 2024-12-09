import MapLayout from "@/layouts/map";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/graphql-api";
import Loader from "@/components/loader";
import { Area, Region } from "@/types";
import { ListItem } from "@/components/list";
import SearchBar from "@/components/search-bar";

export default function CountryPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['country', id],
    queryFn: () => api.getCountry(Number(id)),
  });

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <SearchBar onSelect={value => console.log(value)} header={data.label} returnLink="/" />
            <ul className="overflow-y-auto">
              {data.regions?.map((region: Region) => (
                <ListItem key={region.id} label={region.name} count={region.eventCount} link={`/region/${region.id}`} />
              ))
              || data.areas?.map((area: Area) => (
                <ListItem key={area.id} label={area.name} count={area.eventCount} link={`/area/${area.id}`} />
              ))}
            </ul>
          </>}
      </Loader>
    </MapLayout>
  );
}
