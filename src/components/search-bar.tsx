import React from 'react';
import { OnlineCallIcon } from "@/components/icons";
import { Tooltip } from "@nextui-org/tooltip";
import SearchBox from "@/components/mapbox/search";
import { Button } from "@nextui-org/button";
import { GeocodeFeature } from '@mapbox/search-js-core';

interface Props {
  onSelect: (value: GeocodeFeature) => void;
}

export default function SearchBar({ onSelect }: Props) {
  const [online, setOnline] = React.useState(true);

  return (
    <div className="p-4 z-50 relative flex flex-row gap-1 items-center shadow-lg bg-background shadow-background">
      <div className="flex-grow">
        <SearchBox onSelect={onSelect} />
      </div>
      <Tooltip
        color={online ? "primary" : "secondary"}
        content={(online ? "Showing" : "Show") + " online classes only"}
        delay={1000}
        placement="left"
      >
        <Button isIconOnly
          color={online ? "primary" : "secondary"}
          variant={online ? "shadow" : "faded"}
          radius="full"
          aria-label="Like"
          onClick={() => setOnline(!online)}
        >
          <OnlineCallIcon width={24} height={24} />
        </Button>
      </Tooltip>
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