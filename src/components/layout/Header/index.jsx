import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/components/navigation/Logo";
import { ThemeToggle } from "@/features/settings/components/ThemeToggle";
import { LanguageToggle } from "@/features/settings/components/LanguageToggle";
import { CalendarNavigation } from "@/features/calendar/components/CalendarNavigation";
import { useLocalization } from "@/i18n/LocalizationProvider";

const CALENDAR_ROUTES = ["/", "/week", "/day"];

export const Header = ({ className = "" }) => {
  const { pathname } = useLocation();
  const { t } = useLocalization();
  const isCalendarRoute = CALENDAR_ROUTES.includes(pathname);

  return (
    <header className={`sticky top-0 z-20 shrink-0 border-b border-border/80 bg-surface/90 shadow-subtle backdrop-blur ${className}`}>
      <div className="flex flex-col gap-2.5 px-3 py-2.5 sm:px-container-md sm:py-3 lg:px-container-lg">
        {/* Top bar: Brand logo, Dashboard link, Language, Theme */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Logo />
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-button px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-all shadow-subtle hover:bg-border/70 hover:shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? "bg-primary-light text-primary" : "bg-background text-text"}`
              }
              aria-label={t('nav.goToDashboard')}
            >
              {t('nav.dashboard')}
            </NavLink>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Calendar Navigation & controls bar */}
        {isCalendarRoute && (
          <div className="pt-1 border-t border-border/40">
            <CalendarNavigation />
          </div>
        )}
      </div>
    </header>
  );
};