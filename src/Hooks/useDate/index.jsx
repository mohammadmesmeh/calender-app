// import { useReducer } from "react"
// import { CONST } from "../../constants/const"
// const reducer = (state, action) => {
//     switch (action.type) {
//         case CONST.ACTION_TYPES.PREV__MONTH:
//             return {
//                 ...state,

//                 MONTH: state.MONTH !== 0 ? state.MONTH - action.payload : 11,
//                 YEAR: state.MONTH === 0 ? state.YEAR - 1 : state.YEAR


//             }
//         case CONST.ACTION_TYPES.NEXT__MONTH:
//             return {
//                 ...state,
//                 MONTH: state.MONTH !== 11 ? state.MONTH + action.payload : 0,
//                 YEAR: state.MONTH === 11 ? state.YEAR + 1 : state.YEAR,

//             }
//         case CONST.ACTION_TYPES.NEXT__DAY:
//             return {
//                 ...state,
//                 DAY: state.DAY !== 7 ? state.DAY + action.payload : 0,

//             }
//         case CONST.ACTION_TYPES.PREV__DAY:
//             return {
//                 ...state,
//                 DAY: state.DAY !== 0 ? state.DAY - action.payload : 7,

//             }
//         case CONST.ACTION_TYPES.NEXT__WEEK:
//             const newDayNext = state.DAY + 7;
//             const daysInCurrentMonth = new Date(state.YEAR, state.MONTH + 1, 0).getDate();


//             if (newDayNext > daysInCurrentMonth) {
//                 // الأسبوع الجاي في الشهر الجاي
//                 return {
//                     ...state,
//                     DAY: newDayNext - daysInCurrentMonth,
//                     MONTH: state.MONTH !== 11 ? state.MONTH + 1 : 0,
//                     YEAR: state.MONTH === 11 ? state.YEAR + 1 : state.YEAR
//                 }
//             }
//             return {
//                 ...state,
//                 DAY: newDayNext
//             }

//         case CONST.ACTION_TYPES.PREV__WEEK:
//             const newDayPrev = state.DAY - 7;

//             if (newDayPrev < 1) {
//                 // الأسبوع السابق في الشهر السابق
//                 const prevMonth = state.MONTH === 0 ? 11 : state.MONTH - 1;
//                 const prevYear = state.MONTH === 0 ? state.YEAR - 1 : state.YEAR;
//                 const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

//                 return {
//                     ...state,
//                     DAY: daysInPrevMonth + newDayPrev,
//                     MONTH: prevMonth,
//                     YEAR: prevYear
//                 }
//             }
//             return {
//                 ...state,
//                 DAY: newDayPrev
//             }

//     }

// }
// const INITIAl__STATE = {
//     MONTH: new Date().getMonth(),
//     YEAR: new Date().getFullYear(),
//     DAY: new Date().getDate(),
// }


// export const useDate = () => {
//     const [state, dispatch] = useReducer(reducer, INITIAl__STATE);
//     const now = new Date(state.YEAR, state.MONTH, state.DAY)
//     const NumFirstDayInMonth = new Date(state.YEAR, state.MONTH, 1).getDay();
//     const NumLastDayInMonth = new Date(state.YEAR, state.MONTH + 1, 0).getDate();
//     const FirstDayInMonth = CONST.DAYS__OF__WEEK[NumFirstDayInMonth];
//     const thisYear = new Date().getFullYear();
//     const thisMonth = new Date().getMonth();
//     const thisDay = new Date().getDate();
//     const thisDayInWeek = new Date().getDay();
//     const monthName = CONST.MONTHS__OF__YEAR[state.MONTH];

//     const nextMonthName = CONST.MONTHS__OF__YEAR[state.MONTH + 1];
//     const prevMonthName = CONST.MONTHS__OF__YEAR[state.MONTH - 1];
//     const daysInMonth = new Date(state.YEAR, state.MONTH + 1, 0).getDate();
//     const daysInPrevMonth = new Date(state.YEAR, state.MONTH, 0).getDate();
//     const daysInNextMonth = new Date(state.YEAR, state.MONTH + 2, 0).getDate();
//     const ThisMonthDaysNumsArray = Array.from({ length: daysInMonth }, (_, i) => ++i);
//     const PrevMonthDaysNumsArray = Array.from({ length: daysInPrevMonth }, (_, i) => ++i);
//     const NextMonthDaysNumsArray = Array.from({ length: daysInNextMonth }, (_, i) => ++i);
//     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     const seconds = now.getSeconds();
//     const startOfWeek = () => {
//         const d = now;
//         const day = d.getDay(); // 0 = Sunday

//         d.setDate(d.getDate() - day);
//         return d;
//     };
//     const getWeekDays = () => {
//         const start = startOfWeek();

//         return Array.from({ length: 7 }, (_, i) => {
//             const d = new Date(start);
//             d.setDate(start.getDate() + i);
//             return d.getDate();
//         });
//     };

//     //     const current = new Date(state.YEAR, state.MONTH, state.DAY);
//     //     const dayOfWeek = current.getDay(); // رقم اليوم في الأسبوع (0-6)

//     //     // أول يوم في الأسبوع (بافتراض الأسبوع يبدأ الأحد)
//     //     const startWeek = state.DAY - dayOfWeek;

//     //     // آخر يوم في الأسبوع
//     //     const endWeek = startWeek + 6;

//     //     let fullArray = [
//     //         ...ThisMonthDaysNumsArray,   
//     //     ]

