export const BaseCalendarDay = ({
    day,
    children,
    Month,
    isToday,
    isSelected,
    isOutsideMonth,
    isWeekend,
}) => {
    return (
        <div
            role="gridcell"
            aria-label={`${Month ? Month + ' ' : ''}${day}`}
            className={`
                min-h-[80px] md:min-h-[100px] lg:min-h-[110px]
                p-1 md:p-1.5
                flex flex-col
                transition-colors duration-100
                cursor-pointer
                select-none
                group
                ${isToday ? 'z-10' : ''}
                ${isOutsideMonth ? 'bg-background/30' : ''}
                ${isWeekend && !isOutsideMonth ? 'bg-background/20' : ''}
                hover:bg-primary-light/[0.07]
            `}
        >
            <div className="flex items-center justify-between mb-0.5 px-0.5">
                <span
                    className={`
                        inline-flex items-center justify-center
                        text-[11px] md:text-sm font-medium
                        min-w-[22px] md:min-w-[26px]
                        h-[22px] md:h-[26px]
                        ${isToday
                            ? 'bg-primary text-white w-[22px] md:w-[26px] rounded-full'
                            : isSelected
                                ? 'border-2 border-primary text-primary w-[22px] md:w-[26px] rounded-full'
                                : isOutsideMonth
                                    ? 'text-text-muted'
                                    : 'text-text'
                        }
                        ${!isToday && !isSelected && !isOutsideMonth ? 'group-hover:bg-background/80 rounded-full' : ''}
                    `}
                >
                    {day}
                </span>
                {Month && (
                    <span className="text-[8px] md:text-[10px] text-text-muted font-medium leading-none">
                        {Month}
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col gap-0.5 mt-0.5 overflow-hidden px-0.5">
                {children}
            </div>
        </div>
    )
}
