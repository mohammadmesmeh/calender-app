import {
  toDate,
  isSameCalendarDay,
  getCategoryColor,
  parseTimeString,
} from "./calendarUtils";

// Fields that may carry a Task's real calendar date depending on how the Task
// was created. Order matters: startAt/date first, then common date synonyms.
const TASK_DATE_FIELDS = ["startAt", "date", "dueDate", "taskDate", "scheduledFor", "scheduledAt", "scheduledDate"];

export const coerceDate = (value) => {
  const viaToDate = toDate(value);
  if (viaToDate) return viaToDate;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(`${value}T00:00:00`);
  }
  if (typeof value === "string" && !Number.isNaN(Date.parse(value))) {
    return new Date(value);
  }
  return null;
};

// Resolves an Event's calendar date. Events carry startAt (Timestamp/Date) or date.
export const resolveItemDate = (item) => {
  const fromStart = toDate(item.startAt);
  if (fromStart) return fromStart;
  const fromDateField = toDate(item.date);
  if (fromDateField) return fromDateField;
  return null;
};

// Resolves a Task's calendar date from any real date-bearing field.
// NEVER uses `createdAt` (creation time) or `.day` (weekday) as the date.
export const resolveTaskDate = (task) => {
  for (const field of TASK_DATE_FIELDS) {
    const date = coerceDate(task[field]);
    if (date) return date;
  }
  return null;
};

// Builds the normalized list of items (tasks + events) that belong to the
// exact calendar date. Matching NEVER uses weekday / day-number fallbacks.
export const buildCalendarItems = (events, tasks, date) => {
  const items = [];

  (events || []).forEach((event) => {
    const eventDate = resolveItemDate(event);
    if (!eventDate || !isSameCalendarDay(eventDate, date)) return;
    items.push({
      source: "event",
      id: event.id,
      title: event.title,
      time: event.time,
      color: event.color || getCategoryColor(event.type),
      completed: false,
      record: event,
    });
  });

  (tasks || []).forEach((task) => {
    const taskDate = resolveTaskDate(task);
    if (!taskDate || !isSameCalendarDay(taskDate, date)) return;
    items.push({
      source: "task",
      id: task.id,
      title: task.title,
      time: task.time,
      color: "bg-secondary",
      completed: !!task.completed,
      record: task,
    });
  });

  items.sort((a, b) => {
    const ah = parseTimeString(a.time || "9:00 AM");
    const bh = parseTimeString(b.time || "9:00 AM");
    const diff = ah.hours * 60 + ah.minutes - (bh.hours * 60 + bh.minutes);
    if (diff !== 0) return diff;
    const byTitle = String(a.title || "").localeCompare(String(b.title || ""));
    if (byTitle !== 0) return byTitle;
    return String(a.id || "").localeCompare(String(b.id || ""));
  });

  return items;
};

// Starting hour (0-23) used to place an item inside the hourly grid.
export const itemHour = (item) => {
  if (item.time) {
    const { hours } = parseTimeString(item.time);
    return hours;
  }
  const date = item.source === "task" ? resolveTaskDate(item) : resolveItemDate(item);
  return date ? date.getHours() : 9;
};