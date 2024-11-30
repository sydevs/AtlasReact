import MapLayout from "@/layouts/map";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import ListHeader from "@/components/list/header";
import { Area, Region } from "@/types";
import { ListItem } from "@/components/list";

export default function CountryPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`country-${id}`],
    queryFn: () => api.getCountry(Number(id)),
  });

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <ListHeader title={data.label} returnLink="/" />
            <ul>
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
