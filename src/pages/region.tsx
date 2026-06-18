import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { bboxPolygon } from '@turf/bbox-polygon'
import { useTranslation } from 'react-i18next'

import { SearchBar } from '@/components/molecules'
import { List, ListItem } from '@/components/molecules'
import { Panel } from '@/components/atoms'
import { useViewState } from '@/config/store'
import api from '@/config/api'
import useMapbox from '@/hooks/use-mapbox'

function RegionPanel({ regionId }: { regionId: number }) {
  const { fitBounds } = useMapbox()
  const { t } = useTranslation('common')
  const setBoundary = useViewState((s) => s.setBoundary)
  const { data: region } = useSuspenseQuery({
    queryKey: ['region', regionId],
    queryFn: () => api.getRegion(regionId),
  })

  useEffect(() => {
    setBoundary(bboxPolygon(region.bounds))
    fitBounds(region.bounds)
  }, [region, fitBounds])

  return (
    <>
      <Helmet>
        <title>{t('locations.title', { location: region.label })}</title>
        <meta
          content={t('locations.description', { count: region.eventCount, location: region.label })}
          name="description"
        />
      </Helmet>
      <SearchBar
        header={region.label}
        returnLink={region.parentPath}
        onSelect={(value) => console.log(value)}
      />
      <List>
        {region.areas
          .filter((area) => area.eventCount > 0)
          .map((area) => (
            <ListItem
              key={area.id}
              count={area.eventCount}
              label={area.label}
              link={area.path}
              subtitle={area.subtitle}
            />
          ))}
      </List>
    </>
  )
}

export default function RegionPage() {
  let { id } = useParams()

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel>
      <RegionPanel regionId={Number(id)} />
    </Panel>
  )
}
