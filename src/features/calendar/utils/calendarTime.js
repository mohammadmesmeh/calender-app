import { HOUR_HEIGHT, parseTimeString, toDate } from "./calendarUtils";
import { resolveTaskDate } from "./calendarItems";

export const DAY_MINUTES = 24 * 60;

// Default span of an item that carries no real end time (e.g. a task with only
// a start time) renders as a single compact slot, not a full-day strip.
export const FALLBACK_DURATION_MINUTES = 60;

// Smallest block height so even very short items stay readable/tappable.
export const MIN_BLOCK_HEIGHT = 22;

// Local calendar Date the item actually starts at. Real scheduled items carry
// startAt; legacy tasks fall back to their `date` + `time` string.
const resolveStartDateTime = (item) => {
  const start = toDate(item?.record?.startAt);
  if (start) return start;
  const date =
    item?.source === "task" ? resolveTaskDate(item?.record) : toDate(item?.record?.startAt) || toDate(item?.record?.date);
  if (date && item?.time) {
    const { hours, minutes } = parseTimeString(item.time);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0);
  }
  return null;
};

// Local Date the item ends at. Prefers endAt, then the endTime string, then
// falls back to the default single-slot span.
const resolveEndDateTime = (item) => {
  const end = toDate(item?.record?.endAt);
  if (end) return end;
  const start = resolveStartDateTime(item);
  if (start && item?.record?.endTime) {
    const { hours, minutes } = parseTimeString(item.record.endTime);
    const endCandidate = new Date(start.getFullYear(), start.getMonth(), start.getDate(), hours, minutes, 0, 0);
    if (endCandidate.getTime() > start.getTime()) return endCandidate;
  }
  return null;
};

// Minute-of-day the item starts at ("1:30 PM" -> 810). The absolute pixel
// height of a block derives from this same minute value through HOUR_HEIGHT.
export const itemStartMinutes = (item) => {
  const start = resolveStartDateTime(item);
  if (start) return start.getHours() * 60 + start.getMinutes();
  const { hours, minutes } = parseTimeString(item?.time || "9:00 AM");
  return hours * 60 + minutes;
};

// Length of the item in minutes. Events and scheduled Tasks prefer their real
// endAt/endTime; anything without an end falls back to one slot.
export const itemDurationMinutes = (item) => {
  const start = resolveStartDateTime(item);
  const end = resolveEndDateTime(item);
  if (start && end && end.getTime() > start.getTime()) {
    return Math.max(FALLBACK_DURATION_MINUTES, Math.round((end.getTime() - start.getTime()) / 60000));
  }
  return FALLBACK_DURATION_MINUTES;
};

// End minute-of-day, clamped to the visible 24h day.
export const itemEndMinutes = (item) =>
  Math.min(DAY_MINUTES, itemStartMinutes(item) + itemDurationMinutes(item));

// Absolute offset (px) from the top of the time grid where the item starts.
export const itemBlockTop = (item) => (itemStartMinutes(item) / 60) * HOUR_HEIGHT;

// Block height (px), respecting both MIN_BLOCK_HEIGHT and the day boundary.
export const itemBlockHeight = (item) => {
  const top = itemBlockTop(item);
  const maxHeight = ((DAY_MINUTES / 60) * HOUR_HEIGHT) - top;
  const height = (itemDurationMinutes(item) / 60) * HOUR_HEIGHT;
  return Math.min(Math.max(height, MIN_BLOCK_HEIGHT), maxHeight);
};

/**
 * Assigns horizontal lanes to overlapping items in a single day column, so
 * simultaneous entries sit side by side instead of hiding each other.
 *
 * Non-overlapping items each get the full column width. Returns an array whose
 * nth entry corresponds to items[n] (same order):
 *   { inlineStartPct, widthPct }
 *
 * The lane offsets are direction-agnostic: consumers position the block with
 * the logical property `insetInlineStart`, so lane 0 sits at the start edge in
 * both LTR and RTL calendars.
 */
export const layoutDayBlocks = (items) => {
  const count = items.length;
  const result = new Array(count);
  for (let i = 0; i < count; i += 1) result[i] = { inlineStartPct: 0, widthPct: 100 };
  if (count === 0) return result;

  const indexed = items
    .map((item, i) => ({ i, start: itemStartMinutes(item), end: itemEndMinutes(item) }))
    .sort((a, b) => a.start - b.start || a.end - b.end || a.i - b.i);

  // Group items into overlap clusters.
  const clusters = [];
  let current = null;
  for (const block of indexed) {
    if (current && block.start < current.end) {
      current.blocks.push(block);
      if (block.end > current.end) current.end = block.end;
    } else {
      current = { blocks: [block], end: block.end };
      clusters.push(current);
    }
  }

  for (const cluster of clusters) {
    const lanes = [];
    const laneByIndex = new Map();
    for (const block of cluster.blocks) {
      let lane = -1;
      for (let l = 0; l < lanes.length; l += 1) {
        if (lanes[l] <= block.start) {
          lane = l;
          break;
        }
      }
      if (lane === -1) {
        lane = lanes.length;
        lanes.push(Number.NEGATIVE_INFINITY);
      }
      lanes[lane] = block.end;
      laneByIndex.set(block.i, lane);
    }
    const laneCount = Math.max(lanes.length, 1);
    const width = 100 / laneCount;
    cluster.blocks.forEach((block) => {
      result[block.i] = { inlineStartPct: laneByIndex.get(block.i) * width, widthPct: width };
    });
  }

  return result;
};