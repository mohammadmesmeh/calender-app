import { Check } from "lucide-react";

export const Task = ({ title, time, completed, onToggle, priority }) => {
    return (
        <li
            className="flex items-center justify-between group cursor-pointer rounded-button px-2 py-1.5 hover:bg-background transition-colors duration-150"
            onClick={onToggle}
            role="button"
            tabIndex={0}
            aria-label={`${title} - ${completed ? 'completed' : 'pending'} - ${priority} priority`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        >
            <div className="flex gap-3 items-center">
                <div
                    className={`w-5 h-5 shrink-0 border-2 ${completed ? 'bg-success border-success' : 'border-border bg-transparent group-hover:border-success/50'} rounded-full flex items-center justify-center transition-colors duration-200`}
                    aria-hidden="true"
                >
                    <Check size={12} className={`${!completed ? "opacity-0 group-hover:opacity-100 group-hover:text-success" : "opacity-100 text-white"} transition-all duration-200`} />
                </div>

                <div>
                    <p className={`text-sm font-medium text-text transition-all duration-200 ${completed ? 'line-through text-text-muted' : ''}`}>
                        {title}
                    </p>
                    <p className="text-xs text-text-secondary">{time}</p>
                </div>
            </div>

            <span className={`shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-full w-16 text-center ${
                priority === "high" ? "bg-danger/10 text-danger" :
                priority === "medium" ? "bg-warning/20 text-text" :
                "bg-success/10 text-success"
            }`}>
                {priority}
            </span>
        </li>
    )
}
