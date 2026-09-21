import { NavLink } from "react-router-dom";

const VIEWS = [
  { to: "/", label: "Month" },
  { to: "/week", label: "Week" },
  { to: "/day", label: "Day" },
];

export const CalendarViewSwitcher = ({ className = "" }) => (
  <div
    className={`inline-flex items-center gap-1 rounded-button bg-background border border-border p-1 ${className}`}
    role="group"
    aria-label="Calendar view"
  >
    {VIEWS.map((view) => (
      <NavLink
        key={view.to}
        to={view.to}
        className={({ isActive }) =>
          `rounded-button px-2.5 py-1.5 text-xs md:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            isActive
              ? "bg-primary text-white shadow-subtle"
              : "text-text-muted hover:text-text hover:bg-border/60"
          }`
        }
      >
        {view.label}
      </NavLink>
    ))}
  </div>
);