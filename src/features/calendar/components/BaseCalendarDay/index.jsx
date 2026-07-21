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
                bg-surface
                flex flex-col
                transition-all duration-150
                cursor-pointer
                select-none
                ${isToday ? 'ring-2 ring-primary ring-inset z-10' : ''}
                ${isSelected && !isToday ? 'ring-2 ring-primary/40 ring-inset' : ''}
                ${isOutsideMonth ? 'bg-background/40' : ''}
                ${isWeekend && !isOutsideMonth ? 'bg-background/30' : ''}
                hover:bg-primary-light/20
            `}
        >
            <div className="flex items-center justify-between mb-0.5">
                <span
                    className={`
                        inline-flex items-center justify-center
                        text-[10px] md:text-xs font-semibold
                        min-w-[20px] md:min-w-[24px]
                        h-5 md:h-6
                        rounded-full
                        ${isToday
                            ? 'bg-primary text-white w-5 md:w-6'
                            : isOutsideMonth
                                ? 'text-text-muted'
                                : 'text-text'
                        }
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

            <div className="flex-1 flex flex-col gap-0.5 mt-0.5 overflow-hidden">
                {children}
            </div>
        </div>
    )
}
