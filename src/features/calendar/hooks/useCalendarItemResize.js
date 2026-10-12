import { useCallback, useEffect, useRef, useState } from "react";
import { useCalendarData } from "./useCalendarData";
import { HOUR_HEIGHT } from "../utils/calendarUtils";
import { TIME_SNAP_MINUTES, formatCalendarTime } from "../utils/dragDrop";
import {
  itemDurationMinutes,
  itemStartMinutes,
  resolveStartDateTime,
} from "../utils/calendarTime";

/**
 * Hook for Google Calendar-style vertical item resizing (drag to extend/shrink).
 *
 * Provides pointer session management for grabbing the bottom edge of an item
 * block in Day and Week calendar views, snapping duration to 30-min intervals,
 * and persisting the new endAt / endTime to Firestore via Task & Event contexts.
 */
export const useCalendarItemResize = () => {
  const { updateTask, updateEvent } = useCalendarData();
  const [resizing, setResizing] = useState(null);
  const sessionRef = useRef(null);

  const startResize = useCallback((item, event) => {
    if (!event || (event.button != null && event.button !== 0)) return;
    event.stopPropagation();
    event.preventDefault();

    const initialDuration = itemDurationMinutes(item);
    const startM = itemStartMinutes(item);
    const startAt = resolveStartDateTime(item) || new Date();
    const initialEndAt = new Date(startAt.getTime() + initialDuration * 60000);

    const session = {
      item,
      initialDuration,
      startM,
      startAt,
      initialY: event.clientY,
      currentDuration: initialDuration,
    };

    sessionRef.current = session;
    setResizing({
      itemId: item.id,
      itemSource: item.source,
      duration: initialDuration,
      startAt,
      resizingEndAt: initialEndAt,
      liveEndTime: formatCalendarTime(initialEndAt.getHours(), initialEndAt.getMinutes()),
    });
  }, []);

  useEffect(() => {
    if (!resizing) return;

    const originalCursor = document.body.style.cursor;
    const originalUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "s-resize";
    document.body.style.userSelect = "none";

    const handlePointerMove = (e) => {
      const session = sessionRef.current;
      if (!session) return;

      const deltaY = e.clientY - session.initialY;
      const deltaMinutes = (deltaY / HOUR_HEIGHT) * 60;
      const rawMinutes = session.initialDuration + deltaMinutes;
      const snapped = Math.round(rawMinutes / TIME_SNAP_MINUTES) * TIME_SNAP_MINUTES;
      const maxMinutes = 24 * 60 - session.startM;
      const nextDuration = Math.max(TIME_SNAP_MINUTES, Math.min(maxMinutes, snapped));

      if (nextDuration !== session.currentDuration) {
        session.currentDuration = nextDuration;
        const newEndAt = new Date(session.startAt.getTime() + nextDuration * 60000);
        setResizing((prev) =>
          prev
            ? {
                ...prev,
                duration: nextDuration,
                resizingEndAt: newEndAt,
                liveEndTime: formatCalendarTime(newEndAt.getHours(), newEndAt.getMinutes()),
              }
            : null
        );
      }
    };

    const handlePointerUp = () => {
      const session = sessionRef.current;
      sessionRef.current = null;
      setResizing(null);

      if (!session) return;
      const { item, initialDuration, currentDuration, startAt } = session;

      if (currentDuration === initialDuration) return;

      const endAt = new Date(startAt.getTime() + currentDuration * 60000);
      const endTime = formatCalendarTime(endAt.getHours(), endAt.getMinutes());

      if (item.source === "task") {
        const updates = { endAt, endTime };
        if (!item.record?.startAt) {
          updates.startAt = startAt;
        }
        updateTask(item.id, updates);
      } else if (item.source === "event") {
        const updates = { endAt, endTime };
        if (!item.record?.startAt) {
          updates.startAt = startAt;
        }
        updateEvent(item.id, updates);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        sessionRef.current = null;
        setResizing(null);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.cursor = originalCursor;
      document.body.style.userSelect = originalUserSelect;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resizing, updateTask, updateEvent]);

  const getResizeHandleProps = useCallback(
    (item) => ({
      onPointerDown: (e) => startResize(item, e),
      onClick: (e) => e.stopPropagation(),
    }),
    [startResize]
  );

  return {
    resizing,
    getResizeHandleProps,
  };
};
