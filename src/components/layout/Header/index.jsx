import { Menu, Logs } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { VisibleContext } from "@/features/sidebar/context/VisibleContext";
import { Logo } from "@/components/navigation/Logo";
import { ThemeToggle } from "@/features/settings/components/ThemeToggle";
import { LanguageToggle } from "@/features/settings/components/LanguageToggle";
import { CalendarNavigation } from "@/features/calendar/components/CalendarNavigation";
import { useLocalization } from "@/i18n/LocalizationProvider";

const CALENDAR_ROUTES = ["/", "/week", "/day"];

export const Header = ({ className = "" }) => {
  const { toggleVisibleMenu, isVisibleMenu } = useContext(VisibleContext);
  const { pathname } = useLocation();
  const { t } = useLocalization();
  const isCalendarRoute = CALENDAR_ROUTES.includes(pathname);

  return (
    <header className={`sticky top-0 z-20 shrink-0 border-b border-border/80 bg-surface/90 shadow-subtle backdrop-blur ${className}`}>
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-container-sm py-3 md:px-container-md md:py-4 lg:px-container-lg">
      <div className="flex items-center">
        <Logo />
      </div>

      <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3" aria-label={t('nav.mainNav')}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `rounded-button px-3 py-2 text-xs sm:text-sm font-medium transition-all shadow-subtle hover:bg-border/70 hover:shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? "bg-primary-light text-primary" : "bg-background text-text"}`
          }
          aria-label={t('nav.goToDashboard')}
        >
          {t('nav.dashboard')}
        </NavLink>

        {isCalendarRoute && <CalendarNavigation />}

        <LanguageToggle />
        <ThemeToggle />

        <button
          type="button"
          onClick={toggleVisibleMenu}
          className="rounded-button bg-background p-2 shadow-subtle transition-all duration-200 ease-out hover:bg-border/70 hover:shadow-subtle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label={isVisibleMenu ? t('nav.closeSideMenu') : t('nav.openSideMenu')}
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