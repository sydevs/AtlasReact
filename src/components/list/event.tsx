import { Event } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/link";

interface Props {
  event: Event;
}

export default function EventItem({ event }: Props) {
  return (
    <Link href={`/event/${event.id}`} className="block bg-blur-hover">
      <li key={event.id} className="p-4 flex flex-row items-center">
        <div className="flex-grow">{event.label}</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}