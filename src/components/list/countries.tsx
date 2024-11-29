import { Country } from "@/types";
import CountryItem from "../items/country";

interface Props {
  countries: Country[];
}

export default function RegionList({ countries }: Props) {
  return (
    <ul>
      {countries.map((country: Country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}