import { AreaSlim } from "./area";

export type RegionCore = {
  id: number;
  label: string;
};

export type RegionSlim = {
  eventCount: number;
} & RegionCore;

export type Region = {
  parentId: number;
  parentType: string;
  areas: AreaSlim[];
} & RegionCore;
