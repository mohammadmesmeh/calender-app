import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'
import { MotionPage } from '@/components/MotionPage'
import { MainLayout } from "../components/layout/MainLayout";
import { Dashboard } from "@/features/dashboard/pages/Dashboard";
import { MonthCalendar } from "../features/calendar/components/MonthCalendar";
import { WeekCalendar } from "../features/calendar/components/WeekCalendar";
import { DayCalendar } from "../features/calendar/components/DayCalendar";

import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "../features/auth/pages/ForgotPasswordPage";
import { ProtectedRoute } from "./ProtectedRoute/index.jsx";

export const Routeing = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Public auth routes */}
        <Route path="/login" element={<MotionPage><LoginPage /></MotionPage>} />
        <Route path="/register" element={<MotionPage><RegisterPage /></MotionPage>} />
        <Route path="/forgot-password" element={<MotionPage><ForgotPasswordPage /></MotionPage>} />

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

