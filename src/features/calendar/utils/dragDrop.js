import {
  HOUR_HEIGHT,
  DAY_NAMES,
  SHORT_DAY_NAMES,
  toDate,
  toCalendarMidnight,
  parseTimeString,
  isSameDay,
} from "./calendarUtils";
import { resolveTaskDate } from "./calendarItems";

// Minimum pointer movement (in px) before a press becomes a real drag. Any
// movement below this threshold is treated as a plain click.
export const DRAG_THRESHOLD_PX = 6;

// Dropped times snap to this many minutes, keeping the calendar free of
// arbitrary seconds/minutes.
export const TIME_SNAP_MINUTES = 30;

export const LAST_SNAPPABLE_MINUTE = 24 * 60 - TIME_SNAP_MINUTES;

// Formats an hour/minute pair exactly like the rest of the app formats item
// times (e.g. "09:30 AM" / "2:00 PM").
export const formatCalendarTime = (hour, minute = 0) =>
  new Date(2000, 0, 1, ((hour % 24) + 24) % 24, minute % 60).toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const minutesToCalendarTime = (minutes) => {
  const clamped = Math.max(0, Math.min(LAST_SNAPPABLE_MINUTE, Math.round(minutes)));
  return formatCalendarTime(Math.floor(clamped / 60), clamped % 60);
};

// Rounds a raw minute-of-day value to the nearest snap interval and clamps it
// to the supported calendar range.
export const snapMinutes = (minutes, step = TIME_SNAP_MINUTES) =>
  Math.max(0, Math.min(LAST_SNAPPABLE_MINUTE, Math.round(minutes / step) * step));

// Maps a drop offset from the top of a time grid (in px) to a snapped
// minute-of-day value using the existing HOUR_HEIGHT source of truth.
export const timeFromDropOffset = (pixelsFromGridTop) =>
  snapMinutes((pixelsFromGridTop / HOUR_HEIGHT) * 60);

// Stable date key used on drop-target DOM nodes ("2026-08-12").
export const gridDateKey = (date) => {
  const d = toDate(date);
  if (!d) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Parses the key produced by gridDateKey back into a local calendar Date.
// Returns null for anything malformed (never guesses from garbage strings).
export const parseGridDateKey = (key) => {
  if (!key) return null;
  const match = String(key).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
};

// Resolves the current calendar day for either kind of item (mirrors the
// helpers already used by buildCalendarItems).
export const resolveItemCalendarDate = (source, record) =>
  source === "task" ? resolveTaskDate(record) : toDate(record?.startAt) || toDate(record?.date);

const parseItemTime = (record) => parseTimeString(record?.time || "9:00 AM");

// Minute-of-day the task is currently scheduled at (startAt wins, then the
// legacy `time` string).
const taskStartMinutes = (taskRecord) => {
  const start = toDate(taskRecord?.startAt);
  if (start) return start.getHours() * 60 + start.getMinutes();
  return null;
};

// Current task duration in minutes (from startAt/endAt), defaulting to the
// standard 1-hour slot for legacy tasks.
const taskDurationMinutes = (taskRecord) => {
  const start = toDate(taskRecord?.startAt);
  const end = toDate(taskRecord?.endAt);
  if (start && end && end.getTime() > start.getTime()) {
    return Math.round((end.getTime() - start.getTime()) / 60000);
  }
  return 60;
};

// Builds the partial Firestore update for moving a Task. `timeString` may be
// null, in which case the task keeps its existing time-of-day and only the date
// moves. startAt/endAt are both moved together and the duration is preserved.
// `day` is kept consistent with the new calendar date; legacy tasks that never
// had a schedule are promoted to scheduled ones on their first move.
export const buildTaskReschedule = (taskRecord, targetDate, timeString) => {
  const date = toDate(targetDate) || new Date();
  let startMinutes = taskStartMinutes(taskRecord);
  if (timeString != null) {
    const parsed = parseTimeString(timeString);
    startMinutes = parsed.hours * 60 + parsed.minutes;
  }
  if (startMinutes == null) {
    const parsed = parseTimeString(taskRecord?.time || "9:00 AM");
    startMinutes = parsed.hours * 60 + parsed.minutes;
  }

  const duration = taskDurationMinutes(taskRecord);
  const startAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Math.floor(startMinutes / 60),
    startMinutes % 60,
    0,
    0
  );
  const endAt = new Date(startAt.getTime() + duration * 60000);

  return {
    date: toCalendarMidnight(date),
    startAt,
    endAt,
    time: formatCalendarTime(startAt.getHours(), startAt.getMinutes()),
    endTime: formatCalendarTime(endAt.getHours(), endAt.getMinutes()),
    day: SHORT_DAY_NAMES[startAt.getDay()],
  };
};

// Builds the partial Firestore update for moving an Event. Recomposes startAt/
// endAt around the new date/time, preserving the original duration and every
// unrelated field.
export const buildEventReschedule = (eventRecord, targetDate, timeString) => {
  const date = toDate(targetDate) || new Date();
  const previousStart = toDate(eventRecord?.startAt) || new Date();
  const previousEnd = toDate(eventRecord?.endAt);
  const durationMs =
    previousEnd && previousEnd.getTime() > previousStart.getTime()
      ? previousEnd.getTime() - previousStart.getTime()
      : 60 * 60 * 1000;

  const { hours, minutes } = parseTimeString(timeString || eventRecord?.time || "9:00 AM");
  const startAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0
  );
  const endAt = new Date(startAt.getTime() + durationMs);

  return {
    startAt,
    endAt,
    time: formatCalendarTime(startAt.getHours(), startAt.getMinutes()),
    day: DAY_NAMES[startAt.getDay()],
  };
};

// True when moving `record` to `date`/`timeString` would actually change the
// stored calendar position (used to skip pointless Firestore writes).
export const rescheduleChanges = (source, record, date, timeString) => {
  const currentDate = resolveItemCalendarDate(source, record);
  if (!currentDate || !isSameDay(currentDate, date)) return true;
  if (timeString == null) return false;

  const current = parseItemTime(record);
  const next = parseTimeString(timeString);
  return current.hours !== next.hours || current.minutes !== next.minutes;
};