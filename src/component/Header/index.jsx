import { Menu, Logs, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { VisibleContext } from "../../context/VisibleContext";
import { Logo } from "../Logo";

export const Header = ({ className = "" }) => {
  const location = useLocation();
  const { toggleVisibleMenu, toggleVisibleDropDown, isVisibleDropDown, isVisibleMenu } = useContext(VisibleContext);

  const handleClickMenu = () => {
    toggleVisibleMenu();
  };

  const handleClickDropDown = () => {
    toggleVisibleDropDown();
  };

  const getViewName = () => {
    if (location.pathname === "/") return "Month";
    if (location.pathname === "/week") return "Week";
    if (location.pathname === "/day") return "Day";
    return "View";
  };

  const [displayedView, setDisplayedView] = useState(getViewName());
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);

    const timeout = setTimeout(() => {
      setDisplayedView(getViewName());
      setAnimating(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 shrink-0 border-b border-border/80 bg-surface/90 shadow-soft backdrop-blur ${className}`}>
      <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-container-sm py-3 md:px-container-md md:py-4 lg:px-container-lg">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={handleClickDropDown}
              className="flex items-center gap-1 rounded-xl bg-background px-2 py-2 text-xs font-medium text-text shadow-sm transition-all duration-200 ease-out hover:bg-border/70 active:scale-95 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
            >
              <span className={`transition-transform duration-300 ease-in-out ${isVisibleDropDown ? "rotate-180" : "rotate-0"}`}>
                <ChevronDown size={15} />
              </span>

              <span className={`transition-all duration-300 ease-out ${animating ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}>
                {displayedView}
              </span>
            </button>

            {isVisibleDropDown && (
              <ul className="absolute left-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
                <li>
                  <NavLink to="/" className="block px-4 py-2 text-sm text-text transition-all hover:bg-background">
                    Month
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/week" className="block px-4 py-2 text-sm text-text transition-all hover:bg-background">
                    Week
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/day" className="block px-4 py-2 text-sm text-text transition-all hover:bg-background">
                    Day
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-sm font-medium transition-all shadow-sm hover:bg-border/70 hover:shadow-soft ${isActive ? "bg-primary-light text-primary" : "bg-background text-text"}`
            }
          >
            Dashboard
          </NavLink>

          <button
            type="button"
            onClick={handleClickMenu}
            className="rounded-xl bg-background p-2 shadow-sm transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-soft active:scale-95"
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