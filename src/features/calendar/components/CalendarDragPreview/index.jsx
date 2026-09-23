import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocalization } from "@/i18n/LocalizationProvider";
import { formatStoredTime } from "@/i18n/time";

const OFFSET_X = 12;
const OFFSET_Y = 16;

const DROP_ICON_STYLES = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  warning: "bg-warning",
  success: "bg-success",
  danger: "bg-danger",
};

/**
 * Lightweight portal-rendered ghost that follows the pointer while an item is
 * being dragged. Position updates touch the portal DOM node directly (no React
 * re-render per pointer move), so dragging never re-renders the calendar grid.
 */
export const CalendarDragPreview = ({ item, startPoint }) => {
  const ghostRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    const anchor = startPoint && startPoint.x != null ? startPoint : { x: 0, y: 0 };
    const apply = (x, y) => {
      const node = ghostRef.current;
      if (node) {
        node.style.transform = `translate3d(${x + OFFSET_X}px, ${y + OFFSET_Y}px, 0)`;
      }
    };

    apply(anchor.x, anchor.y);

    const onPointerMove = (event) => apply(event.clientX, event.clientY);
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [item, startPoint]);

  const { locale } = useLocalization();
  if (!item) return null;

  const dotClass = DROP_ICON_STYLES[item.color] || "bg-primary";
  const timeLabel = item.time ? formatStoredTime(item.time, locale) : "";

  return createPortal(
    <div
      ref={ghostRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
    >
      <div className="flex items-center gap-1.5 rounded-[3px] border border-primary/40 bg-surface px-2 py-1.5 shadow-dropdown">
        <span className={`shrink-0 w-[3px] h-3 rounded-full ${dotClass}`} />
        <span className="max-w-[160px] truncate text-[11px] font-medium text-text">
          {item.title}
        </span>
        {timeLabel && (
          <span className="shrink-0 text-[10px] text-text-secondary">{timeLabel}</span>
        )}
      </div>
    </div>,
    document.body
  );
};