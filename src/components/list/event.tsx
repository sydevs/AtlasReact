import { EventSlim } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/react";
import Chip from "@/components/base/chip";
import { useNavigationState, useViewState } from "@/config/store";
import { useLocation } from "react-router";
import { useCallback, useMemo } from "react";
import { useShallow } from 'zustand/react/shallow'
import { EventTime, EventSoon } from "../event/details";
import { DateTime } from "luxon";
import useLocale from "@/hooks/use-locale";

interface Props {
  event: EventSlim;
}

export default function EventItem({ event }: Props) {
  const location = useLocation();
  const { locale, languageNames } = useLocale();
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

  const date = useMemo(() => DateTime.fromJSDate(event.nextDate), [event.nextDate]);

  return (
    <Link href={`/event/${event.id}`} onPress={handlePress} className="block bg-panel-hover after:border-b after:border-divider after:mx-6 after:block text-inherit">
      <li key={event.id} className="flex flex-row py-5 px-6 items-center">
        <div className="flex flex-grow flex-col gap-1">
          <div className="font-semibold text-lg leading-tight">{event.label}</div>
          <div className="text-sm leading-tight">{event.address}</div>
          <div className="text-xs uppercase">{event.recurrence}</div>
          <div className="text-xs text-gray-500">
            <EventTime
              nextDate={date}
              duration={event.duration}
              timeZone={event.online ? DateTime.local().zoneName : event.timeZone}
              showTimeZone={event.online}
              delay={500}
            />
          </div>
          <div className="flex mt-1 gap-1">
            <EventSoon nextDate={date.setLocale(locale)} online={event.online} />
            
            {event.online && <Chip>Online</Chip>}
            {event.languageCode != locale && <Chip color="secondary">{languageNames.of(event.languageCode)}</Chip>}
          </div>
        </div>
        <div className="text-right font-semibold ml-4 text-sm text-nowrap">More info</div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}