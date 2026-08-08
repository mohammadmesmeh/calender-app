import { Sidebar } from "@/components/layout/Sidebar"
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader"
import { WelcomeSection } from "@/features/dashboard/components/WelcomeSection"
import { GridStatus } from "@/features/dashboard/components/GridStatus"
import { UpcomingEvents } from "@/features/dashboard/components/UpcomingEvents"
import { TodaysTasks } from "@/features/tasks/components/TodaysTasks"
import { NotesWidget } from '@/features/dashboard/components/NotesWidget'
import { ProductivityAnalytics } from '@/features/dashboard/components/ProductivityAnalytics'
import { InViewAnimation } from "@/components/animations/AnimatedFramerMotion/InViewAnimation"
import { useSidebarContext } from "@/features/sidebar/context/SidebarContext/SidebarContext"
import { SidebarProvider } from "@/features/sidebar/context/SidebarContext"
import { TaskProvider } from "@/features/tasks/context/TaskContext"
import { EventProvider } from "@/features/calendar/context/EventContext"

const DashboardContent = () => {
  const { expanded, isDesktop } = useSidebarContext()
  const sidebarWidth = isDesktop ? (expanded ? "80" : "24") : "0"

  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar />
      <div
        className="flex-1 flex flex-col gap-stack-xs md:gap-gutter border border-border rounded-card transition-all duration-300"
        style={{ paddingLeft: isDesktop ? `${parseInt(sidebarWidth) * 0.25}rem` : undefined }}
      >
        <DashboardHeader />
        <div className="flex-1 flex flex-col gap-gutter w-full items-center justify-start px-container-sm md:px-container-md">
          <WelcomeSection />
          <GridStatus />
          <InViewAnimation><UpcomingEvents /></InViewAnimation>
          <InViewAnimation><TodaysTasks /></InViewAnimation>
          <InViewAnimation><NotesWidget /></InViewAnimation>
          <InViewAnimation><ProductivityAnalytics /></InViewAnimation>
        </div>
      </div>
    </div>
  )
}

export const Dashboard = () => (
  <SidebarProvider>
    <TaskProvider>
      <EventProvider>
        <DashboardContent />
      </EventProvider>
    </TaskProvider>
  </SidebarProvider>
)
