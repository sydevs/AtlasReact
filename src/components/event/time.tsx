import { TimezoneChip } from "@/components/base/chip";
import { DateTime } from "luxon";

type EventTimeProps = {
  nextDate: DateTime;
  duration: number | null;
  timeZone: string;
  showTimeZone?: boolean;
  delay?: number;
};

export function EventTime({ nextDate, duration, timeZone, delay, showTimeZone = false } : EventTimeProps) {
  const times = [nextDate];
  if (duration) {
    times.push(nextDate.plus({ hours: duration }));
  }

  return <>
    {times.map((time) => time.setZone(timeZone).toLocaleString(DateTime.TIME_SIMPLE)).join(' - ')}
    {showTimeZone && <TimezoneChip time={nextDate.setZone(timeZone)} delay={delay} />}
  </>;
}
