import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { bboxPolygon } from '@turf/bbox-polygon'
import { useTranslation } from 'react-i18next'

import { useViewState } from '@/config/store'
import { Panel } from '@/components/atoms'
import { SearchBar } from '@/components/molecules'
import { EventsList } from '@/components/organisms'
import api from '@/config/api'
import { useMapbox } from '@/hooks/use-mapbox'

function AreaPanel({ slug }: { slug: string }) {
  const { fitBounds } = useMapbox()
  const { t } = useTranslation('common')
  const setBoundary = useViewState((s) => s.setBoundary)
  const { data: area } = useSuspenseQuery({
    queryKey: ['area', slug],
    queryFn: () => api.getArea(slug),
  })

  useEffect(() => {
    if (area.bounds) {
      setBoundary(bboxPolygon(area.bounds))
      fitBounds(area.bounds)
    } else {
      setBoundary(undefined)
    }
  }, [area, fitBounds, setBoundary])

  return (
    <>
      <Helmet>
        <title>{t('locations.title', { location: area.name })}</title>
        <meta
          content={t('locations.description', { count: area.eventCount, location: area.name })}
          name="description"
        />
      </Helmet>
      <SearchBar
        backHref={area.parentPath ?? undefined}
        header={area.name}
        subheader={area.subtitle || undefined}
      />
      <EventsList events={area.events} />
    </>
  )
}

export default function AreaPage() {
  let { slug } = useParams()

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel>
      <AreaPanel slug={slug || ''} />
    </Panel>
  )
}
