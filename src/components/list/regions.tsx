import { Region } from "@/types";
import RegionItem from "../items/region";

interface Props {
  regions: Region[];
}

export default function RegionList({ regions }: Props) {
  return (
    <ul>
      {regions.map((region: Region) => (
        <RegionItem key={region.id} region={region} />
      ))}
    </ul>
  );
}