import { useCallback } from "react";
import { useCalendarData } from "./useCalendarData";
import { useCalendarDragAndDrop } from "./useCalendarDragAndDrop";
import {
  buildEventReschedule,
  buildTaskReschedule,
  minutesToCalendarTime,
  rescheduleChanges,
} from "../utils/dragDrop";

/**
 * Calendar DnD glued to the existing Task/Event context persistence layer.
 *
 * The hook owns pointer/drop mechanics via useCalendarDragAndDrop, converts the
 * resolved drop target into the exact partial update for the item kind, and
 * forwards it through the contexts (which optimistically update state and then
 * write to Firestore via the service layer). It never calls Firestore itself.
 */
export const useCalendarDataDrop = () => {
  const { updateTask, updateEvent } = useCalendarData();

  const handleDrop = useCallback(
    (item, drop) => {
      const record = item?.record;
      if (!record) return;

      const { date, time } = drop;
      const timeString = time == null ? null : minutesToCalendarTime(time);

      if (item.source === "task") {
        if (!rescheduleChanges("task", record, date, timeString)) return;
        updateTask(record.id, buildTaskReschedule(record, date, timeString));
      } else if (item.source === "event") {
        if (!rescheduleChanges("event", record, date, timeString)) return;
        updateEvent(record.id, buildEventReschedule(record, date, timeString));
      }
    },
    [updateTask, updateEvent]
  );

  return useCalendarDragAndDrop({ onDrop: handleDrop });
};