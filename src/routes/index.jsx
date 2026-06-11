
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../component/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { MonthCalendar } from "../component/MonthCalendar";
import { WeekCalendar } from "../component/WeekCalendar";
import { DayCalendar } from "../component/DayCalendar";
import { Calendar } from "../pages/Calendar";
import { Register } from "../pages/Login/register.jsx";
import { ProtectedRoute } from "./ProtectedRoute/index.jsx";

export const Routeing = () => {

  return (
    <Routes>

      {/* Login route */}
      <Route path="/register" element={<Register />} />

      {/* Protected App */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MonthCalendar />} />
        <Route path="week" element={<WeekCalendar />} />
        <Route path="day" element={<DayCalendar />} />
      </Route>

      {/* dashboard محمي كمان */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

