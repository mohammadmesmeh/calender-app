import { Plus } from "lucide-react";

export const CalendarAddButton = ({ onClick, label = "Add event", className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-text-muted hover:text-primary hover:bg-primary-light transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${className}`}
  >
    <Plus size={12} />
  </button>
);