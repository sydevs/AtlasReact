import { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react'
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
 * Private to EventTime: a timezone-abbreviation chip whose tooltip shows the full
 * zone name and UTC offset. A single-use composition over `Chip` — it carries
 * date/tooltip logic the `Chip` atom must stay free of, so it lives here.
 *
 * The tooltip is built on `@floating-ui/react` (same library as the Dropdown
 * atom): the bubble is portaled — so it is never clipped by an ancestor's
 * `overflow` (the event panel scrolls) — and viewport-aware (flip/shift). The
 * trigger is `inline-flex`, never `block`, so it sits inline with the time text
 * without stretching the line it anchors to.
 */
function TimezoneChip({ time, delay = 0 }: TimezoneChipProps) {
  const { t } = useTranslation('events')
  const { abbreviation, name, offset: utcOffset } = formatTimeZone(time)
  const tooltip = t('timing.converted_to', { timezone: name, offset: utcOffset })

  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
  })

  const hover = useHover(context, { delay: { open: delay, close: 0 }, move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  return (
    <>
      {' '}
      <button
        ref={refs.setReference}
        className="inline-flex cursor-default align-middle"
        type="button"
        {...getReferenceProps()}
      >
        <Chip color="primary" size="sm" variant="light">
          {abbreviation}
        </Chip>
      </button>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="z-50 max-w-64 rounded-md bg-foreground px-2 py-1 text-small text-background shadow-md"
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {tooltip}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
