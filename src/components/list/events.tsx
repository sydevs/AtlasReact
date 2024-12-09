import { useQuery } from "@tanstack/react-query";
import { EventPreview } from "@/types";
import api from "@/config/api";
import gql_api from "@/config/graphql-api";
import EventItem from "./event";
import Loader from "../loader";

interface LatLngProps {
  latitude: number;
  longitude: number;
}

export function DynamicEventsList({ latitude, longitude }: LatLngProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events', latitude, longitude],
    queryFn: () => api.getEvents(latitude, longitude),
  });

  return (
    <Loader isLoading={isLoading} error={error}>
      <EventsList events={data || []} />
    </Loader>
  );
}

interface IdsProps {
  eventIds: number[];
}

export function StaticEventsList({ eventIds }: IdsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events', eventIds],
    queryFn: () => gql_api.findManyEvents(eventIds),
  });

  return (
    <Loader isLoading={isLoading} error={error}>
      <EventsList events={data || []} />
    </Loader>
  );
}

interface Props {
  events: EventPreview[];
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