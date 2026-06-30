import { Link } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { SocialIcon, AnchorIcon, CallIcon, LocationIcon } from '@/components/atoms/Icons'
import { EventTime } from '@/components/molecules/EventTime'
import { Event } from '@/types'
import { isOnline, nextOccurrence } from '@/lib/shape'
import { useLocale } from '@/hooks/use-locale'

export type EventDetailsProps = {
  event: Event
}

// Detect the meeting platform from an online event's join URL (for its icon).
function detectPlatform(url?: string | null): 'zoom' | 'google_meet' | 'youtube' | undefined {
  if (!url) return undefined
  if (/zoom\./i.test(url)) return 'zoom'
  if (/meet\.google\./i.test(url)) return 'google_meet'
  if (/youtu\.?be/i.test(url)) return 'youtube'

  return undefined
}

// A Google Maps directions link from the event's coordinates (or address text).
function directionsUrl(event: Event): string | undefined {
  const { latitude, longitude, street, city, country } = event.address ?? {}

  if (latitude != null && longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
  }

  const query = [street, city, country].filter(Boolean).join(', ')

  return query
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    : undefined
}

/**
 * The stack of detail cards shown inside an EventPanel — host contact, timing,
 * and location. The contact card's position and emphasis depend on whether the
 * event has an upcoming occurrence, so the ordering logic lives here rather than
 * at the call site. The individual cards and the generic row primitive below are
 * private to this module.
 */
export function EventDetails({ event }: EventDetailsProps) {
  const online = isOnline(event)
  const next = nextOccurrence(event)

  return (
    <div className="mt-5 flex flex-col gap-4">
      {!next && <EventContactDetails isHighlighted event={event} />}

      {next && <EventTimingDetails convertTimeZone={online} event={event} />}

      <EventLocationDetails event={event} />

      {next && <EventContactDetails event={event} />}
    </div>
  )
}

function EventContactDetails({
  event,
  isHighlighted = false,
}: {
  event: Event
  isHighlighted?: boolean
}) {
  const { t } = useTranslation('events')

  if (!event.contactPhone) return null

  return (
    <EventDetail
      content={t('details.tel', { phoneNumber: event.contactPhone })}
      isExternal={true}
      title={isHighlighted ? t('details.contact_for_timing') : t('details.contact_host')}
      url={`tel: ${event.contactPhone}`}
    >
      <div
        className={`flex-center h-full ${isHighlighted ? 'text-background bg-primary-100' : 'text-primary'}`}
      >
        <CallIcon size={32} />
      </div>
    </EventDetail>
  )
}

function EventTimingDetails({
  event,
  convertTimeZone = false,
}: {
  event: Event
  convertTimeZone?: boolean
}) {
  const { t } = useTranslation('events')
  const { locale } = useLocale()
  const schedule = event.schedule
  const next = nextOccurrence(event)
  const recurrence = schedule?.recurrenceType

  const nextDate = useMemo(
    () => (next ? DateTime.fromJSDate(next).setLocale(locale) : null),
    [next, locale],
  )

  if (!nextDate) return null

  return (
    <EventDetail
      content={
        <EventTime
          endTime={schedule?.endTime}
          nextDate={nextDate}
          showTimeZone={convertTimeZone}
          timeZone={
            convertTimeZone
              ? (DateTime.local().zoneName ?? 'UTC')
              : (schedule?.firstDate_tz ?? 'UTC')
          }
        />
      }
      title={
        recurrence
          ? t(`recurrence.${recurrence.toLowerCase()}`, {
              weekday: nextDate.toLocaleString({ weekday: 'long' }),
            })
          : t('details.contact_for_timing')
      }
    >
      <div className="text-tiny bg-primary-100 py-0.5 font-semibold">
        {nextDate.toLocaleString({ month: 'short' }).toUpperCase()}
      </div>
      <div className="flex items-center justify-center font-semibold text-md h-6 text-default-500">
        {nextDate.day}
      </div>
    </EventDetail>
  )
}

function EventLocationDetails({ event }: { event: Event }) {
  const { t } = useTranslation('events')
  const online = isOnline(event)

  let title: string
  let subtitle: string

  if (online) {
    title = t('details.online_class')
    const city = event.address?.city ?? event.region.name ?? event.region.slug

    subtitle = t('details.hosted_from', {
      city: event.address?.country ? `${city}, ${event.address.country}` : city,
    })
  } else {
    title = event.region.name || event.address?.street || event.region.slug
    subtitle = [event.address?.street, event.address?.city, event.address?.country]
      .filter(Boolean)
      .join(', ')
  }

  const platform = detectPlatform(event.onlineUrl)

  return (
    <EventDetail
      content={subtitle}
      isExternal={true}
      title={title}
      url={online ? (event.onlineUrl ?? undefined) : directionsUrl(event)}
    >
      <div className="flex-center h-full text-primary">
        {platform ? <SocialIcon platform={platform} size={24} /> : <LocationIcon />}
      </div>
    </EventDetail>
  )
}

type EventDetailProps = {
  title: React.ReactNode
  content: React.ReactNode
  url?: string
  isExternal?: boolean
  children: React.ReactNode
}

function EventDetail({ isExternal = false, title, content, url, children }: EventDetailProps) {
  return (
    <div className="flex-center-y gap-3">
      <div className="text-center border-1 border-primary-100 rounded-sm w-11 h-11">{children}</div>
      <div className="flex flex-col gap-0.5">
        {url ? (
          <Link
            anchorIcon={isExternal && <AnchorIcon />}
            className="group gap-x-0.5 text-md text-foreground font-medium"
            href={url}
            isExternal={isExternal}
            rel="noreferrer noopener"
            showAnchorIcon={isExternal}
          >
            {title}
          </Link>
        ) : (
          <div className="text-md font-medium">{title}</div>
        )}
        <div className="text-base text-default-500 max-w-72">{content}</div>
      </div>
    </div>
  )
}
