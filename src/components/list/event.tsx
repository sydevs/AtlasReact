import { EventSlim } from "@/types";
import { RightArrowIcon } from "../icons";
import { Link } from "@nextui-org/react";
import Chip from "@/components/base/chip";
import { useMemo } from "react";
import { EventTime } from "../event/time";
import { EventSoonChip } from "../event/soon";
import { DateTime } from "luxon";
import useLocale from "@/hooks/use-locale";
import { useTranslation } from "react-i18next";

interface Props {
  event: EventSlim;
}

export default function EventItem({ event }: Props) {
  const { t } = useTranslation('events');
  const { locale, languageNames } = useLocale();

  const nextDate = useMemo(() => DateTime.fromJSDate(event.nextDate), [event.nextDate]);

  return (
    <Link href={event.path} className="block px-6 text-inherit transition-colors hover:bg-primary-10">
      <li key={event.id} className="flex flex-row py-5 items-center border-b border-divider">
        <div className="flex flex-grow flex-col gap-1">
          <div className="font-semibold text-lg leading-tight">
            {event.label}
          </div>
          <div className="text-sm leading-tight">
            {event.online ? t('details.hosted_from', { city: event.address }) : event.address}
          </div>
          <div className="text-xs uppercase">
            {event.recurrenceType ? 
              t(`recurrence.${event.recurrenceType}`, { weekday: nextDate.toLocaleString({ weekday: 'long' }) }) :
              t('details.contact_for_timing')}
          </div>
          <div className="text-xs text-gray-500">
            <EventTime
              nextDate={nextDate}
              duration={event.duration}
              timeZone={event.online ? DateTime.local().zoneName : event.timeZone}
              showTimeZone={event.online}
              delay={500}
            />
          </div>
          <div className="flex mt-1 gap-1">
            {event.firstDate &&
              <EventSoonChip firstDate={event.firstDate} online={event.online} />}
            {event.online &&
              <Chip>{t('details.online')}</Chip>}
            {event.languageCode.split('-')[0] !== locale.split('-')[0] &&
              <Chip color="secondary">{languageNames.of(event.languageCode)}</Chip>}
          </div>
        </div>
        <div className="text-right font-semibold ml-4 text-sm max-w-24">
          {t('details.more_info')}
        </div>
        <RightArrowIcon />
      </li>
    </Link>
  );
}