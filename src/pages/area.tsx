import Loader from "@/components/loader";
import EventList from "@/components/list/events";
import api from "@/config/api";
import MapLayout from "@/layouts/map";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function AreaPage() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`area-${id}`],
    queryFn: () => api.getArea(Number(id)),
  });

  console.log('area', data)
  return (
    <MapLayout>
      <h1 className="text-2xl font-bold text-center bg-white p-2">
        {data?.name}
      </h1>
      <Loader isLoading={isLoading} error={error}>
        <EventList eventIds={data?.eventIds || []} />
      </Loader>
    </MapLayout>
  );
}
