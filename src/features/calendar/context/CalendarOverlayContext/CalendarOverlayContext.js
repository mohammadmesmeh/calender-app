import { createContext, useContext } from "react";

export const CalendarOverlayContext = createContext(null);

export const useCalendarOverlay = () => {
  const context = useContext(CalendarOverlayContext);
  if (!context) {
    throw new Error("useCalendarOverlay must be used within a CalendarOverlayProvider");
  }
  return context;
};