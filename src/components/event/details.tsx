import { Link, useDisclosure } from "@nextui-org/react";
import createDOMPurify from 'dompurify'
import EmblaCarousel from "@/components/carousel";
import RegistrationSection from "@/components/event/registration-section";
import { SignupIcon, ShareIcon, DirectionsIcon } from "@/components/icons";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Event } from "@/types";
import ShareModal from "./share";
import i18n from "@/config/i18n";
import { TimezoneChip } from "@/components/base/chip";
import { DateTime } from "luxon";

const DOMPurify = createDOMPurify(window)

type EventTimeProps = {
  nextDate: DateTime;
  duration: number | null;
  timeZone: string;
};

export function EventTime({ nextDate, duration, timeZone } : EventTimeProps) {
  const times = [nextDate];
  if (duration) {
    times.push(nextDate.plus({ hours: duration }));
  }

  return <>
    {times.map((time) => time.setZone(timeZone).toLocaleString(DateTime.TIME_SIMPLE)).join(' - ')}
    <TimezoneChip time={nextDate.setZone(timeZone)} />
  </>;
}

type EventDetailsProps = {
  event: Event;
};

export default function EventDetails({ event } : EventDetailsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation('events');
  const registrationRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => registrationRef.current?.scrollIntoView({ behavior: 'smooth' })  

  console.log('event time', event.id, event.timing.upcomingDates[0].toISOString(), DateTime.fromJSDate(event.timing.upcomingDates[0]))
  return (
    <div className="bg-panel py-8 px-11 pb-24">
      <>
        <Link className="text-3xl absolute top-8 right-4" isBlock onClick={onOpen}>
          <ShareIcon size={18} />
        </Link>
      </>
      {event.online && event.languageCode && 
        <div className="text-xs px-2.5 py-2 border-primary border-1 rounded leading-tight ml-4 mb-2 float-right text-center">
          <div className="italic">This class is</div>
          {event.languageCode && <div className="text-primary font-bold">{event.languageCode}</div>}
          {event.online && <div className="text-secondary font-bold">Online</div>}
        </div>}
      <h1 className="text-lg font-bold mb-2">{event.label}</h1>
      <div className="text-sm mb-1">{event.location.address}</div>
      <div className="text-xs uppercase">
        {t(`recurrence.${event.timing.type}`, { weekday: event.timing.firstDate.toLocaleDateString(i18n.resolvedLanguage, { weekday: 'long' }) })}
      </div>
      <div className="text-xs font-medium">
        <EventTime
          nextDate={DateTime.fromJSDate(event.timing.upcomingDates[0])}
          duration={event.timing.duration}
          timeZone={event.online ? DateTime.local().zoneName : event.timing.timeZone}
        />
      </div>
      {event.contact.phoneNumber &&
        <Link className="text-sm hover:underline" href={`tel: ${event.contact.phoneNumber}`} target="_blank" rel="noopener noreferrer">
          tel: {event.contact.phoneNumber}
          {event.contact.phoneName && `, ${event.contact.phoneName}`}
        </Link>}
      <div className="flex flex-row gap-6 my-8 text-primary">
        <Link className="text-sm italic font-medium" onClick={executeScroll} href="#registrations">
          <SignupIcon className="mr-2" />
          {t('register')}
        </Link>
        {event.location.directionsUrl &&
          <Link className="text-sm italic font-medium" href={event.location.directionsUrl} target="_blank" rel="noopener noreferrer">
            <DirectionsIcon className="mr-2" />
            {t('get_directions')}
          </Link>}
      </div>
      {event.descriptionHtml &&
        <div className="mt-16 mb-4" dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(event.descriptionHtml, {
            USE_PROFILES: { html: true },
            ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'del', 'br'],
            ALLOWED_ATTR: ['href'],
          })
        }}></div>}
      <EmblaCarousel
        slides={event.images || []}
        options={{ containScroll: false }}
      />
      <div ref={registrationRef}>
        <RegistrationSection event={event} onShareOpen={onOpen} />
      </div>
      <ShareModal isOpen={isOpen} onOpenChange={onOpenChange} event={event} />
    </div>
  );
}