//     //     const safeStart = Math.max(0, startWeek - 1 + PrevMonthDaysNumsArray.length);
//     // const weekDays = fullArray.slice(safeStart, safeStart + 7);
//     //     // const weekDays = ThisMonthDaysNumsArray.slice(
//     //     //     Math.max(0, startWeek - 1),
//     //     //     Math.min(ThisMonthDaysNumsArray.length, endWeek)
//     //     // );
//     const hoursOfDay = Array.from({ length: 24 }, (_, i) => {
//         const date = new Date(state.YEAR, state.MONTH, thisDay, i);
//         return {
//             hour: date.getHours(),
//             label: date.toLocaleTimeString('en', { hour: '2-digit' })
//         };
//     });

//     // ThisMonthDaysNumsArray.slice(startWeek - 1,endWeek).map((item)=>(
//     // console.log(item)
//     // ))

//     const handleClickPrevMonth = () => {
//         dispatch({ type: CONST.ACTION_TYPES.PREV__MONTH, payload: 1 });
//     }

//     const handleClickNextMonth = () => {
//         dispatch({ type: CONST.ACTION_TYPES.NEXT__MONTH, payload: 1 });
//     }

//     const handleClickPrevDay = () => {
//         dispatch({ type: CONST.ACTION_TYPES.PREV__DAY, payload: 1 });
//         // if(){

//         // }
//     }

//     const handleClickNextDay = () => {
//         dispatch({ type: CONST.ACTION_TYPES.NEXT__DAY, payload: 1 });

//     }
//     const handleClickNextWeek = () => {
//         dispatch({ type: CONST.ACTION_TYPES.NEXT__WEEK });
//     }

//     const handleClickPrevWeek = () => {
//         dispatch({ type: CONST.ACTION_TYPES.PREV__WEEK });
//     }




//     return {
//         ...state,
//         handleClickPrevMonth,
//         handleClickNextMonth,
//         handleClickNextDay,
//         handleClickPrevDay,
//         handleClickNextWeek,
//         handleClickPrevWeek,
//         getWeekDays,

//         now,
//         hoursOfDay,
//         monthName,
//         NumFirstDayInMonth,
//         NumLastDayInMonth,

//         PrevMonthDaysNumsArray,
//         ThisMonthDaysNumsArray,
//         thisDay,
//         thisMonth,
//         thisDayInWeek,
//         NextMonthDaysNumsArray,
//         FirstDayInMonth,
//         nextMonthName,
//         thisYear,
//         prevMonthName,
//         // startWeek,
//         // endWeek,
//         // weekDays,
//         timezone,
//         hours,
//         minutes,
//         seconds,
//         // fullArray,
//         // ...location
//     }
// }
import { useState } from "react";
import { CONST } from "../../constants/const";

export const useDate = () => {
  // سابقا كنا متحكمين بالسنة والشهر واليوم بشكل يدوي وكل واحدة مصدر مختلف 
  //فهنا المصدر المتخكم واحد وهو ال currentDate
  const [currentDate, setCurrentDate] = useState(new Date());


  const YEAR = currentDate.getFullYear();
  const MONTH = currentDate.getMonth(); // 0-11
  const DAY = currentDate.getDate();

  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();
  const thisDay = new Date().getDate();
  const thisDayInWeek = new Date().getDay();
  const dayInWeek = currentDate.getDay();

  const monthName = CONST.MONTHS__OF__YEAR[MONTH];
  // % حتى اذا وصل 11 يزود 1 فبصير 12 % 12 
  // وهيكون الناتج صفر يعني هينتقل للشهر الاول من السنة التانية 
  //وفي حالة 0 -1 +12 يعني 
  // الشهر يكون 11 وهو الشهر الاخير من السنة السابقة
  const nextMonthName = CONST.MONTHS__OF__YEAR[(MONTH + 1) % 12];
  const prevMonthName = CONST.MONTHS__OF__YEAR[(MONTH - 1 + 12) % 12];


  const NumLastDayInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
  const NumFirstDayInMonth = new Date(YEAR, MONTH, 1).getDay();

  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
  const daysInPrevMonth = new Date(YEAR, MONTH, 0).getDate();
  const daysInNextMonth = new Date(YEAR, MONTH + 2, 0).getDate();
  const ThisMonthDaysNumsArray = Array.from({ length: daysInMonth }, (_, i) => ++i);
  const PrevMonthDaysNumsArray = Array.from({ length: daysInPrevMonth }, (_, i) => ++i);
  const NextMonthDaysNumsArray = Array.from({ length: daysInNextMonth }, (_, i) => ++i);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // 🕒 ساعات اليوم
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(YEAR, MONTH, DAY, i);
    return {
      hour: i,
      label: d.toLocaleTimeString("en", { hour: "2-digit" }),
    };
  });

  // 📆 بداية الأسبوع (الأحد)
  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  };

  // 📅 أيام الأسبوع (كـ Date مش أرقام!)
  const getWeekDays = () => {
    const start = startOfWeek(currentDate);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  // 🔁 التنقل

  const handleClickNextWeek = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const handleClickPrevWeek = () => {
    //التحديث بتم عال current 
    // وجميع المتغيرات تتغير وفقا لل current
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
    //  setCurrentDate((prev) => {
    //   const d = new Date(prev);
    //   d.setDate(d.getDay() + 1);
    //   return d;
    // });
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
    dayInWeek,

    daysInMonth,
    daysInPrevMonth,
    daysInNextMonth,
    ThisMonthDaysNumsArray,
    PrevMonthDaysNumsArray,
    NextMonthDaysNumsArray,

    monthName,
    nextMonthName,
    prevMonthName,

    NumLastDayInMonth,
    NumFirstDayInMonth,

    timezone,
    hours,
    minutes,
    seconds,
    hoursOfDay,

    getWeekDays,

    handleClickNextWeek,
    handleClickPrevWeek,
    handleClickNextMonth,
    handleClickPrevMonth,
    handleClickNextDay,
    handleClickPrevDay,
  };
};