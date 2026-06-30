import { Tooltip } from '@nextui-org/react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'

import { Chip } from '@/components/atoms/Chip'
import { formatTimeZone } from '@/lib'

export type EventTimeProps = {
  nextDate: DateTime
  duration: number | null
  timeZone: string
  showTimeZone?: boolean
  /** Tooltip open delay (ms) for the timezone chip. Only applies when `showTimeZone` is set. */
  delay?: number
}

export function EventTime({
  nextDate,
  duration,
  timeZone,
  delay,
  showTimeZone = false,
}: EventTimeProps) {
  const times = [nextDate]

  if (duration) {
    times.push(nextDate.plus({ hours: duration }))
  }

  return (
    <>
      {times.map((time) => time.setZone(timeZone).toLocaleString(DateTime.TIME_SIMPLE)).join(' - ')}
      {showTimeZone && <TimezoneChip delay={delay} time={nextDate.setZone(timeZone)} />}
    </>
  )
}

type TimezoneChipProps = {
  time: DateTime
  delay?: number
}

/**
 * Private to EventTime: a timezone-abbreviation chip whose tooltip shows the
 * full zone name and UTC offset. A single-use composition over `Chip` — it
 * carries date/tooltip logic that the `Chip` atom must stay free of, so it lives
 * here rather than in the atom layer.
 */
function TimezoneChip({ time, delay = 0 }: TimezoneChipProps) {
  const { t } = useTranslation('events')
  const { abbreviation, name, offset } = formatTimeZone(time)
  const tooltip = t('timing.converted_to', { timezone: name, offset })

  return (
    <Tooltip className="max-w-64" closeDelay={0} content={tooltip} delay={delay} placement="top">
      <abbr>
        {' '}
        {/* Tooltip wrapper needed for forwardRef to work */}
        <Chip color="primary" size="sm" variant="light">
          {abbreviation}
        </Chip>
      </abbr>
    </Tooltip>
  )
}
