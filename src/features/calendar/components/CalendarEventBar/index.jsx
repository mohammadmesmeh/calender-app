import { Check } from "lucide-react";
import { useLocalization } from "@/i18n/LocalizationProvider";
import { formatStoredTime } from "@/i18n/time";

const DAY_ICON_STYLES = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  warning: "bg-warning",
  success: "bg-success",
  danger: "bg-danger",
};

/**
 * Renders a single calendar item (task/event) inside a calendar cell.
 *
 * The bar stays primarily presentational. Drag behaviour is composable: the
 * parent spreads `getDragSourceProps(item, onClick)` from the calendar DnD hook
 * onto this component, which supplies the pointer handlers and the
 * click-vs-drag guard.
 */
export const CalendarEventBar = ({
  event,
  completed = false,
  onClick,
  onPointerDown,
  isDragging = false,
  className = "",
}) => {
  const { locale } = useLocalization();
  const dotClass = DAY_ICON_STYLES[event.color] || "bg-primary";
  const timeLabel = event.time ? formatStoredTime(event.time, locale) : "";

  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      onClick={onClick}
      className={`group flex items-center gap-1.5 rounded-[3px] bg-primary/[0.12] px-1.5 py-1 text-start transition-colors duration-100 hover:bg-primary/[0.18] active:bg-primary/[0.22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 select-none cursor-grab touch-none ${
        isDragging ? "opacity-60" : ""
      } ${className}`}
      aria-label={`${event.title}${timeLabel ? ` at ${timeLabel}` : ""}`}
    >
      {completed && <Check size={11} className="shrink-0 text-success" strokeWidth={3} />}
      <span className={`shrink-0 w-[3px] h-3 rounded-full ${dotClass}`} />
      <span className={`min-w-0 flex-1 truncate text-[10px] md:text-[11px] font-medium leading-tight ${completed ? "text-text-muted line-through" : "text-text"}`} dir="auto">
        {event.title}
      </span>
      {timeLabel && (
        <span className="shrink-0 text-[9px] md:text-[10px] text-text-secondary leading-tight hidden md:inline">
          {timeLabel}
        </span>
      )}
    </button>
  );
};