import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  Loader2,
  CloudAlert,
} from "lucide-react";
import { CONST } from "@/constants/const";
import { useCalendarDate } from "../../context/CalendarDateContext/useCalendarDate";
import { useCalendarOverlay } from "../../context/CalendarOverlayContext";
import { useCalendarData } from "../../hooks/useCalendarData";
import { getWeekDays, isSameDay } from "../../utils/calendarUtils";
import { CalendarViewSwitcher } from "../CalendarViewSwitcher";

const VIEW_ICONS = {
  month: CalendarDays,
  week: CalendarRange,
  day: CalendarCheck,
};

const viewKeyFor = (pathname) => {
  if (pathname === "/week") return "week";
  if (pathname === "/day") return "day";
  return "month";
};

const titleFor = (viewKey, viewDate) => {
  if (viewKey === "week") {
    const days = getWeekDays(viewDate);
    const start = days[0];
    const end = days[6];
    const startMonth = CONST.MONTHS__OF__YEAR[start.getMonth()];
    const endMonth = CONST.MONTHS__OF__YEAR[end.getMonth()];
    return start.getMonth() === end.getMonth()
      ? `${startMonth} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`
      : `${startMonth.slice(0, 3)} ${start.getDate()} - ${endMonth.slice(0, 3)} ${end.getDate()}, ${end.getFullYear()}`;
  }
  if (viewKey === "day") {
    return `${CONST.DAYS__OF__WEEK[viewDate.getDay()]}, ${CONST.MONTHS__OF__YEAR[viewDate.getMonth()]} ${viewDate.getDate()}, ${viewDate.getFullYear()}`;
  }
  return `${CONST.MONTHS__OF__YEAR[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
};

export const CalendarNavigation = () => {
  const { pathname } = useLocation();
  const viewKey = viewKeyFor(pathname);

  const {
    viewDate,
    goNextMonth,
    goPrevMonth,
    goNextWeek,
    goPrevWeek,
    goNextDay,
    goPrevDay,
    goToday,
  } = useCalendarDate();

  const { openAdd } = useCalendarOverlay();
  const { isLoading, error } = useCalendarData();

  const { prev, next } = useMemo(() => {
    if (viewKey === "week") return { prev: goPrevWeek, next: goNextWeek };
    if (viewKey === "day") return { prev: goPrevDay, next: goNextDay };
    return { prev: goPrevMonth, next: goNextMonth };
  }, [viewKey, goNextMonth, goPrevMonth, goNextWeek, goPrevWeek, goNextDay, goPrevDay]);

  const title = titleFor(viewKey, viewDate);
  const today = new Date();
  let isToday;
  if (viewKey === "week") {
    isToday = getWeekDays(viewDate).some((d) => isSameDay(d, today));
  } else if (viewKey === "day") {
    isToday = isSameDay(viewDate, today);
  } else {
    isToday = viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth();
  }

  const Icon = VIEW_ICONS[viewKey];

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Calendar navigation">
      <CalendarViewSwitcher />

      <h2 className="hidden md:flex items-center gap-2 text-sm lg:text-base font-semibold text-text select-none truncate" aria-hidden="true">
        <Icon size={16} className="text-primary" aria-hidden="true" />
        <span className="sr-only">{`${viewKey} view: `}</span>
        <span className="truncate">{title}</span>
      </h2>

      <div className="flex items-center gap-1.5" role="group" aria-label="Change calendar period">
        <button
          type="button"
          onClick={prev}
          className="rounded-button bg-background p-2 shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label={`Previous ${viewKey}`}
        >
          <ChevronLeft size={18} className="text-text" />
        </button>

        <button
          type="button"
          onClick={goToday}
          disabled={isToday}
          className="rounded-button bg-background px-3 py-2 text-xs md:text-sm font-medium text-text shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Go to today"
        >
          Today
        </button>

        <button
          type="button"
          onClick={next}
          className="rounded-button bg-background p-2 shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label={`Next ${viewKey}`}
        >
          <ChevronRight size={18} className="text-text" />
        </button>
      </div>

      <span className="hidden min-[480px]:block mx-1 h-6 w-px bg-border" aria-hidden="true" />

      <button
        type="button"
        onClick={() => openAdd(viewDate)}
        className="flex items-center gap-1.5 rounded-button bg-primary px-3 py-2 text-xs md:text-sm font-medium text-white shadow-subtle transition-all duration-200 ease-out hover:bg-primary/90 hover:shadow-card active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        aria-label="Add new item"
      >
        <CirclePlus size={16} className="hidden sm:block" />
        <span className="sm:hidden">Add</span>
        <span className="hidden sm:inline">Add</span>
      </button>

      {isLoading && (
        <span className="inline-flex items-center gap-1.5 text-text-muted" title="Loading calendar items" role="status">
          <Loader2 size={14} className="animate-spin" aria-label="Loading calendar items" />
        </span>
      )}

      {!isLoading && error && (
        <span
          className="inline-flex items-center gap-1.5 text-text-muted"
          title="Some items could not be loaded. Your changes are saved locally."
        >
          <CloudAlert size={14} className="text-warning" aria-label="Sync issue" />
        </span>
      )}
    </div>
  );
};