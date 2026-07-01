import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { NavigationMenuItem } from "../NavigationMenuItem"
import { SettingsMenu } from "../SettingsMenu"
import { UserProfile } from "../UserProfile"
import { ShineButton } from "../Buttons/ShineButton"
import { Calendar, ChartColumn, CalendarClock, ListChecks, LayoutDashboard, CalendarPlus, Menu, X } from 'lucide-react'

const navItems = [
  { to: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
  { to: "/", text: "Calendar", icon: Calendar },
  { to: "/tasks", text: "Tasks", icon: ListChecks },
  { to: "/events", text: "Events", icon: CalendarClock },
  { to: "/analytics", text: "Analytics", icon: ChartColumn },
]

export const Sidebar = () => {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 768 : true)
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768
      setIsDesktop(desktop)
      if (!desktop) {
        setHovered(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "scroll"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mobileOpen])

  const expanded = isDesktop ? hovered : mobileOpen

  return (
    <>
      {!isDesktop && (
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="fixed left-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-white text-text shadow-soft transition-all duration-200 hover:bg-primary-light hover:text-primary md:hidden"
          aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}

      <AnimatePresence>
        {!isDesktop && mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            // z-40 (مش 30) عشان يضل تحت السايدبار نفسه (z-50) وفوق المحتوى
            className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/*
        fixed بدل absolute: يربط العنصر بالـ viewport فعليًا، فيضل بمكانه
        تمامًا أثناء scroll الصفحة الخارجية، بغض النظر عن أي parent.
        h-screen + overflow-hidden (مش auto): نمنع أي scroll داخلي نهائيًا،
        وبما إن المحتوى صغير وثابت العدد، ما رح يصير قص لأي عنصر.
      */}
      <aside
        onMouseEnter={() => isDesktop && setHovered(true)}
        onMouseLeave={() => isDesktop && setHovered(false)}
        className={`fixed left-0 top-0 z-50 flex min-h-dvh shrink-0 flex-col overflow-visible border-r border-border/80 bg-white/95 text-text shadow-card backdrop-blur transition-all duration-300 ease-out ${isDesktop
          ? expanded
            ? "w-80"
            : "w-24"
          : mobileOpen
            ? "w-72 translate-x-0"
            : "w-72 -translate-x-full"
          }`}
      >
        {/*
          justify-between بدل الاعتماد على mt-* فقط: يوزّع 3 كتل
          (الهيدر/اللوجو، الـ nav في النص، والفوتر مع الزر والبروفايل)
          على كامل ارتفاع h-screen بشكل متساوي ومرن، فما في أي عنصر
          بيضطر يطلع برّا حدود الشاشة ويعمل scroll، حتى على شاشات
          ارتفاعها صغير. py-4/py-5 صغيرة بالأساس فما بتأثر.
        */}
        <div className="flex h-full flex-col justify-between px-3 py-4 md:px-4 md:py-5">

          {/* الكتلة العلوية: اللوجو + الـ nav */}
          <div className="flex flex-col">
            <div className="flex min-h-12 items-center px-2 gap-3">
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
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
                <SettingsMenu isExpanded={expanded} />
              </ul>
            </nav>
          </div>

          {/* الكتلة السفلية: زر الإضافة + البروفايل، ثابتة بالأسفل دائمًا */}
          <div className="flex flex-col">
            <ShineButton
              className="mt-3 w-full"
              icon={CalendarPlus}
              isExpanded={expanded}
            >
              Add Task
            </ShineButton>
            <div className="mt-1 mb-2 border-t border-border/70 pt-3 ">
              <UserProfile
              expanded={expanded}
                classNameIcon="bg-white text-primary"
                className={`${expanded ? 'rounded-2xl p-2  md:p-3 gap-2 ':'rounded-full  justify-center gap-0 p-0 md:p-0' }  bg-secondary  text-white shadow-soft  `}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}