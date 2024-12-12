import { AreaSlim } from "./area";

export type RegionCore = {
  id: number;
  label: string;
  eventCount: number;
};

export type RegionSlim = {

} & RegionCore;

export type Region = {
  parentId: number;
  parentType: string;
  areas: AreaSlim[];
} & RegionCore;
