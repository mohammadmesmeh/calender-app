import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useDate } from "../../hooks/useDate";
import { CONST } from "@/constants/const";
import { IconBtn } from "@/components/buttons/IconBtn";
import { CurrentTimeLine } from "../CurrentTimeLine";

export const WeekCalendar = () => {

    const {
        handleClickNextWeek,
        handleClickPrevWeek,
        DAY,
        MONTH,
        YEAR,
        thisDay,
        thisMonth,
        thisYear,
        hoursOfDay,
        timezone,
        getWeekDays,
    } = useDate();

    const parts = timezone.split('/');
    const weekDays = getWeekDays();

    const handleTodayClick = () => {
        const today = new Date()
        const currentDay = weekDays[0]
        const diff = today.getDate() - currentDay.getDate()
        // Approximation - just go back/forward by enough weeks
        if (diff > 3) {
            for (let i = 0; i < Math.ceil(diff / 7); i++) handleClickNextWeek()
        } else if (diff < -3) {
            for (let i = 0; i < Math.ceil(-diff / 7); i++) handleClickPrevWeek()
        }
    }

    return (
        <div className="flex flex-col flex-1 bg-surface rounded-section shadow-subtle overflow-hidden">

            {/* Navigation */}
            <div className="flex items-center justify-between px-3 md:px-6 pt-3 pb-2 border-b border-border bg-surface/60">
                <div className="flex items-center gap-1">
                    <IconBtn icon={ChevronLeft} onClick={handleClickPrevWeek} aria-label="Previous week" />
                    <button
                        type="button"
                        onClick={handleTodayClick}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-button bg-background border border-border shadow-subtle text-xs md:text-sm font-medium text-text hover:bg-border/70 hover:shadow-card active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        aria-label="Go to today"
                    >
                        <Calendar size={14} />
                        <span className="hidden sm:inline">Today</span>
                    </button>
                    <IconBtn icon={ChevronRight} onClick={handleClickNextWeek} aria-label="Next week" />
                </div>

                <h2 className="text-sm md:text-base font-semibold text-text">
                    {CONST.MONTHS__OF__YEAR[MONTH]} {YEAR}
                </h2>

                <div className="w-20 md:w-28" />
            </div>

            {/* Header */}
            <div className="grid grid-cols-[40px_repeat(7,minmax(0,1fr))] md:grid-cols-[56px_repeat(7,minmax(0,1fr))] px-3 md:px-6 pt-3 pb-2 border-b border-border bg-surface/40" role="row" aria-label="Week days header">
                <div className="text-[8px] md:text-[10px] text-text-muted font-light leading-tight self-end pb-1">
                    <span className="block truncate">{parts[0]}/</span>
                    {parts[1] && <span className="block truncate">{parts[1]}</span>}
                </div>

                {weekDays.map((item, index) => {
                    const isToday =
                        item.getDate() === thisDay &&
                        item.getMonth() === thisMonth &&
                        item.getFullYear() === thisYear;

                    return (
                        <div
                            key={index}
                            className={`text-center pb-1 ${isToday ? '' : ''}`}
                        >
                            <div className={`text-[9px] md:text-xs font-semibold uppercase text-text-muted`}>
                                {CONST.DAYS__OF__WEEK[item.getDay()].slice(0, 3)}
                            </div>
                            <div className={`text-xs md:text-sm font-bold mt-0.5 inline-flex items-center justify-center
                                ${isToday
                                    ? 'bg-primary text-white w-7 h-7 md:w-8 md:h-8 rounded-full'
                                    : 'text-text w-7 h-7 md:w-8 md:h-8'
                                }`}
                            >
                                {item.getDate()}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-minimal">
                <div className="grid grid-cols-[40px_repeat(7,minmax(0,1fr))] md:grid-cols-[56px_repeat(7,minmax(0,1fr))] px-3 md:px-6 relative">
                    {/* Hour labels */}
                    <div className="sticky left-0 bg-surface z-10">
                        {hoursOfDay.map((i, index) => (
                            <div key={index} className="h-[52px] md:h-[60px] flex items-start justify-end pr-1.5 md:pr-2 pt-0">
                                <span className="text-[9px] md:text-[11px] text-text-muted font-medium leading-none -mt-1.5">
                                    {i.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Day columns */}
                    {weekDays.map((item, index) => {
                        const isToday =
                            item.getDate() === thisDay &&
                            item.getMonth() === thisMonth &&
                            item.getFullYear() === thisYear;

                        return (
                            <div key={index} className="border-l border-border relative" role="gridcell">
                                {hoursOfDay.map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[52px] md:h-[60px] border-b border-border/50 hover:bg-primary-light/10 transition-colors duration-100"
                                    />
                                ))}
                                {isToday && <CurrentTimeLine />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
