import { useSuspenseQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'

import { EventItem } from '@/components/molecules/EventItem'
import { List } from '@/components/molecules/List'
import { isSoon } from '@/components/molecules/EventSoon'
import { EventSlim } from '@/types'
import api from '@/config/api'
import i18n from '@/config/i18n'

interface DynamicProps {
  latitude: number
  longitude: number
  onlineOnly?: boolean
}

function calculateOrder(event: EventSlim) {
  let order = event.distance || 100

  if (i18n.resolvedLanguage != event.languageCode) order *= 2
  if (isSoon(DateTime.fromJSDate(event.nextDate), event.online)) order *= 0.5
  if (event.online) order *= 1.5

  return order
}

export function DynamicEventsList({ latitude, longitude, onlineOnly = false }: DynamicProps) {
  const { data: events } = useSuspenseQuery({
    // Latitude and Longitude are rounded to reduce re-fetching when the map is moved.
    queryKey: ['events', latitude.toFixed(2), longitude.toFixed(2), onlineOnly],
    queryFn: () =>
      api.getEvents(latitude, longitude, onlineOnly).then((data) => {
        return data.sort((a, b) => {
          return calculateOrder(a) - calculateOrder(b)
        })
      }),
    //placeholderData: keepPreviousData,
  })

  return <EventsList events={events} />
}

interface Props {
  events: EventSlim[]
}

export function EventsList({ events }: Props) {
  return (
    <List>
      {events.map((event, _index, _arr) => (
        <EventItem key={event.id} event={event} />
      ))}
    </List>
  )
}
