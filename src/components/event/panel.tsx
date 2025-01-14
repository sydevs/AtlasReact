import Chip from "@/components/base/chip";
import createDOMPurify from 'dompurify'
import { useTranslation } from "react-i18next";
import { Event } from "@/types";
import { EventSoonChip } from "./soon";
import useLocale from "@/hooks/use-locale";
import { RegistrationButton } from "./registration";
import EventImages from "./images";
import { ShareButton } from "./share";
import { EventContactDetails, EventLocationDetails, EventTimingDetails } from "./details";

const DOMPurify = createDOMPurify(window)

type EventPanelProps = {
  event: Event;
};

export default function EventPanel({ event } : EventPanelProps) {
  const { t } = useTranslation('events');
  const { locale, languageNames } = useLocale();
  
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <EventImages images={event.images} />
      </div>
      <div className="flex flex-col gap-3 px-8 pt-3 pb-12">
        <h1 className={`
          text-[1.5rem] font-semibold leading-7 tracking-wide
          ${event.images.length > 0 ? '' : 'pl-5 -mt-0.5'}
        `}>
          {event.label}
        </h1>
        <div className="flex gap-1">
          {event.timing &&
            <EventSoonChip firstDate={event.timing.firstDate} online={event.online} />}
          {event.online &&
            <Chip>{t('details.online')}</Chip>}
          {event.languageCode != locale &&
            <Chip color="secondary">{languageNames.of(event.languageCode)}</Chip>}
        </div>
        {event.descriptionHtml &&
          <div
            className="flex flex-col gap-2 my-2 colored-links"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event.descriptionHtml, {
                USE_PROFILES: { html: true },
                ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'del', 'br'],
                ALLOWED_ATTR: ['href'],
                ADD_ATTR: ['target'],
              })
            }}
          />}
        {event.registration &&
          <div className="flex-center-x gap-1">
            <RegistrationButton event={event} className="flex-grow-[3]" />
            <ShareButton event={event} className="flex-grow" />
          </div>}
        <div className="mt-5 flex flex-col gap-4">
          {event.contact && !event.timing &&
            <EventContactDetails contact={event.contact} isHighlighted />}

          {event.timing &&
            <EventTimingDetails timing={event.timing} convertTimeZone={event.online} />}
          
          {event.location &&
            <EventLocationDetails location={event.location} />}
          
          {event.contact && event.timing &&
            <EventContactDetails contact={event.contact} />}
        </div>
      </div>
    </>
  );
}
