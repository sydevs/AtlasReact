import { Link } from "@nextui-org/react";
import { EventContact, EventLocation, EventTiming } from "@/types";
import { useTranslation } from "react-i18next";
import { EventTime } from "./time";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { SocialIcon, AnchorIcon, CallIcon, LocationIcon } from "../icons";
import useLocale from "@/hooks/use-locale";

export function EventContactDetails({
  contact,
  isHighlighted = false
} : {
  contact: EventContact, isHighlighted?: boolean
}) {
  const { t } = useTranslation('events');
  
  return (
    <EventDetail
      title={isHighlighted ? t('details.contact_for_timing') : t('details.contact_host')}
      content={t('details.tel', { phoneNumber: contact.phoneNumber })}
      url={`tel: ${contact.phoneNumber}`}
      isExternal={true}
    >
      <div className={`flex-center h-full ${isHighlighted ? 'text-background bg-primary-100' : 'text-primary'}`}>
        <CallIcon size={32} />
      </div>
    </EventDetail>
  )
}

export function EventTimingDetails({
  timing,
  convertTimeZone = false
} : {
  timing: EventTiming, convertTimeZone?: boolean
}) {
  const { t } = useTranslation('events');
  const { locale } = useLocale();
  const nextDate = useMemo(() => DateTime.fromJSDate(timing.upcomingDates[0]).setLocale(locale), [timing]);
  
  return (
    <EventDetail
      title={t(`recurrence.${timing.type}`, { weekday: nextDate.toLocaleString({ weekday: 'long' }) })}
      content={
        <EventTime
          nextDate={nextDate}
          duration={timing.duration}
          timeZone={convertTimeZone ? DateTime.local().zoneName : timing.timeZone}
          showTimeZone={convertTimeZone}
        />}
    >
      <div className="text-tiny bg-primary-100 py-0.5 font-semibold">
        {nextDate.toLocaleString({ month: 'short' }).toUpperCase()}
      </div>
      <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
        {nextDate.day}
      </div>
    </EventDetail>
  )
}

export function EventLocationDetails({
  location
} : {
  location: EventLocation
}) {
  return (
    <EventDetail
      title={location.label}
      content={location.subtitle}
      url={location.directionsUrl || undefined}
      isExternal={true}
    >
      <div className="flex-center h-full text-primary">
        {location.platform ?
          <SocialIcon platform={location.platform} size={24} /> :
          <LocationIcon />}
      </div>
    </EventDetail>
  )
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
      <div className="text-center border-1 border-primary-100 rounded-sm w-11 h-11">
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
