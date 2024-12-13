import React, { useCallback } from 'react';
import { OnlineIcon, LeftArrowIcon, SearchIcon, CloseIcon } from "@/components/icons";
import SearchBox from "@/components/mapbox/search";
import { GeocodeFeature } from '@mapbox/search-js-core';
import { useNavigate } from "react-router";
import { Chip } from "@nextui-org/react";

interface Props {
  onSelect: (value: GeocodeFeature) => void;
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
  const [isOnline, setIsOnline] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(!header);

  const handleSelect = useCallback((value: GeocodeFeature) => {
    onSelect(value);
    navigate("/");
  }, [onSelect, navigate]);

  return (
    <div className="p-4 relative bg-background shadow-lg shadow-background">
      <div className="flex flex-row gap-2 items-center">
        {returnLink &&
          <LeftArrowIcon size={32} onClick={() => navigate(returnLink)} />}

        <div className="flex-grow">
          {isSearching || !header ?
            <SearchBox onSelect={handleSelect} />
            : <>
              <div className="px-3 text-lg font-bold">{header}</div>
              <div className="px-3 text-md">Free Meditation Classes</div>
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
          color={isOnline ? "secondary" : "primary"}
          variant={isOnline ? "shadow" : "light"}
          radius="sm"
          size="sm"
          classNames={{
            base: "mt-2 hover:opacity-hover cursor-pointer",
            content: "uppercase font-bold"
          }}
          onClick={() => setIsOnline(!isOnline)}
          startContent={<OnlineIcon />}
        >Online classes</Chip>}
    </div>
  );
}