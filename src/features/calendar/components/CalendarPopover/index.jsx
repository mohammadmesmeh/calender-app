import { IconBtn } from '@/components/buttons/IconBtn';
import { CONST } from "@/constants/const";
import { AddButtons } from "@/components/buttons/AddButtons";
import { ChevronLeft, ChevronRight, CalendarPlus } from 'lucide-react';
import { useDate } from '../../hooks/useDate';

export const CalendarPopover = () => {
    const {
        MONTH,
        YEAR,
        handleClickNextMonth,
        handleClickPrevMonth,
        monthName,
        NumFirstDayInMonth,
        PrevMonthDaysNumsArray,
        ThisMonthDaysNumsArray,
        thisDay,
        thisMonth,
        NextMonthDaysNumsArray,
        thisYear
    } = useDate()

    return (
        <div className="w-[280px] p-4 bg-surface rounded-card border border-border shadow-dropdown select-none">
            <div className="flex items-center justify-between mb-3">
                <IconBtn icon={ChevronLeft} onClick={handleClickPrevMonth} className="p-1.5" aria-label="Previous month" />
                <p className="text-sm font-bold text-text text-center">
                    {monthName} <span className="font-normal text-text-secondary">{YEAR}</span>
                </p>
                <IconBtn icon={ChevronRight} onClick={handleClickNextMonth} className="p-1.5" aria-label="Next month" />
            </div>

            <div className="grid grid-cols-7 mb-2">
                {CONST.DAYS__OF__WEEK.map((item, index) => (
                    <div key={index} className="text-center text-[10px] font-semibold text-text-muted uppercase tracking-wider py-1">
                        {item.slice(0, 2)}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-3">
                {NumFirstDayInMonth !== 0 && (
                    PrevMonthDaysNumsArray.slice(-NumFirstDayInMonth).map((item, index) => (
                        <DayNum key={`prev-${index}`} content={item} isOutsideMonth />
                    ))
                )}

                {ThisMonthDaysNumsArray.map((item, index) => {
                    const isToday = item === thisDay && thisMonth === MONTH && thisYear === YEAR
                    return (
                        <DayNum
                            key={`curr-${index}`}
                            content={item}
                            isToday={isToday}
                        />
                    )
                })}

                {(() => {
                    const remaining = 42 - NumFirstDayInMonth - ThisMonthDaysNumsArray.length
                    return NextMonthDaysNumsArray.slice(0, remaining).map((item, index) => (
                        <DayNum key={`next-${index}`} content={item} isOutsideMonth />
                    ))
                })()}
            </div>

            <hr className="border-border mb-3" />

            <div className="flex justify-end">
                <AddButtons content="Add Event">
                    <CalendarPlus size={14} />
                </AddButtons>
            </div>
        </div>
    )
}
