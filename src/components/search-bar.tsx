import React, { useCallback, useRef } from 'react';
import { UpArrowIcon, DownArrowIcon, SearchIcon, CloseIcon } from "@/components/icons";
import SearchBox from "@/components/mapbox/search";
import { GeocodeFeature } from '@mapbox/search-js-core';
import { useNavigate } from "react-router";
import { Switch } from "@nextui-org/react";
import { useSearchState } from '@/config/store';
import { useTranslation } from 'react-i18next';
import { useBreakpoint } from '@/config/responsive';

interface Props {
  onSelect?: (value: GeocodeFeature) => void;
  header?: string;
  subheader?: string;
  returnLink?: string;
  filterable?: boolean;
  eventCount?: number;
}

export default function SearchBar({
  onSelect,
  header,
  subheader,
  returnLink,
  eventCount,
  filterable = false,
}: Props) {
  let navigate = useNavigate();
  const { t } = useTranslation('common');
  const { isMd } = useBreakpoint("md");
  const onlineOnly = useSearchState(s => s.onlineOnly);
  const setOnlineOnly = useSearchState(s => s.setOnlineOnly);
  const [isSearching, setIsSearching] = React.useState(!header);

  const handleSelect = useCallback((value: GeocodeFeature) => {
    onSelect && onSelect(value);
    const searchParams = new URLSearchParams()
    searchParams.set('q', value.properties.full_address)
    value.properties.bbox && searchParams.set('bbox', value.properties.bbox?.toString())
    console.log(value.properties.coordinates)
    searchParams.set('center', `${value.properties.coordinates.longitude},${value.properties.coordinates.latitude}`)
    navigate(`/?${searchParams.toString()}`);
  }, [onSelect, navigate]);

  const searchBarRef = useRef<HTMLDivElement>(null);
  const executeScroll = useCallback(() => {
    const elementRect = searchBarRef.current?.getBoundingClientRect();
    if (!elementRect) return;

    const scrollTop = elementRect.top + document.documentElement.scrollTop
    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  }, [searchBarRef])
  
  return (
    <div ref={searchBarRef} className="sticky top-0 z-10 p-4 pb-3 bg-background border-b-1.5 border-default-300">
      <div className="flex flex-row gap-2 items-center">
        {returnLink &&
          <UpArrowIcon size={32} onClick={() => navigate(returnLink)} />}

        <div className="flex-grow">
          {isSearching || !header ?
            <SearchBox onSelect={handleSelect} />
            : <>
              <div className="px-3 text-lg font-bold">{header}</div>
              <div className="px-3 text-md">{subheader || t('free_meditation_classes')}</div>
            </>}
        </div>
        {header && (isSearching ?
          <CloseIcon size={24} onClick={() => setIsSearching(false)} /> :
          <SearchIcon size={24} onClick={() => setIsSearching(true)} />)}
      </div>
      {filterable && <Switch
        color="primary"
        size="sm"
        className="mt-2 hover:opacity-hover"
        isSelected={onlineOnly}
        onValueChange={setOnlineOnly}
      >
        <div className="font-semibold text-content1-foreground">
          {t(onlineOnly ? 'showing_online_classes' : 'show_online_classes')}
        </div>
      </Switch>}
      {!isMd && eventCount &&
        <div className="mt-2 text-center text-sm font-semibold uppercase leading-snug">
          <span className="hover:underline cursor-pointer" onClick={executeScroll}>
            {eventCount} {t('events')}
            <br />
            <DownArrowIcon className='inline -mt-1' />
          </span>
        </div>}
    </div>
  );
}