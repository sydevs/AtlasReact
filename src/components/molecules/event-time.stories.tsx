import type { StoryDefault } from '@ladle/react'

import { DateTime } from 'luxon'

import { EventTime } from '@/components/molecules'

export default { title: 'Molecules / Event Time' } satisfies StoryDefault

const nextDate = DateTime.fromISO('2026-07-04T09:30', { zone: 'Europe/London' })

export const Default = () => (
  <EventTime duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
)

export const WithTimeZone = () => (
  <EventTime showTimeZone duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
)

export const NoDuration = () => (
  <EventTime duration={null} nextDate={nextDate} timeZone="Europe/London" />
)
