import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import { SearchBar } from '@/components/molecules'
import { EventsList } from '@/components/organisms'
import { Panel } from '@/components/molecules'
import api from '@/config/api'
import { useMapbox } from '@/hooks/use-mapbox'

function VenuePanel({ slug }: { slug: string }) {
  const { moveMap } = useMapbox()
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  const { data: venue } = useSuspenseQuery({
    queryKey: ['venue', slug],
    queryFn: () => api.getVenue(slug),
  })

  useEffect(() => {
    if (venue.events.length < 2) {
      navigate(venue.parentPath ?? '/search', { replace: true })
    }
  }, [venue, navigate])

  useEffect(() => {
    if (venue.center) {
      moveMap({ center: venue.center, zoom: 13 })
    }
  }, [venue, moveMap])

  return (
    <>
      <Helmet>
        <title>{t('venues.title', { venue: venue.name })}</title>
        <meta
          content={t('venues.description', { count: venue.events.length, venue: venue.name })}
          name="description"
        />
      </Helmet>
      <SearchBar backHref={venue.parentPath ?? undefined} header={venue.name} />
      <EventsList events={venue.events} />
    </>
  )
}

export default function VenuePage() {
  let { slug } = useParams()

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel mapWindow={240}>
      <VenuePanel slug={slug || ''} />
    </Panel>
  )
}
