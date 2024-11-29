import AreaList from "@/components/list/areas";
import MapLayout from "@/layouts/map";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import Loader from "@/components/loader";
import RegionList from "@/components/list/regions";

export default function CountryPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`country-${id}`],
    queryFn: () => api.getCountry(Number(id)),
  });

  return (
    <MapLayout>
      <h1 className="text-2xl font-bold text-center bg-white p-2">
        {data?.label}
      </h1>
      <Loader isLoading={isLoading} error={error}>
        {data?.regions.length > 0 ?
          <RegionList regions={data?.regions || []} /> :
          <AreaList areas={data?.areas || []} />}
      </Loader>
    </MapLayout>
  );
}
