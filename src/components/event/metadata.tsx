import { Event } from "@/types";
import { Event as EventSchema } from "schema-dts"
import { Helmet } from "react-helmet-async";
import useLocale from "@/hooks/use-locale";
import { useTranslation } from "react-i18next";

type EventMetaeventProps = {
  event: Event;
}

export default function EventMetaevent({ event } : EventMetaeventProps) {
  const { locale } = useLocale();
  const { t } = useTranslation('common');

  const description = event.description || "Free meditation class";
  const schema : EventSchema = {
    "@type": "Event",
    "@id": event.url,
    name: event.label,
    description: description,
    startDate: event.timing.firstDate.toISOString(),
    endDate: event.timing.lastDate?.toISOString(),
    image: event.images[0]?.url,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: `https://schema.org/${event.online ? 'OnlineEventAttendanceMode' : 'OfflineEventAttendanceMode'}`,
    location: event.online ? {
      "@type": "VirtualLocation",
      url: event.url,
    } : {
      "@type": "Place",
      name: event.location.address,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location.address,
        // addressLocality: event.location.city,
        // addressRegion: event.location.state,
        // postalCode: event.location.postalCode,
        // addressCountry: event.location.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      },
    },
    offers: {
      "@type": "Offer",
      url: event.url,
      price: 0,
      priceCurrency: "USD",
      availability: `https://schema.org/${event.registration.maxParticipants && event.registration.maxParticipants <= event.registration.participantCount ? 'OutOfStock' : 'InStock'}`,
      validFrom: event.timing.firstDate.toISOString(),
      validThrough: event.timing.lastDate?.toISOString(),
    },
    organizer: {
      "@type": "Organization",
      name: "We Meditate",
      url: "https://wemeditate.com",
      logo: "https://wemeditate.com/logo.svg",
    },
  }

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{`${event.label} - ${t('free_meditation_class')}`}</title>
      <link rel="canonical" href={event.url} />
      <meta name="description" content={description} />
      <meta property="og:type" content="event" />
      <meta property="og:title" content={event.label} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={event.url} />
      <meta property="og:event:start_time" content={event.timing.firstDate.toISOString()} />
      <meta property="og:locale:alternate" content={event.languageCode} />
      {event.timing.lastDate &&
        <meta property="og:event:end_time" content={event.timing.lastDate?.toISOString()} />}
      {event.images && event.images.length > 0 &&
        <meta property="og:image" content={event.images[0].url} />}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
