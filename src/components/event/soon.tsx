import Chip from "@/components/base/chip";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

type EventSoonProps = {
  online: boolean;
  firstDate: DateTime;
};

export function isSoon(nextDate: DateTime, online: boolean) {
  const unit = online ? 'hours' : 'weeks';
  const diff = nextDate.diffNow([unit]).get(unit);
  return 0 < diff && diff < 1;
}

export function EventSoon({ firstDate, online } : EventSoonProps) {
  if (!isSoon(firstDate, online)) {
    return null;
  }

  const { t } = useTranslation('events');

  return <Chip color="primary">
    {online ?
      t('details.starting_soon') :
      t('details.starting_on', {
        date: nextDate.toLocaleString({ month: 'short', day: 'numeric' }),
      })}
  </Chip>;
}