
export type CountryCore = {
  id: number;
  code: string;
  label: string;
  eventCount: number;
};

export type CountrySlim = {

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
