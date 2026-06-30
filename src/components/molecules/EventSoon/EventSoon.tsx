import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useLocale } from '@/hooks/use-locale'
import { Chip } from '@/components/atoms/Chip'
import { isSoon } from '@/lib'

export type EventSoonChipProps = {
  online: boolean
  firstDate: Date
}

export function EventSoonChip({ firstDate, online }: EventSoonChipProps) {
  const date = useMemo(() => DateTime.fromJSDate(firstDate), [firstDate])

  if (!isSoon(date, online)) {
    return null
  }

  const { t } = useTranslation('events')
  const { locale } = useLocale()

  return (
    <Chip color="primary">
      {online
        ? t('details.starting_soon')
        : t('details.starting_on', {
            date: date.setLocale(locale).toLocaleString({ month: 'short', day: 'numeric' }),
          })}
    </Chip>
  )
}
