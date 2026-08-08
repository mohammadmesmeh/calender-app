import { useState } from 'react'
import { Search, CirclePlus } from 'lucide-react'
import { UserProfile } from "@/components/navigation/UserProfile"
import { AddButtons } from "@/components/buttons/AddButtons"
import { MobileMenuButton } from "@/components/buttons/MobileMenuButton"
import { ThemeToggle } from "@/features/settings/components/ThemeToggle"
import { NotificationBell } from "@/features/notifications/components/NotificationBell"
import { useSidebarContext } from "@/features/sidebar/context/SidebarContext/SidebarContext"
import { useTask } from "@/features/tasks/context/TaskContext/TaskContext"
import { useEvents } from "@/features/calendar/context/EventContext/EventContext"
import { TaskModal } from "@/features/tasks/components/task-modal"

export const DashboardHeader = () => {
  const { isDesktop, mobileOpen, setMobileOpen } = useSidebarContext()
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const { addTask } = useTask()
  const { addEvent } = useEvents()

  return (
    <div className="flex items-center justify-between shadow-card px-container-sm md:px-container-md py-2 md:py-4 sticky top-0 backdrop-blur-lg bg-surface/70 z-10">
      <div className="flex items-center justify-end w-full gap-2 md:gap-4">
        {!isDesktop && (
          <MobileMenuButton
            onClick={() => setMobileOpen((v) => !v)}
            mobileOpen={mobileOpen}
          />
        )}

        <form action="" className="relative flex-1" role="search">
          <div className="w-full">
            <label htmlFor="search" className="text-text-muted absolute bottom-3 left-2 z-10 pointer-events-none">
              <Search size={20} />
            </label>
            <input
              type="search"
              id="search"
              name="search"
              placeholder="Search tasks, events..."
              className="ui-input w-full py-2 px-8 border-2 focus:border-primary focus:ring-primary/30"
            />
          </div>
        </form>

        <NotificationBell />

        <ThemeToggle />

        <AddButtons content="Quick Add" className="hidden md:flex bg-primary text-white group" onClick={() => setIsTaskModalOpen(true)}>
          <CirclePlus className="transition-transform duration-300 group-hover:rotate-180" />
        </AddButtons>
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={(data) => (data.type === "event" ? addEvent(data) : addTask(data))}
        />

        <UserProfile classNameIcon="bg-primary text-white" />
      </div>
    </div>
  )
}
