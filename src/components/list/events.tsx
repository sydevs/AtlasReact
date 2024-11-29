import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";
import EventItem from "../items/event";
import Loader from "../loader";

interface Props {
  eventIds: number[];
}

export default function AreaList({ eventIds }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`events-${eventIds}`],
    queryFn: () => api.findManyEvents(eventIds),
  });

  return (
    <Loader isLoading={isLoading} error={error}>
      <ul>
        {data?.map((event, _index, _arr) => (
          <EventItem key={event.id} event={event} />
        ))}
      </ul>
    </Loader>
  );
}