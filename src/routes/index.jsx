
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'
import { MotionPage } from '../animations'
import { MainLayout } from "../component/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { MonthCalendar } from "../component/MonthCalendar";
import { WeekCalendar } from "../component/WeekCalendar";
import { DayCalendar } from "../component/DayCalendar";
import { Calendar } from "../pages/Calendar";
import { RegisterPage } from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute/index.jsx";

export const Routeing = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Login route */}
        <Route path="/register" element={<MotionPage><RegisterPage /></MotionPage>} />

        {/* Protected App */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MotionPage><MonthCalendar /></MotionPage>} />
          <Route path="week" element={<MotionPage><WeekCalendar /></MotionPage>} />
          <Route path="day" element={<MotionPage><DayCalendar /></MotionPage>} />
        </Route>

        {/* dashboard محمي كمان */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MotionPage><Dashboard /></MotionPage>
            </ProtectedRoute>
          }
        />

      </Routes>
    </AnimatePresence>
  );
};

