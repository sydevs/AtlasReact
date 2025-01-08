import { Link } from "@nextui-org/react";
import Chip from "@/components/base/chip";
import createDOMPurify from 'dompurify'
import { LocationIcon, AnchorIcon, SocialIcon, CallIcon } from "@/components/icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Event } from "@/types";
import { EventTime } from "./time";
import { EventSoon } from "./soon";
import useLocale from "@/hooks/use-locale";
import { DateTime } from "luxon";
import { RegistrationButton } from "./registration";
import EventImages from "./images";
import { ShareButton } from "./share";

const DOMPurify = createDOMPurify(window)

type EventPanelProps = {
  event: Event;
};

export default function EventPanel({ event } : EventPanelProps) {
  const { t } = useTranslation('events');
  const { locale, languageNames } = useLocale();
  
  const firstDate = useMemo(() => DateTime.fromJSDate(event.timing.firstDate), [event.timing.firstDate]);
  const nextDate = useMemo(() => DateTime.fromJSDate(event.timing.upcomingDates[0]).setLocale(locale), [event.timing.upcomingDates]);

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <EventImages images={event.images} />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h1 className={`
          text-[1.5rem] font-semibold leading-7 tracking-wide
          ${event.images.length > 0 ? '' : 'pl-5 -mt-0.5'}
        `}>
          {event.label}
        </h1>
        <div className="flex gap-1">
          <EventSoon firstDate={firstDate.setLocale(locale)} online={event.online} />
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
        <div className="flex-center-x gap-1">
          <RegistrationButton event={event} className="flex-grow" />
          <ShareButton event={event} />
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <EventDetail
            title={t(`recurrence.${event.timing.type}`, { weekday: nextDate.toLocaleString({ weekday: 'long' }) })}
            content={
              <EventTime
                nextDate={nextDate}
                duration={event.timing.duration}
                timeZone={event.online ? DateTime.local().zoneName : event.timing.timeZone}
                showTimeZone={event.online}
              />}
          >
            <div className="text-tiny bg-primary-100 py-0.5 font-semibold">
              {nextDate.toLocaleString({ month: 'short' }).toUpperCase()}
            </div>
            <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
              {nextDate.day}
            </div>
          </EventDetail>
          {event.online ? 
            <EventDetail
              title={t('details.online_class_via', { software: "Zoom" })}
              content={t('details.hosted_from', { city: event.location.address })}
            >
              <div className="flex-center h-full text-primary">
                <SocialIcon social="zoom" size={24} />
              </div>
            </EventDetail> :
            <EventDetail
              title={event.location.address.substring(0, event.location.address.indexOf(","))}
              content={event.location.address.substring(event.location.address.indexOf(",") + 1)}
              url={event.location.directionsUrl || undefined}
              isExternal={true}
            >
              <div className="flex-center h-full text-primary">
                <LocationIcon />
              </div>
            </EventDetail>}
          {event.contact.phoneNumber &&
            <EventDetail
              title={t('details.contact_host')}
              content={t('details.tel', { phoneNumber: event.contact.phoneNumber })}
              url={`tel: ${event.contact.phoneNumber}`}
              isExternal={true}
            >
              <div className="flex-center h-full text-primary">
                <CallIcon size={32} />
              </div>
            </EventDetail>}
        </div>
      </div>
    </>
  );
}

type EventDetailProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  url?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function EventDetail({
  isExternal = false,
  title, content, url, children
}: EventDetailProps) {
  return (
    <div className="flex-center-y gap-3">
      <div className="text-center border-1 border-primary-100 rounded-small w-11 h-11">
        {children}
      </div>
      <div className="flex flex-col gap-0.5">
        {url ? 
          <Link
            isExternal={isExternal}
            showAnchorIcon={isExternal}
            anchorIcon={isExternal && <AnchorIcon />}
            className="group gap-x-0.5 text-medium text-foreground font-medium"
            href={url}
            rel="noreferrer noopener"
          >
            {title}
          </Link> :
          <p className="text-medium font-medium">
            {title}
          </p>}
        <p className="text-small text-default-500">
          {content}
        </p>
      </div>
    </div>
  )
}
