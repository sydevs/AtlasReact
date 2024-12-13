import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EventSlim } from "@/types";
import api from "@/config/api";
import EventItem from "./event";
import Loader from "../loader";

interface DynamicProps {
  latitude: number;
  longitude: number;
}

export function DynamicEventsList({ latitude, longitude }: DynamicProps) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['events', latitude, longitude],
    queryFn: () => api.getEvents(latitude, longitude),
    placeholderData: keepPreviousData,
  });

  return (
    <Loader data={data} isLoading={isFetching} error={error}>
      <EventsList events={data || []} />
    </Loader>
  );
}

interface Props {
  events: EventSlim[];
}

export default function EventsList({ events }: Props) {
  return (
    <ul className="overflow-y-auto">
      {events.map((event, _index, _arr) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}