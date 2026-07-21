export const EventCard = ({ title, time, note, type, color }) => {
    return (
        <div className="group flex items-start gap-2 px-1.5 py-1 rounded-[4px] hover:bg-primary-light/30 active:bg-primary-light/50 transition-colors duration-150 cursor-pointer">
            <div className={`mt-0.5 w-1.5 h-1.5 shrink-0 rounded-full ${color || 'bg-primary'}`} />

            <div className="flex-1 min-w-0">
                <p className="text-[10px] md:text-xs font-medium text-text leading-tight truncate group-hover:text-primary transition-colors">
                    {title}
                </p>
                {time && (
                    <p className="text-[9px] md:text-[10px] text-text-muted leading-tight truncate">
                        {time}
                    </p>
                )}
                {note && (
                    <p className="text-[9px] md:text-[10px] text-text-muted/70 leading-tight truncate hidden md:block">
                        {note}
                    </p>
                )}
            </div>

            {type && (
                <span className={`shrink-0 text-[8px] md:text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-none mt-0.5 ${color || 'bg-primary/10 text-primary'}`}>
                    {type}
                </span>
            )}
        </div>
    )
}
