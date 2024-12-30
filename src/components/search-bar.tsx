import React, { useCallback, useRef } from 'react';
import { OnlineIcon, LeftArrowIcon, DownArrowIcon, SearchIcon, CloseIcon } from "@/components/icons";
import SearchBox from "@/components/mapbox/search";
import { GeocodeFeature } from '@mapbox/search-js-core';
import { useNavigate } from "react-router";
import { Chip } from "@nextui-org/react";
import { useSearchState } from '@/config/store';
import { useTranslation } from 'react-i18next';
import { useBreakpoint } from '@/config/responsive';

interface Props {
  onSelect?: (value: GeocodeFeature) => void;
  header?: string;
  returnLink?: string;
  filterable?: boolean;
  eventCount?: number;
}

export default function SearchBar({
  onSelect,
  header,
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
    navigate("/");
  }, [onSelect, navigate]);

  const listingRef = useRef<HTMLDivElement>(null);
  const executeScroll = useCallback(() => {
    const elementRect = listingRef.current?.getBoundingClientRect();
    if (!elementRect) return;

    const scrollTop = elementRect.top - elementRect.height + document.documentElement.scrollTop
    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  }, [listingRef])
  
  return (
    <div className="sticky top-0 z-10 p-4 pb-3 shadow-lg shadow-background border-b-1.5 border-default-300">
      <div className="flex flex-row gap-2 items-center">
        {returnLink &&
          <LeftArrowIcon size={32} onClick={() => navigate(returnLink)} />}

        <div className="flex-grow">
          {isSearching || !header ?
            <SearchBox onSelect={handleSelect} />
            : <>
              <div className="px-3 text-lg font-bold">{header}</div>
              <div className="px-3 text-md">{t('free_meditation_classes')}</div>
            </>}
        </div>
        {header && (isSearching ?
          <CloseIcon size={24} onClick={() => setIsSearching(false)} /> :
          <SearchIcon size={24} onClick={() => setIsSearching(true)} />)}
      </div>
      {filterable && <Chip
          color={onlineOnly ? "secondary" : "primary"}
          variant={onlineOnly ? "shadow" : "light"}
          radius="sm"
          size="sm"
          classNames={{
            base: "mt-2 hover:opacity-hover cursor-pointer",
            content: "uppercase font-bold"
          }}
          onClick={() => setOnlineOnly(!onlineOnly)}
          startContent={<OnlineIcon className='mr-0.5' />}
        >
          {t('show_online_classes')}
        </Chip>}
      {!isMd && eventCount &&
        <div ref={listingRef} className="mt-2 text-center text-sm font-semibold uppercase leading-snug">
          <span className="hover:underline cursor-pointer" onClick={executeScroll}>
            {eventCount} {t('events')}
            <br />
            <DownArrowIcon className='inline -mt-1' />
          </span>
        </div>}
    </div>
  );
}