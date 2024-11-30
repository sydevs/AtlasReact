import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Country = {
  id: number;
  label: string;
  regions: Region[] | undefined;
  areas: Area[] | undefined;
  eventCount: number;
};

export type Region = {
  id: number;
  parentId: number;
  parentType: string;
  name: string;
  areas: Area[];
  eventCount: number;
};

export type Area = {
  id: number;
  parentId: number;
  parentType: string;
  name: string;
  eventIds: number[];
  eventCount: number;
};

export type Venue = {
  id: number;
  parentId: number;
  parentType: string;
  name: string;
  eventIds: number[];
};

export type Event = {
  id: number;
  areaId: number;
  label: string;
  venue: Venue;
};
