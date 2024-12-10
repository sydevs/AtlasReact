import { EventSlim } from "./event";

export type VenueCore = {
  id: number;
  label: string;
};

export type VenueSlim = {
  eventCount: number;
} & VenueCore;

export type Venue = {
  parentId: number;
  parentType: string;
  events: EventSlim[];
} & VenueCore;
