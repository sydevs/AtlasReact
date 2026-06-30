import type { EventSchedule, EventType } from '@/types'

import { DateTime } from 'luxon'

/**
 * Derivations shared by the event components, so the raw SahajCloud field shapes
 * (eventType / schedule) are interpreted in exactly one place. Operates on a
 * minimal structural type so it works for both `EventSlim` and the full `Event`.
 */
type EventLike = { eventType: EventType; schedule?: EventSchedule | null }

export const isOnline = (event: EventLike): boolean => event.eventType === 'online'

/** The next upcoming occurrence (SahajCloud precomputes `upcomingDates`), if any. */
export const nextOccurrence = (event: EventLike): Date | undefined =>
  event.schedule?.upcomingDates?.[0]

/**
 * The timezone to display an event's times in: the viewer's local zone for
 * online events, otherwise the event's own zone (UTC as a last resort).
 */
export const eventTimeZone = (event: EventLike): string =>
  isOnline(event) ? (DateTime.local().zoneName ?? 'UTC') : (event.schedule?.firstDate_tz ?? 'UTC')
