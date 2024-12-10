
export type CountryCore = {
  id: number;
  code: string;
  label: string;
};

export type CountrySlim = {
  eventCount: number;
} & CountryCore;

export type Country = {
  children: CountryChild[];
} & CountryCore;

type CountryChild = {
  id: number;
  type: string;
  label: string;
  eventCount: number;
};
