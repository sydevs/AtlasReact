import { Event as EventSchema } from 'schema-dts'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import useLocale from '@/hooks/use-locale'
import { Event } from '@/types'

type EventMetaeventProps = {
  event: Event
}

export default function EventMetaevent({ event }: EventMetaeventProps) {
  const { locale } = useLocale()
  const { t } = useTranslation('common')

  const description = event.description || 'Free meditation class'
  const schema: EventSchema = {
    '@type': 'Event',
    '@id': event.url,
    name: event.label,
    description: description,
    startDate: event.timing ? event.timing.firstDate.toISOString() : undefined,
    endDate: event.timing ? event.timing.lastDate?.toISOString() : undefined,
    image: event.images[0]?.url,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: `https://schema.org/${event.online ? 'OnlineEventAttendanceMode' : 'OfflineEventAttendanceMode'}`,
    offers:
      event.timing && event.registration
        ? {
            '@type': 'Offer',
            url: event.url,
            price: 0,
            priceCurrency: 'USD',
            availability: `https://schema.org/${event.registration.maxParticipants && event.registration.maxParticipants <= event.registration.participantCount ? 'OutOfStock' : 'InStock'}`,
            validFrom: event.timing.firstDate.toISOString(),
            validThrough: event.timing.lastDate?.toISOString(),
          }
        : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'We Meditate',
      url: 'https://wemeditate.com',
      logo: 'https://wemeditate.com/logo.svg',
    },
  }

  if (event.online) {
    schema.location = {
      '@type': 'VirtualLocation',
      url: event.url,
    }
  } else if (event.location.venue) {
    schema.location = {
      '@type': 'Place',
      name: event.location.venue.name || event.location.venue.street,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.venue.street,
        addressLocality: event.location.venue.city,
        addressRegion: event.location.regionCode || undefined,
        addressCountry: event.location.countryCode,
        postalCode: event.location.venue.postalCode || undefined,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      },
    }
  }

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{`${event.label} - ${t('free_meditation_class')}`}</title>
      <link href={event.url} rel="canonical" />
      <meta content={description} name="description" />
      <meta content="event" property="og:type" />
      <meta content={event.label} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={event.url} property="og:url" />
      <meta content={event.languageCode} property="og:locale:alternate" />
      {event.timing && (
        <meta content={event.timing.firstDate.toISOString()} property="og:event:start_time" />
      )}
      {event.timing && event.timing.lastDate && (
        <meta content={event.timing.lastDate?.toISOString()} property="og:event:end_time" />
      )}
      {event.images && event.images.length > 0 && (
        <meta content={event.images[0].url} property="og:image" />
      )}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
