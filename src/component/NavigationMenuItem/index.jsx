import { NavLink } from "react-router-dom";

export const NavigationMenuItem = ({ to, text, icon: Icon, isExpanded, onNavigate }) => {
  if (!Icon) return null;

  return (
    <li className="w-full">
      <NavLink
        to={to}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group flex items-center rounded-2xl px-2 py-2 text-sm font-medium transition-all duration-200 ease-out ${
            isExpanded ? "justify-start" : "justify-center"
          } ${
            isActive
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary hover:bg-primary-light hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                isExpanded ? "mr-3" : "mr-0"
              } ${isActive ? "bg-white/15" : "bg-transparent group-hover:bg-white/70"}`}
            >
              <Icon size={18} />
            </span>
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                isExpanded ? "max-w-[10rem] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              {text}
            </span>
          </>
        )}
      </NavLink>
    </li>
  );
};