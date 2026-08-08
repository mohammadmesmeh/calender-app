import { CONST } from "@/constants/const";
import { useDate } from "../../hooks/useDate"
import { BaseCalendarDay } from "../BaseCalendarDay";
import { IconBtn } from '@/components/buttons/IconBtn'
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export const MonthCalendar = () => {
    const {
        ThisMonthDaysNumsArray,
        NumFirstDayInMonth,
        PrevMonthDaysNumsArray,
        NextMonthDaysNumsArray,
        nextMonthName,
        prevMonthName,
        handleClickNextMonth,
        handleClickPrevMonth,
        monthName,
        thisMonth,
        DAY,
        MONTH,
        YEAR,
        thisYear,
        thisDay
    } = useDate();

    const handleTodayClick = () => {
        const today = new Date()
        const diff = (today.getFullYear() - YEAR) * 12 + (today.getMonth() - MONTH)
        if (diff > 0) {
            for (let i = 0; i < diff; i++) handleClickNextMonth()
        } else if (diff < 0) {
            for (let i = 0; i < -diff; i++) handleClickPrevMonth()
        }
    }

    const isCurrentMonth = thisMonth === MONTH && thisYear === YEAR

    const allCells = [
        ...(NumFirstDayInMonth !== 0
            ? PrevMonthDaysNumsArray.slice(-NumFirstDayInMonth).map((item, index) => {
                const dayOfWeek = index % 7
                return { key: `prev-${index}`, day: item, month: prevMonthName.slice(0, 3), isOutsideMonth: true, isWeekend: dayOfWeek === 0 || dayOfWeek === 6, isToday: false, isSelected: false }
            })
            : []),
        ...ThisMonthDaysNumsArray.map((item, index) => {
            const dayOfWeek = (NumFirstDayInMonth + index) % 7
            const isToday = item === thisDay && isCurrentMonth
            const isSelected = item === DAY && MONTH === thisMonth && YEAR === thisYear
            return { key: `curr-${index}`, day: item, month: null, isOutsideMonth: false, isWeekend: dayOfWeek === 0 || dayOfWeek === 6, isToday, isSelected }
        }),
        ...(() => {
            const remaining = 42 - NumFirstDayInMonth - ThisMonthDaysNumsArray.length
            return NextMonthDaysNumsArray.slice(0, remaining).map((item, index) => {
                const dayOfWeek = (NumFirstDayInMonth + ThisMonthDaysNumsArray.length + index) % 7
                return { key: `next-${index}`, day: item, month: nextMonthName.slice(0, 3), isOutsideMonth: true, isWeekend: dayOfWeek === 0 || dayOfWeek === 6, isToday: false, isSelected: false }
            })
        })()
    ]

    const totalCells = allCells.length

    return (
        <div className="flex flex-col flex-1 bg-surface overflow-hidden">
            <div className="sticky top-0 z-10 bg-surface border-b border-border">
                <div className="flex items-center justify-between px-3 md:px-5 pt-2 md:pt-3 pb-1.5">
                    <div className="flex items-center gap-0.5">
                        <IconBtn icon={ChevronLeft} onClick={handleClickPrevMonth} aria-label="Previous month" />
                        <button
                            type="button"
                            onClick={handleTodayClick}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-button bg-background border border-border shadow-subtle text-xs md:text-sm font-medium text-text hover:bg-border/70 hover:shadow-card active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            aria-label="Go to today"
                        >
                            <Calendar size={14} />
                            <span className="hidden sm:inline">Today</span>
                        </button>
                        <IconBtn icon={ChevronRight} onClick={handleClickNextMonth} aria-label="Next month" />
                    </div>

                    <h2 className="text-base md:text-xl font-semibold text-text select-none">
                        {monthName} <span className="font-normal text-text-secondary">{YEAR}</span>
                    </h2>

                    <div className="w-20 md:w-28" />
                </div>

                <div className="grid grid-cols-7 px-3 md:px-5 pb-1.5 md:pb-2">
                    {CONST.DAYS__OF__WEEK.map((item, index) => (
                        <div
                            key={index}
                            className="text-center text-[10px] md:text-xs font-medium text-text-muted uppercase tracking-wider"
                        >
                            <span className="hidden sm:inline">{item}</span>
                            <span className="sm:hidden">{item.slice(0, 3)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="grid grid-cols-7 border-border border-b">
                    {allCells.map((cell, index) => {
                        const isLastRow = index >= totalCells - 7
                        return (
                            <div
                                key={cell.key}
                                className={`border-r border-border ${!isLastRow ? 'border-b' : ''} ${cell.isOutsideMonth ? 'bg-background/40' : ''}`}
                            >
                                <BaseCalendarDay
                                    day={cell.day}
                                    Month={cell.month}
                                    isToday={cell.isToday}
                                    isSelected={cell.isSelected}
                                    isOutsideMonth={cell.isOutsideMonth}
                                    isWeekend={cell.isWeekend}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
