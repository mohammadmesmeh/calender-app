import { Slidebar } from "../../component/Slidebar"
import { DashboardHeader } from "../../component/DashboardHeader"
import { WelcomeSection } from "../../component/WelcomeSection"
import { GridStatus } from "../../component/GridStatus"
import { UpcomingEvents } from "../../component/UpcomingEvents"
import { TodaysTasks } from "../../component/Today'sTasks"
export const Dashboard = () => {
    return (
        <div className="dashboard-container flex flex-col  min-h-dvh w-full ">
            <DashboardHeader />
            <div className="dashboard-content flex-1 flex flex-row gap-6 ">
                <Slidebar />
                <div className="flex-1 flex flex-col gap-6 w-full items-center  justify-start px-6 ">
                    <WelcomeSection />
                    <GridStatus />
                    <UpcomingEvents />
                    <TodaysTasks />
                </div>

            </div>
        </div>
    )
}

