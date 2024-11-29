import AreaList from "@/components/list/areas";
import api from "@/config/api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "@/components/loader";

export default function RegionPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`region-${id}`],
    queryFn: () => api.getRegion(Number(id)),
  });

  return (
    <MapLayout>
      <h1 className="text-2xl font-bold text-center bg-white p-2">
        {data?.name}
      </h1>
      <Loader isLoading={isLoading} error={error}>
        <AreaList areas={data?.areas || []} />;
      </Loader>
    </MapLayout>
  );
}
