import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EventSlim } from "@/types";
import { isSoon } from "@/components/event/soon";
import api from "@/config/api";
import EventItem from "./event";
import Loader from "../loader";
import i18n from "@/config/i18n";
import { DateTime } from "luxon";
import { List } from ".";

interface DynamicProps {
  latitude: number;
  longitude: number;
  onlineOnly?: boolean;
}

function calculateOrder(event: EventSlim) {
  let order = event.distance || 100
  if (i18n.resolvedLanguage != event.languageCode) order *= 2
  if (isSoon(DateTime.fromJSDate(event.nextDate), event.online)) order *= 0.5
  if (event.online) order *= 1.5
  return order
}

export function DynamicEventsList({ latitude, longitude, onlineOnly = false }: DynamicProps) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['events', latitude, longitude, onlineOnly],
    queryFn: () => api.getEvents(latitude, longitude, onlineOnly).then(data => {
      return data.sort((a, b) => {
        return calculateOrder(a) - calculateOrder(b)
      });
    }),
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
    <List>
      {events.map((event, _index, _arr) => (
        <EventItem key={event.id} event={event} />
      ))}
    </List>
  );
}