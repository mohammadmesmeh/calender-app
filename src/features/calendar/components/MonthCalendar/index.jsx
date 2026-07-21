import { CONST } from "@/constants/const";
import { useDate } from "../../hooks/useDate"
import { BaseCalendarDay } from "../BaseCalendarDay";
import { IconBtn } from '@/components/buttons/IconBtn'
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

import { useRef } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

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
    const carouselRef = useRef(null)
    const { scrollYProgress } = useScroll({
        container: carouselRef
    })

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

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

    return (
        <div ref={carouselRef} className="relative flex flex-col flex-1 bg-surface rounded-section shadow-subtle overflow-x-hidden overflow-y-auto">
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    transformOrigin: "left",
                    backgroundColor: "hsl(var(--primary))",
                    zIndex: 20,
                }}
            />

            <div className="sticky top-0 bg-surface/80 backdrop-blur-md z-10 border-b border-border">
                <div className="flex items-center justify-between px-3 md:px-6 pt-3 pb-2">
                    <div className="flex items-center gap-1">
                        <IconBtn icon={ChevronLeft} onClick={handleClickPrevMonth} aria-label="Previous month" />
                        <button
                            type="button"
                            onClick={handleTodayClick}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-button bg-background border border-border shadow-subtle text-xs md:text-sm font-medium text-text hover:bg-border/70 hover:shadow-card active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            aria-label="Go to today"
                        >
                            <Calendar size={14} />
                            <span className="hidden sm:inline">Today</span>
                        </button>
                        <IconBtn icon={ChevronRight} onClick={handleClickNextMonth} aria-label="Next month" />
                    </div>

                    <h2 className="text-base md:text-lg font-bold text-text select-none">
                        {monthName} <span className="font-normal text-text-secondary">{YEAR}</span>
                    </h2>

                    <div className="w-20 md:w-28" />
                </div>

                <div className="grid grid-cols-7 gap-px px-3 md:px-6 pb-1.5">
                    {CONST.DAYS__OF__WEEK.map((item, index) => (
                        <div
                            key={index}
                            className="text-center text-[10px] md:text-xs font-semibold text-text-muted uppercase tracking-wider"
                        >
                            <span className="hidden sm:inline">{item}</span>
                            <span className="sm:hidden">{item.slice(0, 3)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-border/50 px-3 md:px-6 py-3 flex-1" role="grid" aria-label="Calendar grid">
                {NumFirstDayInMonth !== 0 && (
                    PrevMonthDaysNumsArray.slice(-NumFirstDayInMonth).map((item, index) => {
                        const dayOfWeek = (index) % 7
                        return (
                            <BaseCalendarDay
                                key={`prev-${index}`}
                                Month={`${prevMonthName.slice(0, 3)}`}
                                day={item}
                                isOutsideMonth
                                isWeekend={dayOfWeek === 0 || dayOfWeek === 6}
                            />
                        )
                    })
                )}

                {ThisMonthDaysNumsArray.map((item, index) => {
                    const dayOfWeek = (NumFirstDayInMonth + index) % 7
                    const isToday = item === thisDay && isCurrentMonth
                    const isSelected = item === DAY && MONTH === thisMonth && YEAR === thisYear

                    return (
                        <BaseCalendarDay
                            key={`curr-${index}`}
                            day={item}
                            isToday={isToday}
                            isSelected={isSelected}
                            isWeekend={dayOfWeek === 0 || dayOfWeek === 6}
                        />
                    )
                })}

                {(() => {
                    const remaining = 42 - NumFirstDayInMonth - ThisMonthDaysNumsArray.length
                    return NextMonthDaysNumsArray.slice(0, remaining).map((item, index) => {
                        const dayOfWeek = (NumFirstDayInMonth + ThisMonthDaysNumsArray.length + index) % 7
                        return (
                            <BaseCalendarDay
                                key={`next-${index}`}
                                Month={`${nextMonthName.slice(0, 3)}`}
                                day={item}
                                isOutsideMonth
                                isWeekend={dayOfWeek === 0 || dayOfWeek === 6}
                            />
                        )
                    })
                })()}
            </div>
        </div>
    )
}
