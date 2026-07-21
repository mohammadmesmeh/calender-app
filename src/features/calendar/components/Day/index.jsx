export const Day = ({ day, className }) => {
    return (
        <span className={`font-semibold capitalize text-center text-[10px] uppercase tracking-wider ${className}`}>
            {day}
        </span>
    )
}
