export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const SHORT_DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CATEGORY_COLORS = {
  planning: "bg-primary",
  meeting: "bg-secondary",
  design: "bg-accent",
  development: "bg-warning",
  personal: "bg-success",
  research: "bg-danger",
};

export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || "bg-primary";

export const HOUR_HEIGHT = 56;

// English 12-hour labels for each of the 24 calendar hours, e.g. "12 AM",
// "01 AM", "02 AM", ..., "12 PM", "01 PM", ..., "11 PM". Hardcoded English so
// the calendar remains English regardless of the browser/OS locale.
export const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => {
  const period = i < 12 ? "AM" : "PM";
  const h = i % 12 || 12;
  return `${String(h).padStart(2, "0")} ${period}`;
});

// "1:00 AM", "2:00 AM", ..., "11:00 PM" – the start-of-slot time used when
// opening the "add item" overlay from an hour slot.
export const formatHourTime = (hour) => {
  const period = hour < 12 ? "AM" : "PM";
  const h = hour % 12 || 12;
  return `${h}:00 ${period}`;
};

export const toDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  if (value instanceof Date) return value;
  return null;
};

export const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isSameCalendarDay = (itemDate, cellDate) => isSameDay(itemDate, cellDate);

// Normalizes any date-like value to the local midnight of that calendar day.
// Used when persisting a Task's scheduled calendar date (stored as a Date,
// which Firestore serializes as a Timestamp). A task's `date` is the calendar
// day the task belongs to; it is unrelated to `createdAt`.
export const toCalendarMidnight = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

export const startOfWeek = (date, startDay = 0) => {
  const d = new Date(date);
  const diff = (d.getDay() - startDay + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getWeekDays = (date, startDay = 0) =>
  Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(date, startDay), i));

export const parseTimeString = (time) => {
  if (!time) return { hours: 0, minutes: 0 };
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return { hours: 0, minutes: 0 };
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = (match[3] || "").toUpperCase();
  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return { hours: hour, minutes: minute };
};

export const combineDateAndTime = (date, time) => {
  const base = date ? new Date(date) : new Date();
  const { hours, minutes } = parseTimeString(time);
  base.setHours(hours, minutes, 0, 0);
  return base;
};

// Formats a Date/Timestamp as a 12-hour "h:mm AM/PM" label, matching how the
// rest of the calendar displays item times.
export const formatTimeLabel = (date) =>
  date ? new Date(date).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }) : "";

// Default schedule span when no explicit end time is given (mirrors the 1-hour
// default already used by events).
export const DEFAULT_DURATION_MINUTES = 60;

export const buildEventDocument = (data) => {
  const selectedDate = data.date || new Date();
  const startAt = combineDateAndTime(selectedDate, data.time || "09:00 AM");
  const endAt = new Date(startAt);
  endAt.setHours(endAt.getHours() + 1);

  return {
    title: data.title || "Untitled Event",
    time: startAt.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }),
    day: DAY_NAMES[startAt.getDay()],
    note: data.description || null,
    type: data.category || "meeting",
    color: getCategoryColor(data.category),
    location: data.location || "",
    startAt,
    endAt,
  };
};

// Builds the real calendar schedule for a Task from the form fields:
// { date, time (start), endTime }. `date` keeps the selected calendar day as
// midnight; `startAt`/`endAt` carry the actual scheduled datetimes (Firestore
// serializes Dates as Timestamps). The `time`/`endTime`/`day` string fields are
// kept for display and backward compatibility.
export const buildTaskDocument = (data) => {
  const selectedDate = data.date instanceof Date ? data.date : data.date ? new Date(data.date) : new Date();
  const startTime = parseTimeString(data.time || "09:00 AM");
  const startAt = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    startTime.hours,
    startTime.minutes,
    0,
    0
  );

  let endAt = null;
  if (data.endTime) {
    const endTime = parseTimeString(data.endTime);
    endAt = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      endTime.hours,
      endTime.minutes,
      0,
      0
    );
  }
  if (!endAt || endAt.getTime() <= startAt.getTime()) {
    endAt = new Date(startAt.getTime() + DEFAULT_DURATION_MINUTES * 60 * 1000);
  }

  return {
    date: toCalendarMidnight(startAt),
    startAt,
    endAt,
    time: formatTimeLabel(startAt),
    endTime: formatTimeLabel(endAt),
    day: DAY_NAMES[startAt.getDay()],
  };
};