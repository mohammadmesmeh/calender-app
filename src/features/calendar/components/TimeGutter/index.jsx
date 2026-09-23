import { HOUR_HEIGHT } from "../../utils/calendarUtils";
import { useLocalization } from "@/i18n/LocalizationProvider";

/**
 * The time-label column shared by Week and Day views. Renders the 24
 * localized hour labels, one per time slot.
 *
 * Each label is positioned relative to the TOP edge of its slot so the time
 * acts as the caption for the horizontal grid line that begins at that edge
 * (label first, then the line) instead of trailing behind it.
 */
export const TimeGutter = ({ className = "" }) => {
  const { time } = useLocalization();

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`shrink-0 select-none ${className}`}
    >
      {Array.from({ length: 24 }, (_, hour) => {
        const date = new Date(2024, 0, 1, hour, 0, 0, 0);
        return (
          <div
            key={hour}
            className="relative border-b border-border/20"
            style={{ height: HOUR_HEIGHT }}
          >
            <span className="absolute end-2 top-0 -translate-y-1/2 text-[10px] md:text-xs font-medium leading-none text-text-muted tabular-nums">
              {time(date)}
            </span>
          </div>
        );
      })}
    </div>
  );
};