import React, { useCallback, useRef } from 'react'
import { GeocodeFeature } from '@mapbox/search-js-core'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Switch } from '@/components/atoms/Switch'
import { useSearchState } from '@/config/store'
import { MapSearch } from '@/components/organisms/Mapbox/MapSearch'
import { UpArrowIcon, DownArrowIcon, SearchIcon, CloseIcon } from '@/components/atoms/Icons'
import { useBreakpoint } from '@/config/responsive'

export interface SearchBarProps {
  onSelect?: (value: GeocodeFeature) => void
  header?: string
  subheader?: string
  backHref?: string
  filterable?: boolean
  eventCount?: number
}

export function SearchBar({
  onSelect,
  header,
  subheader,
  backHref,
  eventCount,
  filterable = false,
}: SearchBarProps) {
  let navigate = useNavigate()
  const { t } = useTranslation('common')
  const { isMd } = useBreakpoint('md')
  const onlineOnly = useSearchState((s) => s.onlineOnly)
  const setOnlineOnly = useSearchState((s) => s.setOnlineOnly)
  const [isSearching, setIsSearching] = React.useState(!header)

  const handleSelect = useCallback(
    (value: GeocodeFeature) => {
      onSelect && onSelect(value)
      const searchParams = new URLSearchParams()

      searchParams.set('q', value.properties.full_address)
      value.properties.bbox && searchParams.set('bbox', value.properties.bbox?.toString())
      searchParams.set(
        'center',
        `${value.properties.coordinates.longitude},${value.properties.coordinates.latitude}`,
      )
      navigate(`/search?${searchParams.toString()}`)
    },
    [onSelect, navigate],
  )

  const searchBarRef = useRef<HTMLDivElement>(null)
  const executeScroll = useCallback(() => {
    const elementRect = searchBarRef.current?.getBoundingClientRect()

    if (!elementRect) return

    const scrollTop = elementRect.top + document.documentElement.scrollTop

    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  }, [searchBarRef])

  return (
    <div
      ref={searchBarRef}
      className="sticky top-0 z-10 p-4 pb-3 bg-background border-b-2 border-gray-7 flex-center-x flex-col"
    >
      <div className="flex-center-y gap-2 w-full">
        {backHref && <UpArrowIcon size={32} onClick={() => navigate(backHref)} />}

        <div className="flex-grow">
          {isSearching || !header ? (
            <div className="py-0.5">
              <MapSearch onSelect={handleSelect} />
            </div>
          ) : (
            <>
              <div className="px-3 text-lg font-bold">{header}</div>
              <div className="px-3 text-md">{subheader || t('free_meditation_classes')}</div>
            </>
          )}
        </div>
        {header && (
          <div className="p-2">
            {isSearching ? (
              <CloseIcon size={24} onClick={() => setIsSearching(false)} />
            ) : (
              <SearchIcon size={24} onClick={() => setIsSearching(true)} />
            )}
          </div>
        )}
      </div>
      {filterable && (
        <Switch
          checked={onlineOnly}
          className="mt-2 hover:opacity-hover"
          color="primary"
          size="sm"
          onCheckedChange={setOnlineOnly}
        >
          <div className="font-semibold text-foreground">
            {t(onlineOnly ? 'showing_online_classes' : 'show_online_classes')}
          </div>
        </Switch>
      )}
      {!isMd && !!eventCount && (
        <div className="mt-2 text-center text-sm font-semibold uppercase leading-snug">
          <button className="hover:underline cursor-pointer" type="button" onClick={executeScroll}>
            {eventCount} {t('events')}
            <br />
            <DownArrowIcon className="inline -mt-1" />
          </button>
        </div>
      )}
    </div>
  )
}
