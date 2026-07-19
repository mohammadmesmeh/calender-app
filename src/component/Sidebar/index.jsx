import { useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { NavigationMenuItem } from "../NavigationMenuItem"
import { SettingsMenu } from "../SettingsMenu"
import { UserProfile } from "../UserProfile"
import { ShineButton } from "../Buttons/ShineButton"
import { Calendar, ChartColumn, CalendarClock, ListChecks, LayoutDashboard, CalendarPlus } from 'lucide-react'
import { useSidebarContext } from "../../context/SidebarContext"

const navItems = [
  { to: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
  { to: "/", text: "Calendar", icon: Calendar },
  { to: "/tasks", text: "Tasks", icon: ListChecks },
  { to: "/events", text: "Events", icon: CalendarClock },
  { to: "/analytics", text: "Analytics", icon: ChartColumn },
]

export const Sidebar = () => {
  const { isDesktop, mobileOpen, expanded, setHovered, setMobileOpen } = useSidebarContext()

  const closeMobile = useCallback(() => setMobileOpen(false), [setMobileOpen])

  useEffect(() => {
    if (!mobileOpen || isDesktop) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMobile()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileOpen, isDesktop, closeMobile])

  return (
    <>
      <AnimatePresence>
        {!isDesktop && mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        onMouseEnter={() => isDesktop && setHovered(true)}
        onMouseLeave={() => isDesktop && setHovered(false)}
        aria-label="Main navigation"
        className={`fixed left-0 top-0 z-50 flex shrink-0 flex-col justify-between overflow-visible border-r border-border/80 bg-white/95 text-text shadow-card backdrop-blur transition-all duration-300 ease-out ${
          isDesktop
            ? expanded
              ? "w-80 min-h-dvh"
              : "w-24 min-h-dvh"
            : mobileOpen
              ? "w-72 translate-x-0 h-screen"
              : "w-72 -translate-x-full h-screen"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-3 py-4 md:px-4 md:py-5">
          <div className="flex flex-col">
            <div className="flex min-h-12 items-center gap-3 px-2" aria-hidden="true">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary shadow-soft">
                <LayoutDashboard size={20} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-w-[12rem] opacity-100" : "max-w-0 opacity-0"}`}>
                <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
                  Dashboard
                </p>
              </div>
            </div>

            <nav className="mt-4">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem
                    key={item.to}
                    to={item.to}
                    text={item.text}
                    icon={item.icon}
                    isExpanded={expanded}
                    onNavigate={closeMobile}
                  />
                ))}
                <SettingsMenu isExpanded={expanded} />
              </ul>
            </nav>
          </div>

          <div className="flex flex-col">
            <ShineButton className="mt-3 w-full" icon={CalendarPlus} isExpanded={expanded}>
              Add Task
            </ShineButton>
          </div>
        </div>

        <div className="border-t border-border/70 pt-3 mt-1 mb-2">
          <UserProfile
            expanded={expanded}
            classNameIcon="bg-white text-primary"
            className={`${expanded ? 'rounded-2xl p-2 md:p-3 gap-2' : 'rounded-full justify-center gap-0 p-0 md:p-0'} bg-secondary text-white shadow-soft`}
          />
        </div>
      </aside>
    </>
  )
}
