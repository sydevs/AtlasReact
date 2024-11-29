import { Area } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/link";

interface Props {
  area: Area;
}

export default function AreaItem({ area }: Props) {
  return (
    <Link href={`/area/${area.id}`} className="block backdrop-blur-lg backdrop-saturate-150 bg-background/70 hover:bg-background/50">
      <li key={area.id} className="p-5 flex flex-row items-center">
        <div className="flex-grow">{area.name}</div>
        <div className="w-4">{area.eventIds.length}</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}