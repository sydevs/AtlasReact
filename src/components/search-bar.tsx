import React, { useCallback } from 'react';
import { OnlineIcon, LeftArrowIcon, SearchIcon, CloseIcon } from "@/components/icons";
import SearchBox from "@/components/mapbox/search";
import { GeocodeFeature } from '@mapbox/search-js-core';
import { useNavigate } from "react-router";
import { Chip } from "@nextui-org/react";
import { useSearchState } from '@/config/store';
import { useTranslation } from 'react-i18next';

interface Props {
  onSelect?: (value: GeocodeFeature) => void;
  header?: string;
  returnLink?: string;
  filterable?: boolean;
}

export default function SearchBar({
  onSelect,
  header,
  returnLink,
  filterable = false,
}: Props) {
  let navigate = useNavigate();
  const { t } = useTranslation('common');
  const onlineOnly = useSearchState(s => s.onlineOnly);
  const setOnlineOnly = useSearchState(s => s.setOnlineOnly);
  const [isSearching, setIsSearching] = React.useState(!header);

  const handleSelect = useCallback((value: GeocodeFeature) => {
    onSelect && onSelect(value);
    navigate("/");
  }, [onSelect, navigate]);

  return (
    <div className="p-4 pb-3 relative bg-background shadow-lg shadow-background border-b-1.5 border-default-300">
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
        {/*
        <Geocoder
          options={{
            proximity: {
              lng: -122.431297,
              lat: 37.773972,
            },
          }}
          value={location}
          onChange={value => setLocation(value)}
          accessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
        />
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          endContent={
            <OnlineIcon className="text-2xl flex-shrink-0 pointer-events-auto cursor-pointer fill-slate-400 hover:fill-primary" />
          }
          /*endContent={
            <Tooltip showArrow={true} closeDelay={500} color="primary" content="Show online classes only" placement="left">
              <OnlineIcon className="text-2xl flex-shrink-0 pointer-events-auto fill-slate-400 hover:fill-primary" />
            </Tooltip>
          }*
          labelPlacement="outside"
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />*/}
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
    </div>
  );
}