import { useState } from "react";
import { CONST } from "@/constants/const";

export const useDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const YEAR = currentDate.getFullYear();
  const MONTH = currentDate.getMonth();
  const DAY = currentDate.getDate();

  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();
  const thisDay = new Date().getDate();
  const thisDayInWeek = new Date().getDay();

  const monthName = CONST.MONTHS__OF__YEAR[MONTH];
  const nextMonthName = CONST.MONTHS__OF__YEAR[(MONTH + 1) % 12];
  const prevMonthName = CONST.MONTHS__OF__YEAR[(MONTH - 1 + 12) % 12];

  const NumLastDayInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
  const NumFirstDayInMonth = new Date(YEAR, MONTH, 1).getDay();

  const ThisMonthDaysNumsArray = Array.from({ length: new Date(YEAR, MONTH + 1, 0).getDate() }, (_, i) => ++i);
  const PrevMonthDaysNumsArray = Array.from({ length: new Date(YEAR, MONTH, 0).getDate() }, (_, i) => ++i);
  const NextMonthDaysNumsArray = Array.from({ length: new Date(YEAR, MONTH + 2, 0).getDate() }, (_, i) => ++i);

  const handleClickNextWeek = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const handleClickPrevWeek = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const handleClickNextMonth = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const handleClickPrevMonth = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleClickNextDay = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  };

  const handleClickPrevDay = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  return {
    YEAR,
    MONTH,
    DAY,
    thisYear,
    thisMonth,
    thisDay,
    thisDayInWeek,
    ThisMonthDaysNumsArray,
    PrevMonthDaysNumsArray,
    NextMonthDaysNumsArray,
    monthName,
    nextMonthName,
    prevMonthName,
    NumLastDayInMonth,
    NumFirstDayInMonth,
    handleClickNextWeek,
    handleClickPrevWeek,
    handleClickNextMonth,
    handleClickPrevMonth,
    handleClickNextDay,
    handleClickPrevDay,
  };
};