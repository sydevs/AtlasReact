import api from "@/config/graphql-api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "@/components/loader";
import ListHeader from "@/components/list/header";
import { Area } from "@/types";
import { ListItem } from "@/components/list";

export default function RegionPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`region-${id}`],
    queryFn: () => api.getRegion(Number(id)),
  });

  return (
    <MapLayout>
      <Loader isLoading={isLoading} error={error}>
        {data &&
          <>
            <ListHeader title={data.name} returnLink={`/${data.parentType.toLowerCase()}/${data.parentId}`} />
            <ul>
              {data.areas.map((area: Area) => (
                <ListItem key={area.id} label={area.name} count={area.eventCount} link={`/area/${area.id}`} />
              ))}
            </ul>
          </>}
      </Loader>
    </MapLayout>
  );
}
