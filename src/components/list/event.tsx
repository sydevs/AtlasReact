import { EventSlim } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/react";
import Chip from "@/components/base/chip";
import { useNavigationState, useViewState } from "@/config/store";
import { useLocation } from "react-router";
import { useCallback } from "react";
import { useShallow } from 'zustand/react/shallow'
import { EventTime } from "../event/details";
import { DateTime } from "luxon";

interface Props {
  event: EventSlim;
}

export default function EventItem({ event }: Props) {
  const location = useLocation();
  const { zoom, latitude, longitude } = useViewState(
    useShallow((s) => ({ zoom: s.zoom, latitude: s.latitude, longitude: s.longitude })),
  )
  const setNavigationState = useNavigationState(s => s.setNavigationState);

  const handlePress = useCallback(() => {
    setNavigationState({
      returnPath: location.pathname,
      returnViewState: { zoom, latitude, longitude },
    });
  }, [location, zoom, latitude, longitude, setNavigationState]);

  console.log('event time', event.id, typeof event.nextDate)
  console.log('event time', event.id, event.nextDate.toISOString(), DateTime.fromJSDate(event.nextDate))
  return (
    <Link href={`/event/${event.id}`} onPress={handlePress} className="block bg-panel-hover after:border-b after:border-divider after:mx-6 after:block text-inherit">
      <li key={event.id} className="flex flex-row py-5 px-6 items-center">
        <div className="flex flex-grow flex-col gap-1">
          <div className="font-semibold text-lg leading-tight">{event.label}</div>
          <div className="text-sm leading-tight">{event.address}</div>
          <div className="text-xs uppercase">{event.recurrence}</div>
          <div className="text-xs text-gray-500">
            <EventTime
              nextDate={DateTime.fromJSDate(event.nextDate)}
              duration={event.duration}
              timeZone={event.online ? DateTime.local().zoneName : event.timeZone}
            />
          </div>
          <div className="mt-1">
            {event.online && <Chip>Online</Chip>}
            {/*event.languageCode && <Chip>{event.languageName}</Chip>*/}
          </div>
        </div>
        <div className="text-right font-semibold ml-4 text-sm text-nowrap">More info</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}