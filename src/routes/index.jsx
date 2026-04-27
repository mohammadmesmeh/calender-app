import { Routes, Route, Outlet } from "react-router-dom"
import { MonthCalendar } from "../component/MonthCalendar"
import { MainMenu } from "../component/MainMenu"
import { HomePage } from "../pages/HomePage"
import { WeekCalendar } from "../component/WeekCalendar"
import { DayCalendar } from "../component/DayCalendar"
export const Routeing = () => {
    return (

      
        <div className="flex-1 min-h-0 flex flex-col">

            <Routes>

                <Route path="/" element={<Outlet />}>
                    <Route index element={<MonthCalendar />} />  
                    <Route path="/week" element={<WeekCalendar />} />
                    <Route path="/day" element={<DayCalendar />} />
                </Route>
                {/* <Route path="/menu" element={<MainMenu />} /> */}
                {/* <Route path="step-3" element={<StepThree />} /> */}
            </Routes>

        </div>
      
    )

}