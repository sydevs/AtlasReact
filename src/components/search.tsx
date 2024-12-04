import React from 'react';
import { SearchIcon, OnlineCallIcon, FilledOnlineCallIcon } from "@/components/icons";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";
import { Geocoder } from "@mapbox/search-js-react";
import { SearchBox } from "@mapbox/search-js-react";

interface Props {
  online: boolean;
}

export default function Search({ online = true }: Props) {
  const [location, setLocation] = React.useState('');
  const OnlineIcon = online ? FilledOnlineCallIcon : OnlineCallIcon;

  return (
    <div className="p-4 bg-panel">
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
        }*/
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    </div>
  );
}