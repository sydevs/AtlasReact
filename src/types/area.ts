import { EventSlim } from "./event";

export type AreaCore = {
  id: number;
  label: string;
};

export type AreaSlim = {
  eventCount: number;
} & AreaCore;

export type Area = {
  parentId: number;
  parentType: string;
  events: EventSlim[];
} & AreaCore;
