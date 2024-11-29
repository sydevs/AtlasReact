import { Event } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/link";

interface Props {
  event: Event;
}

export default function EventItem({ event }: Props) {
  return (
    <Link href={`/event/${event.id}`} className="block backdrop-blur-lg backdrop-saturate-150 bg-background/70 hover:bg-background/50">
      <li key={event.id} className="p-5 flex flex-row items-center">
        <div className="flex-grow">{event.label}</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}