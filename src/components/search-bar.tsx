import React from 'react';
import { OnlineIcon, LeftArrowIcon, SearchIcon, CloseIcon } from "@/components/icons";
import SearchBox from "@/components/mapbox/search";
import { GeocodeFeature } from '@mapbox/search-js-core';
import Toggle from "@/components/base/toggle";
import { useNavigate } from "react-router-dom";

interface Props {
  onSelect: (value: GeocodeFeature) => void;
  header?: string;
  returnLink?: string;
}

export default function SearchBar({ onSelect, header, returnLink }: Props) {
  let navigate = useNavigate();
  const [isOnline, setIsOnline] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(!header);

  return (
    <div className="p-4 h-[70px] relative flex flex-row gap-2 items-center bg-background shadow-lg shadow-background">
      {returnLink &&
        <LeftArrowIcon size={32} onClick={() => navigate(returnLink)} />}
      
      <div className="flex-grow">
        {isSearching || !header ?
          <SearchBox onSelect={onSelect} />
          : <div className="px-3 text-lg font-bold">{header}</div>}
      </div>
      {isSearching && 
        <Toggle
          active={isOnline}
          setActive={setIsOnline}
          Icon={OnlineIcon}
          tooltip={(isOnline ? "Showing" : "Show") + " online classes only"}
          size='sm'
        />}
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
  );
}