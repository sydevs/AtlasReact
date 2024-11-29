import { Region } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/link";

interface Props {
  region: Region;
}

export default function regionItem({ region }: Props) {
  return (
    <Link href={`/region/${region.id}`} className="block backdrop-blur-lg backdrop-saturate-150 bg-background/70 hover:bg-background/50">
      <li key={region.id} className="p-5 flex flex-row items-center">
        <div className="flex-grow">{region.name}</div>
        <div className="w-4">{region.eventIds.length}</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}