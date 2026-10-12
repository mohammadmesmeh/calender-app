import { useCallback, useEffect, useRef, useState } from "react";
import {
  DRAG_THRESHOLD_PX,
  gridDateKey,
  parseGridDateKey,
  timeFromDropOffset,
} from "../utils/dragDrop";

// "data-drop" attribute kind for date-only targets (Month view).
export const DROP_KIND_DATE = "date";
// "data-drop" attribute kind for vertical time-grid targets (Week/Day views).
export const DROP_KIND_TIME = "time";

const findDropTarget = (element) => {
  if (!element || typeof element.getAttribute !== "function") return null;
  let node = element;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node.getAttribute("data-drop")) return node;
    node = node.parentElement;
  }
  return null;
};

const isDrag = (dx, dy) => Math.hypot(dx, dy) >= DRAG_THRESHOLD_PX;

// Finds the nearest scrollable ancestor (used for gentle auto-scroll while
// dragging toward the top/bottom edge of a tall time grid).
const findScrollableAncestor = (element) => {
  if (!element || typeof element.closest !== "function") return null;
  let node = element;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node.scrollHeight > node.clientHeight) return node;
    node = node.parentElement;
  }
  return null;
};

const EDGE_SCROLL_ZONE = 48;
const EDGE_SCROLL_STEP = 14;

/**
 * Pointer-based calendar drag & drop.
 *
 * Responsibilities (per the feature architecture):
 *  - pointer/drop calculations (threshold, elementFromPoint target lookup,
 *    Y-position -> snapped time via the shared HOUR_HEIGHT model)
 *  - emitting a single `onDrop(item, { date, time })` on a successful drop
 *
 * It never touches Firestore. Persistence lives in the consuming calender views
 * through the Task/Event contexts.
 *
 * Click vs drag: presses under the movement threshold never start a drag, and
 * a trailing click after a real drag is suppressed so popovers do not open.
 *
 * Drag feedback is handled by the per-slot hover styling on the grid cells the
 * pointer is currently over (CSS :hover), so the exact destination slot lights
 * up instead of an entire column or the whole page.
 */
export const useCalendarDragAndDrop = ({ onDrop }) => {
  const sessionRef = useRef(null);
  const lastDragEndRef = useRef(0);
  const onDropRef = useRef(onDrop);
  const [draggingItem, setDraggingItem] = useState(null);
  const [dragPoint, setDragPoint] = useState(null);

  useEffect(() => {
    onDropRef.current = onDrop;
  }, [onDrop]);

  const resolveDrop = useCallback((clientX, clientY) => {
    const target = findDropTarget(document.elementFromPoint(clientX, clientY));
    if (!target) return null;

    const date = parseGridDateKey(target.getAttribute("data-drop-date"));
    if (!date) return null;

    const kind = target.getAttribute("data-drop") || DROP_KIND_DATE;
    let time = null;
    if (kind === DROP_KIND_TIME) {
      const rect = target.getBoundingClientRect();
      time = timeFromDropOffset(clientY - rect.top);
    }
    return { date, time };
  }, []);

  const handlePointerMove = useCallback((event) => {
    const session = sessionRef.current;
    if (!session) return;

    if (!session.active) {
      if (!isDrag(event.clientX - session.startX, event.clientY - session.startY)) return;
      session.active = true;
      session.scrollEl = findScrollableAncestor(
        document.elementFromPoint(event.clientX, event.clientY)
      );
      setDraggingItem(session.item);
      setDragPoint({ x: event.clientX, y: event.clientY });
      document.body.classList.add("cal-dragging");
    }

    if (event.cancelable) event.preventDefault();

    const scrollEl = session.scrollEl;
    if (scrollEl) {
      if (event.clientY < EDGE_SCROLL_ZONE) scrollEl.scrollTop -= EDGE_SCROLL_STEP;
      else if (event.clientY > window.innerHeight - EDGE_SCROLL_ZONE) scrollEl.scrollTop += EDGE_SCROLL_STEP;
    }
  }, []);

  const endSession = useCallback(
    (event) => {
      const session = sessionRef.current;
      if (!session) return;
      const wasActive = session.active;
      sessionRef.current = null;
      document.body.classList.remove("cal-dragging");
      setDraggingItem(null);
      setDragPoint(null);

      if (!wasActive) return;
      lastDragEndRef.current = performance.now();
      const drop = resolveDrop(event.clientX, event.clientY);
      if (drop) onDropRef.current?.(session.item, drop);
    },
    [resolveDrop]
  );

  useEffect(() => {
    const onPointerMove = (event) => handlePointerMove(event);
    const onPointerUp = (event) => endSession(event);
    const onPointerCancel = (event) => endSession(event);
    const onKeyDown = (event) => {
      if (event.key === "Escape" && sessionRef.current) {
        sessionRef.current = null;
        document.body.classList.remove("cal-dragging");
        setDraggingItem(null);
        setDragPoint(null);
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("cal-dragging");
    };
  }, [handlePointerMove, endSession]);

  const startDrag = useCallback((event, item) => {
    if (!item || item.id == null) return;
    // Only primary mouse button / touch.
    if (event.button !== 0 && event.pointerType === "mouse") return;
    if (event.pointerType === "touch" && !event.isPrimary) return;
    if (sessionRef.current) return; // already dragging

    sessionRef.current = {
      item,
      active: false,
      startX: event.clientX,
      startY: event.clientY,
    };
  }, []);

  const getDragSourceProps = useCallback(
    (item, onItemClick) => {
      const startsDrag = (event) => startDrag(event, item);
      return {
        onPointerDown: startsDrag,
        onClick: (event) => {
          event.stopPropagation();
          // A real drag just ended: suppress the trailing synthetic click so
          // the popover never opens.
          if (performance.now() - lastDragEndRef.current < 300) return;
          onItemClick?.(item);
        },
      };
    },
    [startDrag]
  );

  const getDropTargetProps = useCallback(
    ({ date, kind = DROP_KIND_DATE }) => ({
      "data-drop": kind,
      "data-drop-date": gridDateKey(date),
    }),
    []
  );

  return {
    draggingItem,
    dragPoint,
    isDragging: !!draggingItem,
    getDragSourceProps,
    getDropTargetProps,
  };
};