import Chip from "@/components/base/chip";
import { DateTime } from "luxon";

type EventSoonProps = {
  online: boolean;
  nextDate: DateTime;
};

export function isSoon(nextDate: DateTime, online: boolean) {
  const unit = online ? 'hours' : 'weeks';
  const diff = nextDate.diffNow([unit]).get(unit);
  return 0 < diff && diff < 1;
}

export function EventSoon({ nextDate, online } : EventSoonProps) {
  if (!isSoon(nextDate, online)) {
    return null;
  }

  return <Chip color="primary">
    {online ?
      "Starting soon" :
      `Starting ${nextDate.toLocaleString({ month: 'short', day: 'numeric' })}`}
  </Chip>;
}
