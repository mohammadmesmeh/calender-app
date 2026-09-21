import { Menu, Logs, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { VisibleContext } from "@/features/sidebar/context/VisibleContext";
import { Logo } from "@/components/navigation/Logo";
import { ThemeToggle } from "@/features/settings/components/ThemeToggle";

export const Header = ({ className = "" }) => {
  const location = useLocation();
  const { toggleVisibleMenu, toggleVisibleDropDown, isVisibleDropDown, isVisibleMenu } = useContext(VisibleContext);
  const dropdownRef = useRef(null);

  const handleClickMenu = () => {
    toggleVisibleMenu();
  };

  const handleClickDropDown = () => {
    toggleVisibleDropDown();
  };

  const getViewName = useCallback(() => {
    if (location.pathname === "/") return "Month";
    if (location.pathname === "/week") return "Week";
    if (location.pathname === "/day") return "Day";
    return "View";
  }, [location.pathname]);

  const [displayedView, setDisplayedView] = useState(getViewName);
  const instantView = getViewName();
  const animating = displayedView !== instantView;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedView(getViewName());
    }, 150);

    return () => clearTimeout(timeout);
  }, [getViewName]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isVisibleDropDown) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        toggleVisibleDropDown();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isVisibleDropDown, toggleVisibleDropDown]);

  return (
    <header className={`sticky top-0 z-20 shrink-0 border-b border-border/80 bg-surface/90 shadow-subtle backdrop-blur ${className}`}>
      <div className="mx-auto flex items-center justify-between gap-3 px-container-sm py-3 md:px-container-md md:py-4 lg:px-container-lg">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main navigation">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={handleClickDropDown}
              className="flex items-center gap-1 rounded-button bg-background px-2 py-2 text-xs font-medium text-text shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
              aria-expanded={isVisibleDropDown}
              aria-haspopup="listbox"
              aria-label="Select calendar view"
            >
              <span className={`transition-transform duration-300 ease-in-out ${isVisibleDropDown ? "rotate-180" : "rotate-0"}`}>
                <ChevronDown size={15} />
              </span>

              <span className={`transition-all duration-300 ease-out ${animating ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}>
                {displayedView}
              </span>
            </button>

            {isVisibleDropDown && (
              <ul className="absolute left-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-button border border-border bg-surface shadow-dropdown" role="listbox" aria-label="Calendar views">
                <li role="none">
                  <NavLink
                    to="/"
                    role="option"
                    aria-selected={displayedView === "Month"}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-all hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? 'bg-primary-light text-primary font-medium' : 'text-text'}`
                    }
                  >
                    Month
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink
                    to="/week"
                    role="option"
                    aria-selected={displayedView === "Week"}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-all hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? 'bg-primary-light text-primary font-medium' : 'text-text'}`
                    }
                  >
                    Week
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink
                    to="/day"
                    role="option"
                    aria-selected={displayedView === "Day"}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-all hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? 'bg-primary-light text-primary font-medium' : 'text-text'}`
                    }
                  >
                    Day
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-button px-3 py-2 text-xs sm:text-sm font-medium transition-all shadow-subtle hover:bg-border/70 hover:shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? "bg-primary-light text-primary" : "bg-background text-text"}`
            }
            aria-label="Go to dashboard"
          >
            Dashboard
          </NavLink>

          <ThemeToggle />

          <button
            type="button"
            onClick={handleClickMenu}
            className="rounded-button bg-background p-2 shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={isVisibleMenu ? "Close side menu" : "Open side menu"}
            aria-expanded={isVisibleMenu}
          >
            {isVisibleMenu ? (
              <Logs size={18} className="text-primary" />
            ) : (
              <Menu size={18} className="text-text" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
