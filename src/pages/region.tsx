import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { bboxPolygon } from '@turf/bbox-polygon'
import { useTranslation } from 'react-i18next'

import { SearchBar } from '@/components/molecules'
import { List, RegionCard } from '@/components/molecules'
import { Panel } from '@/components/atoms'
import { useViewState } from '@/config/store'
import api from '@/config/api'
import { useMapbox } from '@/hooks/use-mapbox'

function RegionPanel({ slug }: { slug: string }) {
  const { fitBounds } = useMapbox()
  const { t } = useTranslation('common')
  const setBoundary = useViewState((s) => s.setBoundary)
  const { data: region } = useSuspenseQuery({
    queryKey: ['region', slug],
    queryFn: () => api.getRegion(slug),
  })

  useEffect(() => {
    if (region.bounds) {
      setBoundary(bboxPolygon(region.bounds))
      fitBounds(region.bounds)
    } else {
      setBoundary(undefined)
    }
  }, [region, fitBounds, setBoundary])

  return (
    <>
      <Helmet>
        <title>{t('locations.title', { location: region.name })}</title>
        <meta
          content={t('locations.description', { count: region.eventCount, location: region.name })}
          name="description"
        />
      </Helmet>
      <SearchBar backHref={region.parentPath ?? undefined} header={region.name} />
      <List>
        {region.areas
          .filter((area) => area.eventCount > 0)
          .map((area) => (
            <RegionCard
              key={area.id}
              count={area.eventCount}
              href={area.path}
              label={area.name}
              subtitle={area.subtitle}
            />
          ))}
      </List>
    </>
  )
}

export default function RegionPage() {
  let { slug } = useParams()

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel>
      <RegionPanel slug={slug || ''} />
    </Panel>
  )
}
