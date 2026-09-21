import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { CONST } from "@/constants/const"
import { useDate } from "../../hooks/useDate"
import { CurrentTimeLine } from "../CurrentTimeLine"
import { IconBtn } from "@/components/buttons/IconBtn"

export const DayCalendar = () => {
    const { hoursOfDay, dayInWeek, DAY, MONTH, YEAR, handleClickNextDay,
        handleClickPrevDay, thisDay, thisMonth } = useDate()

    const isToday = DAY === thisDay && MONTH === thisMonth

    const handleTodayClick = () => {
        const diff = (new Date().getTime() - new Date(YEAR, MONTH, DAY).getTime()) / (1000 * 60 * 60 * 24)
        const absDiff = Math.abs(diff)
        if (diff > 0) {
            for (let i = 0; i < absDiff; i++) handleClickNextDay()
        } else if (diff < 0) {
            for (let i = 0; i < absDiff; i++) handleClickPrevDay()
        }
    }

    return (
        <div className="flex flex-col flex-1 bg-surface overflow-hidden">

            {/* Navigation */}
            <div className="flex items-center justify-between px-3 md:px-5 pt-2 md:pt-3 pb-1.5 border-b border-border bg-surface">
                <div className="flex items-center gap-0.5">
                    <IconBtn icon={ChevronLeft} onClick={handleClickPrevDay} aria-label="Previous day" />
                    <button
                        type="button"
                        onClick={handleTodayClick}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-button bg-background border border-border shadow-subtle text-xs md:text-sm font-medium text-text hover:bg-border/70 hover:shadow-card active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        aria-label="Go to today"
                    >
                        <Calendar size={14} />
                        <span className="hidden sm:inline">Today</span>
                    </button>
                    <IconBtn icon={ChevronRight} onClick={handleClickNextDay} aria-label="Next day" />
                </div>

                <div className="text-center">
                    <h3 className="text-sm md:text-lg font-semibold text-text">
                        {CONST.DAYS__OF__WEEK[dayInWeek]}
                    </h3>
                    <p className="text-[11px] md:text-sm text-text-secondary">
                        {CONST.MONTHS__OF__YEAR[MONTH]} {DAY}, {YEAR}
                    </p>
                </div>

                <div className="w-20 md:w-28" />
            </div>

            {/* Scrollable time grid */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-minimal">
                <div className="flex px-3 md:px-5 pt-3 relative">
                    <div className="w-14 md:w-16 shrink-0">
                        {hoursOfDay.map((i, index) => (
                            <div key={index} className="h-14 flex items-start justify-end pr-2 md:pr-3 pt-0">
                                <span className="text-[10px] md:text-xs text-text-muted font-medium leading-none -mt-2">
                                    {i.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 relative border-l border-border">
                        {isToday && <CurrentTimeLine />}
                        {hoursOfDay.map((i, index) => (
                            <div
                                key={index}
                                className="h-14 border-b border-border/40 hover:bg-primary-light/[0.04] transition-colors duration-100"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
