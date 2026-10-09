import { useEffect, useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { NavigationMenuItem } from "@/components/navigation/NavigationMenuItem"
import { SettingsMenu } from "@/features/settings/components/SettingsMenu"
import { UserProfile } from "@/components/navigation/UserProfile"
import { LanguageToggle } from "@/features/settings/components/LanguageToggle"
import { ShineButton } from "@/components/buttons/ShineButton"
import { Calendar, LayoutDashboard, CalendarPlus } from 'lucide-react'
import { Logo } from "@/components/navigation/Logo"
import { useSidebarContext } from "@/features/sidebar/context/SidebarContext/SidebarContext"
import { useTask } from "@/features/tasks/context/TaskContext/TaskContext"
import { useEvents } from "@/features/calendar/context/EventContext/EventContext"
import { TaskModal } from "@/features/tasks/components/task-modal"
import { useLocalization } from "@/i18n/LocalizationProvider"

export const Sidebar = () => {
  const { isDesktop, mobileOpen, expanded, setHovered, setMobileOpen } = useSidebarContext()
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const { addTask } = useTask()
  const { addEvent } = useEvents()
  const { t } = useLocalization()

  const navItems = [
    { to: "/dashboard", text: t('nav.dashboard'), icon: LayoutDashboard },
    { to: "/", text: t('nav.calendar'), icon: Calendar },
  ]

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
            className="fixed inset-0 z-40 bg-text/50 md:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        onMouseEnter={() => isDesktop && setHovered(true)}
        onMouseLeave={() => isDesktop && setHovered(false)}
        aria-label={t('nav.sidebar')}
        className={`fixed start-0 top-0 z-50 flex shrink-0 flex-col border-e border-border/80 bg-surface/95 text-text shadow-card backdrop-blur transition-all duration-300 ease-out ${
          isDesktop
            ? expanded
              ? "w-80 h-screen"
              : "w-24 h-screen"
            : mobileOpen
              ? "w-72 translate-x-0 h-screen"
              : "w-72 -translate-x-full rtl:translate-x-full h-screen"
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col px-4 py-5">
          <header className="flex shrink-0 items-center px-1" aria-label="Brand">
            <div className={`flex items-center w-full ${expanded ? "gap-3 justify-start" : "justify-center"}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-primary-light text-primary shadow-subtle">
                <Calendar size={20} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-w-[12rem] opacity-100" : "max-w-0 opacity-0"}`}>
                <Logo />
              </div>
            </div>
          </header>

          <div className="my-3 border-b border-border/50" />

          <nav className="flex-1 overflow-y-auto overflow-x-hidden" aria-label={t('nav.sidebarNav')}>
            <ul className="flex flex-col gap-1.5">
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

          <div className="mt-3 shrink-0">
            <ShineButton className="w-full" icon={CalendarPlus} isExpanded={expanded} onClick={() => setIsTaskModalOpen(true)}>
              {t('nav.addTask')}
            </ShineButton>
          </div>
        </div>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={(data) => (data.type === "event" ? addEvent(data) : addTask(data))}
        />

        <footer className="shrink-0 border-t border-border/70 p-3 space-y-2">
          <LanguageToggle showLabel={expanded} className="w-full justify-center" />
          <UserProfile
            expanded={expanded}
            classNameIcon="bg-white/20 text-white"
            className={`${
              expanded
                ? 'rounded-card p-2.5 gap-3'
                : 'rounded-full justify-center p-1'
            } bg-gradient-to-r from-primary to-secondary text-white shadow-subtle transition-all`}
          />
        </footer>
      </aside>
    </>
  )
}