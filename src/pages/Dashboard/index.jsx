import { Sidebar } from "../../component/Sidebar"
import { DashboardHeader } from "../../component/DashboardHeader"
import { WelcomeSection } from "../../component/WelcomeSection"
import { GridStatus } from "../../component/GridStatus"
import { UpcomingEvents } from "../../component/UpcomingEvents"
import { TodaysTasks } from "../../component/Today'sTasks"
import { NotesWidget } from '../../component/NotesWidget'
import { ProductivityAnalytics } from '../../component/ProductivityAnalytics'
import { InViewAnimation } from "../../component/Animated Freamer Motion/InViewAnimation"
export const Dashboard = () => {
    return (
        <div className="dashboard-container flex flex-row  min-h-dvh w-full  ">
            <Sidebar />
            <div className="dashboard-content flex-1 flex flex-col  gap-3 md:gap-6 border border-neutral-200 rounded-lg ">
                <DashboardHeader />
                <div className="flex-1 flex flex-col gap-6 w-full items-center  justify-start px-3 md:px-6 ">
                    <WelcomeSection />
                    <GridStatus />
                    <InViewAnimation>

                        <UpcomingEvents />
                    </InViewAnimation>
                    <InViewAnimation>

                        <TodaysTasks />
                    </InViewAnimation>
                    <InViewAnimation>

                        <NotesWidget />
                    </InViewAnimation>
                    <InViewAnimation>

                        <ProductivityAnalytics />
                    </InViewAnimation>
                </div>

            </div>
        </div>
    )
}

