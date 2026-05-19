import { Slidebar } from "../../component/Slidebar"
import { DashboardHeader } from "../../component/DashboardHeader"
import { WelcomeSection } from "../../component/WelcomeSection"
import { GridStatus } from "../../component/GridStatus"
import { UpcomingEvents } from "../../component/UpcomingEvents"
import { TodaysTasks } from "../../component/Today'sTasks"
import {NotesWidget} from '../../component/NotesWidget'
import { ProductivityAnalytics } from '../../component/ProductivityAnalytics'
export const Dashboard = () => {
    return (
        <div className="dashboard-container flex flex-col  min-h-dvh w-full ">
            <DashboardHeader />
            <div className="dashboard-content flex-1 flex flex-row gap-3 md:gap-6 ">
                <Slidebar />
                <div className="flex-1 flex flex-col gap-6 w-full items-center  justify-start px-3 md:px-6 ">
                    <WelcomeSection />
                    <GridStatus />
                    <UpcomingEvents />
                    <TodaysTasks />
                    <NotesWidget />
                    <ProductivityAnalytics/>
                </div>

            </div>
        </div>
    )
}

