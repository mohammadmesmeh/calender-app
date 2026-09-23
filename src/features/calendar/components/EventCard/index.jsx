import { useLocalization } from "@/i18n/LocalizationProvider";
import { formatStoredTime } from "@/i18n/time";

export const EventCard = ({ title, time, note, type, color }) => {
    const { locale } = useLocalization();
    const timeLabel = time ? formatStoredTime(time, locale) : '';
    return (
        <div className="group flex items-center gap-1 px-1.5 py-0.5 rounded-[3px] bg-primary/[0.12] hover:bg-primary/[0.18] active:bg-primary/[0.22] transition-colors duration-100 cursor-pointer overflow-hidden">
            <div className={`shrink-0 w-[3px] h-3 rounded-full ${color || 'bg-primary'}`} />

            <span className="text-[10px] md:text-[11px] font-medium text-text leading-tight truncate" dir="auto">
                {title}
            </span>

            {timeLabel && (
                <span className="text-[9px] md:text-[10px] text-text-secondary leading-tight truncate shrink-0 hidden md:inline">
                    {timeLabel}
                </span>
            )}
        </div>
    )
}