import { useState, useCallback, useMemo } from "react";
import { addDays, addMonths } from "../../utils/calendarUtils";
import { CalendarDateContext } from "./CalendarDateContext";

export const CalendarDateProvider = ({ children, initialDate }) => {
  const [viewDate, setViewDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());

  const goToday = useCallback(() => {
    const today = new Date();
    setViewDate(today);
    setSelectedDate(today);
  }, []);

  const goToDay = useCallback((date) => {
    setViewDate(date);
    setSelectedDate(date);
  }, []);

  const prevDay = useCallback(() => setViewDate((prev) => addDays(prev, -1)), []);
  const nextDay = useCallback(() => setViewDate((prev) => addDays(prev, 1)), []);
  const prevWeek = useCallback(() => setViewDate((prev) => addDays(prev, -7)), []);
  const nextWeek = useCallback(() => setViewDate((prev) => addDays(prev, 7)), []);
  const prevMonth = useCallback(() => setViewDate((prev) => addMonths(prev, -1)), []);
  const nextMonth = useCallback(() => setViewDate((prev) => addMonths(prev, 1)), []);

  const value = useMemo(
    () => ({
      viewDate,
      selectedDate,
      setViewDate,
      setSelectedDate,
      goToday,
      goToDay: goToDay,
      goPrevDay: prevDay,
      goNextDay: nextDay,
      goPrevWeek: prevWeek,
      goNextWeek: nextWeek,
      goPrevMonth: prevMonth,
      goNextMonth: nextMonth,
    }),
    [viewDate, selectedDate, goToday, goToDay, prevDay, nextDay, prevWeek, nextWeek, prevMonth, nextMonth]
  );

  return <CalendarDateContext.Provider value={value}>{children}</CalendarDateContext.Provider>;
};