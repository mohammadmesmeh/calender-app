export const DayNum = ({ content, isToday, isOutsideMonth }) => {
    return (
        <span
            className={`
                inline-flex items-center justify-center
                w-full aspect-square
                text-xs font-medium
                cursor-pointer
                transition-all duration-150
                select-none
                rounded-full
                ${isToday
                    ? 'bg-primary text-white shadow-subtle'
                    : isOutsideMonth
                        ? 'text-text-muted hover:bg-background'
                        : 'text-text hover:bg-primary-light hover:text-primary'
                }
            `}
        >
            {content}
        </span>
    )
}
