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
import { useCalendarDate } from "../../context/CalendarDateContext/useCalendarDate";
import { useCalendarOverlay } from "../../context/CalendarOverlayContext";
import { useCalendarData } from "../../hooks/useCalendarData";
import { getWeekDays, isSameDay } from "../../utils/calendarUtils";
import { CalendarViewSwitcher } from "../CalendarViewSwitcher";
import { useLocalization } from "@/i18n/LocalizationProvider";

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

const titleFor = (viewKey, viewDate, { month, weekday, dateFull }) => {
  if (viewKey === "week") {
    const days = getWeekDays(viewDate);
    const start = days[0];
    const end = days[6];
    const startMonth = month(start, "long");
    return start.getMonth() === end.getMonth()
      ? `${startMonth} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`
      : `${month(start, "short")} ${start.getDate()} - ${month(end, "short")} ${end.getDate()}, ${end.getFullYear()}`;
  }
  if (viewKey === "day") {
    return `${weekday(viewDate, "long")}, ${dateFull(viewDate)}`;
  }
  return `${month(viewDate, "long")} ${viewDate.getFullYear()}`;
};

export const CalendarNavigation = () => {
  const { pathname } = useLocation();
  const viewKey = viewKeyFor(pathname);
  const { t, dir, month, weekday, dateFull } = useLocalization();
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

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

  const title = titleFor(viewKey, viewDate, { month, weekday, dateFull });
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
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label={t('calendar.calendarView')}>
      <CalendarViewSwitcher />

      <h2 className="hidden md:flex items-center gap-2 text-sm lg:text-base font-semibold text-text select-none truncate" aria-hidden="true">
        <Icon size={16} className="text-primary" aria-hidden="true" />
        <span className="sr-only">{`${t(`calendar.${viewKey}`)}: `}</span>
        <span className="truncate">{title}</span>
      </h2>

      <div className="flex items-center gap-1.5" role="group" aria-label={t('calendar.calendarView')}>
        <button
          type="button"
          onClick={prev}
          className="rounded-button bg-background p-2 shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label={`${t('calendar.previous')} ${t(`calendar.${viewKey}`)}`}
        >
          <PrevIcon size={18} className="text-text" />
        </button>

        <button
          type="button"
          onClick={goToday}
          disabled={isToday}
          className="rounded-button bg-background px-3 py-2 text-xs md:text-sm font-medium text-text shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-40 disabled:pointer-events-none"
          aria-label={t('calendar.goToToday')}
        >
          {t('calendar.today')}
        </button>

        <button
          type="button"
          onClick={next}
          className="rounded-button bg-background p-2 shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label={`${t('calendar.next')} ${t(`calendar.${viewKey}`)}`}
        >
          <NextIcon size={18} className="text-text" />
        </button>
      </div>

      <span className="hidden min-[480px]:block mx-1 h-6 w-px bg-border" aria-hidden="true" />

      <button
        type="button"
        onClick={() => openAdd(viewDate)}
        className="flex items-center gap-1.5 rounded-button bg-primary px-3 py-2 text-xs md:text-sm font-medium text-white shadow-subtle transition-all duration-200 ease-out hover:bg-primary/90 hover:shadow-card active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        aria-label={t('calendar.addNewItem')}
      >
        <CirclePlus size={16} className="hidden sm:block" />
        <span className="sm:hidden">{t('calendar.add')}</span>
        <span className="hidden sm:inline">{t('calendar.add')}</span>
      </button>

      {isLoading && (
        <span className="inline-flex items-center gap-1.5 text-text-muted" title={t('calendar.loadingItems')} role="status">
          <Loader2 size={14} className="animate-spin" aria-label={t('calendar.loadingItems')} />
        </span>
      )}

      {!isLoading && error && (
        <span
          className="inline-flex items-center gap-1.5 text-text-muted"
          title={t('calendar.loadError')}
        >
          <CloudAlert size={14} className="text-warning" aria-label={t('calendar.loadError')} />
        </span>
      )}
    </div>
  );
};