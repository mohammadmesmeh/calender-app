import { useReducer, useState } from "react"
import { CONST } from "../../constants/const"
const reducer = (state, action) => {
    switch (action.type) {
        case CONST.ACTION_TYPES.PREV__MONTH:
            return {
                ...state,

                MONTH: state.MONTH !== 0 ? state.MONTH - action.payload : 11,
                YEAR: state.MONTH === 0 ? state.YEAR - 1 : state.YEAR


            }
        case CONST.ACTION_TYPES.NEXT__MONTH:
            return {
                ...state,
                MONTH: state.MONTH !== 11 ? state.MONTH + action.payload : 0,
                YEAR: state.MONTH === 11 ? state.YEAR + 1 : state.YEAR,

            }
        case CONST.ACTION_TYPES.NEXT__DAY:
            return {
                ...state,
                DAY: state.DAY !== 7 ? state.DAY + action.payload : 0,

            }
             case CONST.ACTION_TYPES.PREV__DAY:
            return {
                ...state,
                DAY: state.DAY !== 0 ? state.DAY - action.payload : 7,
                
            }

    }

}
const INITIAl__STATE = {
    MONTH: new Date().getMonth(),
    YEAR: new Date().getFullYear(),
    DAY: new Date().getDay(),



}


export const useDate = () => {
    const [state, dispatch] = useReducer(reducer, INITIAl__STATE);
    const now = new Date()
    const NumFirstDayInMonth = new Date(state.YEAR, state.MONTH, 1).getDay();
    const NumLastDayInMonth = new Date(state.YEAR, state.MONTH + 1, 0).getDay();
    const FirstDayInMonth = CONST.DAYS__OF__WEEK[NumFirstDayInMonth];
    const thisYear = new Date().getFullYear();
    
    const daysInMonth = new Date(state.YEAR, state.MONTH + 1, 0).getDate();
    const day = new Date().getDate();


    const thisMonth = new Date().getMonth();

    const monthName = CONST.MONTHS__OF__YEAR[state.MONTH];
    const nextMonthName = CONST.MONTHS__OF__YEAR[state.MONTH + 1];
    const prevMonthName = CONST.MONTHS__OF__YEAR[state.MONTH - 1];
    const daysInPrevMonth = new Date(state.YEAR, state.MONTH, 0).getDate();
    const daysInNextMonth = new Date(state.YEAR, state.MONTH + 2, 0).getDate();
    const ThisMonthDaysNumsArray = Array.from({ length: daysInMonth }, (_, i) => ++i);
    const PrevMonthDaysNumsArray = Array.from({ length: daysInPrevMonth }, (_, i) => ++i);
    const NextMonthDaysNumsArray = Array.from({ length: daysInNextMonth }, (_, i) => ++i);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const current = new Date(state.YEAR, state.MONTH, day);
    const dayOfWeek = current.getDay(); // رقم اليوم في الأسبوع (0-6)
    const startWeek = day - dayOfWeek;        // أول يوم في الأسبوع
    const endWeek = startWeek + 6;            // آخر يوم في الأسبوع


    const handleClickPrevMonth = () => {
        dispatch({ type: CONST.ACTION_TYPES.PREV__MONTH, payload: 1 });


    }

    const handleClickNextMonth = () => {
        dispatch({ type: CONST.ACTION_TYPES.NEXT__MONTH, payload: 1 });
    }
    
    const handleClickPrevDay = () => {
        dispatch({ type: CONST.ACTION_TYPES.PREV__DAY, payload: 1 });


    }
      const handleClickNextDay = () => {
        dispatch({ type: CONST.ACTION_TYPES.NEXT__DAY, payload: 1 });
    }

    const hoursOfDay = Array.from({ length: 24 }, (_, i) => {
        const date = new Date(state.YEAR, state.MONTH, day, i);
        return {
            hour: date.getHours(),
            label: date.toLocaleTimeString('en', { hour: '2-digit' })
        };
    });










    return {
        ...state,
        handleClickPrevMonth,
        handleClickNextMonth,
        handleClickNextDay,
        handleClickPrevDay,
        now,
        hoursOfDay,
        monthName,
        NumFirstDayInMonth,
        PrevMonthDaysNumsArray,
        ThisMonthDaysNumsArray,
        day,
        thisMonth,
        NextMonthDaysNumsArray,
        FirstDayInMonth,
        nextMonthName,
        thisYear,
        prevMonthName,
        startWeek,
        endWeek,
        timezone,


        hours,
        minutes,
        seconds,

        // ...location




    }
}