import Chip from "@/components/base/chip";
import useLocale from "@/hooks/use-locale";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type EventSoonChipProps = {
  online: boolean;
  firstDate: Date;
};

export function isSoon(nextDate: DateTime, online: boolean) {
  const unit = online ? 'hours' : 'weeks';
  const diff = nextDate.diffNow([unit]).get(unit);
  return 0 < diff && diff < 1;
}

export function EventSoonChip({ firstDate, online } : EventSoonChipProps) {
  const date = useMemo(() => DateTime.fromJSDate(firstDate), [firstDate]);

  if (!isSoon(date, online)) {
    return null;
  }

  const { t } = useTranslation('events');
  const { locale } = useLocale();

  return <Chip color="primary">
    {online ?
      t('details.starting_soon') :
      t('details.starting_on', {
        date: date.setLocale(locale).toLocaleString({ month: 'short', day: 'numeric' }),
      })}
  </Chip>;
}