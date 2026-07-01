import { useParams } from 'react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { bboxPolygon } from '@turf/bbox-polygon'
import { useTranslation } from 'react-i18next'

import api from '@/config/api'
import { List, RegionCard } from '@/components/molecules'
import { SearchBar } from '@/components/molecules'
import { Panel } from '@/components/atoms'
import { useViewState } from '@/config/store'
import { useLocale } from '@/hooks/use-locale'
import { useMapbox } from '@/hooks/use-mapbox'

function CountryPanel({ slug }: { slug: string }) {
  const { fitBounds } = useMapbox()
  const { t } = useTranslation('common')
  const { regionNames } = useLocale()
  const setBoundary = useViewState((s) => s.setBoundary)
  const { data: country } = useSuspenseQuery({
    queryKey: ['country', slug],
    queryFn: () => api.getCountry(slug),
  })

  useEffect(() => {
    if (country.bounds) {
      setBoundary(bboxPolygon(country.bounds))
      fitBounds(country.bounds)
    } else {
      setBoundary(undefined)
    }
  }, [country, fitBounds, setBoundary])

  const countryName = (country.countryCode && regionNames.of(country.countryCode)) || country.name

  return (
    <>
      <Helmet>
        <title>{t('locations.title', { location: countryName })}</title>
        <meta
          content={t('locations.description', { count: country.eventCount, location: countryName })}
          name="description"
        />
      </Helmet>
      <SearchBar backHref="/search" header={countryName} />
      <List>
        {country.children.map(
          (child) =>
            child.eventCount > 0 && (
              <RegionCard
                key={child.id}
                count={child.eventCount}
                href={child.path}
                label={child.name}
                subtitle={child.subtitle}
              />
            ),
        )}
      </List>
    </>
  )
}

export default function CountryPage() {
  let { slug } = useParams()

  // This wrapper is necessary because <Panel> contains an <ErrorBoundary> and <Suspense> to handle loading
  return (
    <Panel>
      <CountryPanel slug={slug || ''} />
    </Panel>
  )
}
