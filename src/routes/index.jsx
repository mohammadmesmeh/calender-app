// import { Routes, Route, Outlet } from "react-router-dom"
// import { MonthCalendar } from "../component/MonthCalendar"
// import { MainMenu } from "../component/MainMenu"
// import { HomePage } from "../pages/HomePage"
// import { WeekCalendar } from "../component/WeekCalendar"
// import { DayCalendar } from "../component/DayCalendar"
// import { Dashboard } from "../pages/Dashboard"
// export const Routeing = () => {
//     return (

      
//         <div className="flex-1 min-h-0 flex flex-col">

//             <Routes>

//                 <Route path="/" element={<Outlet />}>
//                     <Route index element={<MonthCalendar />} />  
//                     <Route path="/week" element={<WeekCalendar />} />
//                     <Route path="/day" element={<DayCalendar />} />
//                 </Route>
//                  <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>

//         </div>
      
//     )

// }
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../component/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { MonthCalendar } from "../component/MonthCalendar";
import { WeekCalendar } from "../component/WeekCalendar";
import { DayCalendar } from "../component/DayCalendar";
import { Calendar } from "../pages/Calendar";

export const Routeing = () => {
  return (
    <Routes>

      {/* Layout العام */}

        {/* <Route index element={<Calendar />} /> */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* calendar routes */}
     
      <Route path="/" element={<MainLayout />}>
          <Route index element={<MonthCalendar />} />
          <Route path="week" element={<WeekCalendar />} />
          <Route path="day" element={<DayCalendar />} />
        </Route>

     

    </Routes>
  );
};