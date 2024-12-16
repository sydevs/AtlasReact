import { Link, useDisclosure } from "@nextui-org/react";
import createDOMPurify from 'dompurify'
import EmblaCarousel from "@/components/carousel";
import Registration from "@/components/event/registration";
import { SignupIcon, ShareIcon, DirectionsIcon } from "@/components/icons";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Event } from "@/types";
import ShareModal from "./share";
import i18n from "@/config/i18n";

const DOMPurify = createDOMPurify(window)

type Props = {
  event: Event;
};

function getTime(time: string, timeZone: string) {
  const date = new Date(time);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  return date.toLocaleTimeString(i18n.resolvedLanguage, { hour: 'numeric', minute: '2-digit', timeZone });
}

export default function EventDetails({ event } : Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation('events');
  const registrationRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => registrationRef.current?.scrollIntoView({ behavior: 'smooth' })    

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
      <p className="text-sm mb-1">{event.location.address}</p>
      <p className="text-xs uppercase">
        {t(`recurrence.${event.timing.recurrence}`, { weekday: event.timing.firstDate.toLocaleDateString(i18n.resolvedLanguage, { weekday: 'long' }) })}
      </p>
      <p className="text-xs font-medium">
        {event.timing.localEndTime ? 
          `${getTime(event.timing.localStartTime, event.timing.timeZone)} - ${getTime(event.timing.localEndTime, event.timing.timeZone)}` :
          getTime(event.timing.localStartTime, event.timing.timeZone)}
      </p>
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
        <Registration event={event} onShareOpen={onOpen} />
      </div>
      <ShareModal isOpen={isOpen} onOpenChange={onOpenChange} event={event} />
    </div>
  );
}
