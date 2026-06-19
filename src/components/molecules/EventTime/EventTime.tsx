import { DateTime } from 'luxon'

import { TimezoneChip } from '@/components/atoms/Chip'

type EventTimeProps = {
  nextDate: DateTime
  endTime?: string | null // "HH:MM" same-day end, in the event's timezone
  timeZone: string
  showTimeZone?: boolean
  delay?: number
}

export function EventTime({
  nextDate,
  endTime,
  timeZone,
  delay,
  showTimeZone = false,
}: EventTimeProps) {
  const start = nextDate.setZone(timeZone)
  const times = [start]

  if (endTime) {
    const [hour, minute] = endTime.split(':').map(Number)

    times.push(start.set({ hour, minute }))
  }

  return (
    <>
      {times.map((time) => time.toLocaleString(DateTime.TIME_SIMPLE)).join(' - ')}
      {showTimeZone && <TimezoneChip delay={delay} time={start} />}
    </>
  )
}
