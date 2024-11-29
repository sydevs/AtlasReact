import { Country } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/link";

interface Props {
  country: Country;
}

export default function CountryItem({ country }: Props) {
  return (
    <Link href={`/country/${country.id}`} className="block backdrop-blur-lg backdrop-saturate-150 bg-background/70 hover:bg-background/50">
      <li key={country.id} className="p-5 flex flex-row items-center">
        <div className="flex-grow">{country.label}</div>
        <div className="w-4">{country.eventIds.length}</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}