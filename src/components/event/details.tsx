import { Link, useDisclosure } from "@nextui-org/react";
import createDOMPurify from 'dompurify'
import EmblaCarousel from "@/components/carousel";
import RegistrationSection from "@/components/event/registration-section";
import { SignupIcon, ShareIcon, DirectionsIcon } from "@/components/icons";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Event } from "@/types";
import { EventTime } from "./time";
import { EventSoon } from "./soon";
import ShareModal from "./share";
import useLocale from "@/hooks/use-locale";
import { DateTime } from "luxon";

const DOMPurify = createDOMPurify(window)

type EventDetailsProps = {
  event: Event;
};

export default function EventDetails({ event } : EventDetailsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { locale, languageNames } = useLocale();
  const { t } = useTranslation('events');
  const registrationRef = useRef<HTMLDivElement>(null);

  const executeScroll = () => registrationRef.current?.scrollIntoView({ behavior: 'smooth' })  
  const nextDate = useMemo(() => DateTime.fromJSDate(event.timing.upcomingDates[0]).setLocale(locale), [event.timing.upcomingDates]);
  const firstDate = useMemo(() => DateTime.fromJSDate(event.timing.firstDate), [event.timing.firstDate]);

  return (
    <div className="bg-panel pt-16 px-6 sm:pt-8 sm:px-11 pb-24">
      <>
        <Link className="text-3xl absolute top-8 right-1.5 cursor-pointer" isBlock onClick={onOpen}>
          <ShareIcon size={18} />
        </Link>
      </>
      {(event.online || event.languageCode != locale) && 
        <div className="text-xs px-2.5 py-2 border-primary border-1 rounded leading-tight ml-4 mb-2 float-right text-center flex flex-col gap-0.5">
          <div className="italic mb-0.5">{t('details.this_class_is')}</div>
          {event.online && <div className="text-primary font-bold uppercase">{t('details.online')}</div>}
          {event.languageCode != locale && <div className="text-secondary font-bold uppercase">{languageNames.of(event.languageCode)}</div>}
        </div>}
      <h1 className="text-lg font-bold mb-2">{event.label}</h1>
      <div className="text-sm mb-1">{event.location.address}</div>
      <div className="text-xs uppercase">
        {t(`recurrence.${event.timing.type}`, { weekday: nextDate.toLocaleString({ weekday: 'long' }) })}
      </div>
      <div className="text-xs font-medium">
        <EventTime
          nextDate={nextDate}
          duration={event.timing.duration}
          timeZone={event.online ? DateTime.local().zoneName : event.timing.timeZone}
          showTimeZone={event.online}
        />
      </div>
      {event.contact.phoneNumber &&
        <Link className="text-sm hover:underline" href={`tel: ${event.contact.phoneNumber}`} target="_blank" rel="noopener noreferrer">
          {t('details.tel', { phoneNumber: event.contact.phoneNumber })}
          {event.contact.phoneName && `, ${event.contact.phoneName}`}
        </Link>}
      <div className="flex flex-row gap-6 mt-8 text-primary">
        <Link className="text-sm italic font-medium" onClick={executeScroll} href="#registrations">
          <SignupIcon className="mr-2" />
          {t('details.register')}
        </Link>
        {event.location.directionsUrl &&
          <Link className="text-sm italic font-medium" href={event.location.directionsUrl} target="_blank" rel="noopener noreferrer">
            <DirectionsIcon className="mr-2" />
            {t('details.get_directions')}
          </Link>}
      </div>
      <div className="mt-3 mb-8">
        <EventSoon firstDate={firstDate.setLocale(locale)} online={event.online} />
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
