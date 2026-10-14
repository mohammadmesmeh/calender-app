import { useMemo } from 'react';
import { IconBtn } from '@/components/buttons/IconBtn';
import { AddButtons } from "@/components/buttons/AddButtons";
import { ChevronLeft, ChevronRight, CalendarPlus } from 'lucide-react';
import { useDate } from '../../hooks/useDate';
import { useLocalization } from '@/i18n/LocalizationProvider';

import { resolveWeekStartDay } from '../../utils/calendarUtils';

export const CalendarPopover = () => {
    const {
        MONTH,
        YEAR,
        handleClickNextMonth,
        handleClickPrevMonth,
        monthName,
        ThisMonthDaysNumsArray,
        PrevMonthDaysNumsArray,
        NextMonthDaysNumsArray,
        thisDay,
        thisMonth,
        thisYear
    } = useDate()
    const { t, dir, weekday, weekStart } = useLocalization();
    const PrevIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;
    const NextIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

    const startDayIndex = resolveWeekStartDay(weekStart);

    const weekdayHeaders = useMemo(() => {
        const base = new Date(2024, 0, 7 + startDayIndex);
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(base);
            date.setDate(base.getDate() + i);
            return weekday(date, "short");
        });
    }, [weekday, startDayIndex]);

    const leadingDaysCount = useMemo(() => {
        const firstDay = new Date(YEAR, MONTH, 1).getDay();
        return (firstDay - startDayIndex + 7) % 7;
    }, [YEAR, MONTH, startDayIndex]);

    return (
        <div className="w-[280px] p-4 bg-surface rounded-card border border-border shadow-dropdown select-none">
            <div className="flex items-center justify-between mb-3">
                <IconBtn icon={PrevIcon} onClick={handleClickPrevMonth} className="p-1.5" aria-label={`${t('calendar.previous')} ${t('calendar.month')}`} />
                <p className="text-sm font-bold text-text text-center">
                    {monthName} <span className="font-normal text-text-secondary">{YEAR}</span>
                </p>
                <IconBtn icon={NextIcon} onClick={handleClickNextMonth} className="p-1.5" aria-label={`${t('calendar.next')} ${t('calendar.month')}`} />
            </div>

            <div className="grid grid-cols-7 mb-2">
                {weekdayHeaders.map((label, index) => (
                    <div key={index} className="text-center text-[10px] font-semibold text-text-muted uppercase tracking-wider py-1">
                        {label.slice(0, 2)}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-3">
                {leadingDaysCount !== 0 && (
                    PrevMonthDaysNumsArray.slice(-leadingDaysCount).map((item, index) => (
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
                    const remaining = 42 - leadingDaysCount - ThisMonthDaysNumsArray.length
                    return NextMonthDaysNumsArray.slice(0, remaining).map((item, index) => (
                        <DayNum key={`next-${index}`} content={item} isOutsideMonth />
                    ))
                })()}
            </div>

            <hr className="border-border mb-3" />

            <div className="flex justify-end">
                <AddButtons content={t('calendar.addEvent')}>
                    <CalendarPlus size={14} />
                </AddButtons>
            </div>
        </div>
    )
}
