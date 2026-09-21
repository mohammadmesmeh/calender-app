import { HOUR_LABELS, HOUR_HEIGHT } from "../../utils/calendarUtils";

/**
 * The time-label column shared by Week and Day views. Renders the 24
 * English hour labels, one per time slot.
 *
 * Each label is positioned relative to the TOP edge of its slot so the time
 * acts as the caption for the horizontal grid line that begins at that edge
 * (label first, then the line) instead of trailing behind it.
 */
export const TimeGutter = ({ className = "" }) => (
  <div
    role="presentation"
    aria-hidden="true"
    className={`shrink-0 select-none ${className}`}
  >
    {HOUR_LABELS.map((label) => (
      <div
        key={label}
        className="relative border-b border-border/20"
        style={{ height: HOUR_HEIGHT }}
      >
        <span className="absolute right-2 top-0 -translate-y-1/2 text-[10px] md:text-xs font-medium leading-none text-text-muted tabular-nums">
          {label}
        </span>
      </div>
    ))}
  </div>
);