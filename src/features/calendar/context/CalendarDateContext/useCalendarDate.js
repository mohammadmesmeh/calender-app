import { useContext } from "react";
import { CalendarDateContext } from "./CalendarDateContext";

export const useCalendarDate = () => {
  const context = useContext(CalendarDateContext);
  if (!context) {
    throw new Error("useCalendarDate must be used within a CalendarDateProvider");
  }
  return context;
};