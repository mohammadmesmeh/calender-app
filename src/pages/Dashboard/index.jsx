import { Sidebar } from "../../component/Sidebar"
import { DashboardHeader } from "../../component/DashboardHeader"
import { WelcomeSection } from "../../component/WelcomeSection"
import { GridStatus } from "../../component/GridStatus"
import { UpcomingEvents } from "../../component/UpcomingEvents"
import { TodaysTasks } from "../../component/Today'sTasks"
import { NotesWidget } from '../../component/NotesWidget'
import { ProductivityAnalytics } from '../../component/ProductivityAnalytics'
import { AreaStepChart } from '../../component/AreaStepChart'
import { InViewAnimation } from "../../component/Animated Freamer Motion/InViewAnimation"
import { SidebarProvider, useSidebarContext } from "../../context/SidebarContext"

const DashboardContent = () => {
  const { expanded, isDesktop } = useSidebarContext()
  const sidebarWidth = isDesktop ? (expanded ? "80" : "24") : "0"

  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar />
      <div
        className="flex-1 flex flex-col gap-3 md:gap-6 border border-neutral-200 rounded-lg transition-all duration-300"
        style={{ paddingLeft: isDesktop ? `${parseInt(sidebarWidth) * 0.25}rem` : undefined }}
      >
        <DashboardHeader />
        <div className="flex-1 flex flex-col gap-6 w-full items-center justify-start px-3 md:px-6">
          <WelcomeSection />
          <GridStatus />
          <InViewAnimation><UpcomingEvents /></InViewAnimation>
          <InViewAnimation><TodaysTasks /></InViewAnimation>
          <InViewAnimation><NotesWidget /></InViewAnimation>
          <InViewAnimation><AreaStepChart /></InViewAnimation>
          <InViewAnimation><ProductivityAnalytics /></InViewAnimation>
        </div>
      </div>
    </div>
  )
}

export const Dashboard = () => (
  <SidebarProvider>
    <DashboardContent />
  </SidebarProvider>
)
