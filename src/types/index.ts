import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Country = {
  id: number;
  label: string;
  regions: Region[];
  areas: Area[];
  eventIds: number[];
};

export type Region = {
  id: number;
  name: string;
  areas: Area[];
  eventIds: number[];
};

export type Area = {
  id: number;
  name: string;
  eventIds: number[];
};

export type Event = {
  id: number;
  label: string;
};
