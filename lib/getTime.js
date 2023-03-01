import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';
import timezones from './timezones';

const MILLISECONDS = 1000;

export default function getTime(timestamp, timezone) {
  let date = timestamp === 0 ? new Date() : timestamp * MILLISECONDS;
  date = formatInTimeZone(date, timezones[timezone], 'h:mm a');

  return date;
}
