import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const NavigationMenuItem = ({ to, text, icon: Icon, isExpanded, onNavigate, submenuItems = [] }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  if (!Icon) return null;
  const hasSubmenu = submenuItems.length > 0;

  return (
    <li
      className="relative w-full"
      onMouseEnter={() => hasSubmenu && setIsSubmenuOpen(true)}
      onMouseLeave={() => hasSubmenu && setIsSubmenuOpen(false)}
      onFocus={() => hasSubmenu && setIsSubmenuOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsSubmenuOpen(false)
        }
      }}
    >
      <NavLink
        to={to}
        onClick={onNavigate}
        aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
         className={({ isActive }) =>
           `group flex items-center rounded-card px-2 py-2 text-sm font-medium transition-all duration-200 ease-out ${
             isExpanded ? "justify-start" : "justify-center"
           } ${
             isActive
                ? "bg-primary text-white shadow-subtle"
               : "text-text-secondary hover:bg-primary-light hover:text-primary"
           } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`
         }
      >
        {({ isActive }) => (
          <>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-button transition-all duration-200 ${
                isExpanded ? "mr-3" : "mr-0"
              } ${isActive ? "bg-background/15" : "bg-transparent group-hover:bg-surface/70"}`}
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
            {hasSubmenu && (
              <span
                className={`ml-auto flex h-6 w-6 items-center justify-center rounded-full text-text-muted transition-all duration-200 ${
                  isSubmenuOpen ? "translate-x-0 text-primary" : ""
                }`}
              >
                <ChevronRight size={16} />
              </span>
            )}
          </>
        )}
      </NavLink>

      <AnimatePresence>
        {hasSubmenu && isSubmenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -8, y: -4 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -8, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="menu"
            aria-label={`${text} submenu`}
            className="absolute left-0 top-full md:left-full md:top-auto md:bottom-0 md:ml-3 z-50 w-56 overflow-hidden rounded-card border border-border/70 bg-surface p-2 shadow-dropdown"
          >
            <ul className="space-y-1">
              {submenuItems.map((item) => {
                const ItemIcon = item.icon;

                return (
                  <li key={item.label} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      className="flex w-full items-center gap-3 rounded-button px-3 py-2 text-left text-sm text-text-secondary transition-colors duration-200 hover:bg-primary-light hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-button bg-secondary/10 text-primary">
                        <ItemIcon size={16} />
                      </span>
                      <span className="flex-1">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};