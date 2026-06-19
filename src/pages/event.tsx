import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from '@nextui-org/react'
import { lazy } from 'react'

import api from '@/config/api'
import { Panel } from '@/components/atoms'
import { useViewState } from '@/config/store'
import { EventMetadata } from '@/components/molecules'
import { UpArrowIcon } from '@/components/atoms'
import { useMapbox } from '@/hooks/use-mapbox'
import { regionPath } from '@/lib/shape'

const EventPanelContent = lazy(() =>
  import('@/components/organisms/EventPanel').then((m) => ({ default: m.EventPanel })),
)

function EventPanel({ eventId }: { eventId: number }) {
  const { mapbox, moveMap } = useMapbox()
  const setMapSelection = useViewState((s) => s.setSelection)
  const { data: event } = useSuspenseQuery({
    queryKey: ['event', eventId],
    queryFn: () => api.getEvent(Number(eventId)),
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!mapbox) return

    const { latitude, longitude } = event.address ?? {}

    if (latitude != null && longitude != null) {
      setMapSelection({ latitude, longitude, approximate: event.eventType === 'online' })
      moveMap({ center: [longitude, latitude], zoom: event.eventType === 'online' ? 7 : 15 })
    }

    return () => {
      setMapSelection(null)
    }
  }, [event, mapbox])

  // Back-button target: the event's city/center region page.
  const parentPath = regionPath(event.region.level, event.region.slug)

  return (
    <>
      <Link
        className="text-3xl absolute top-5 left-2.5 z-20 bg-background rounded hover:opacity-100 hover:bg-primary-50 transition-colors"
        href={parentPath}
      >
        <UpArrowIcon className="text-lg" size={32} />
      </Link>
      <EventMetadata event={event} />
      <EventPanelContent event={event} />
    </>
  )
}

export default function EventPage() {
  let { id } = useParams()

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel mapWindow={180} width={467}>
      <EventPanel eventId={Number(id)} />
    </Panel>
  )
}
