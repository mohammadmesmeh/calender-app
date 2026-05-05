// import { ArrowBigLeft, ArrowBigRight, ChevronLeft, ChevronRight } from "lucide-react";
// import { useDate } from "../../Hooks/useDate"
// import { DayInWeekCalendar } from "../../component/DayInWeekCalendar"
// import { CONST } from "../../constants/const";
// import { IconBtn } from "../Buttons/IconBtn";
// import { CurrentTimeLine } from "../CurrentTimeLine";
// // import { useState } from "react";

// export const WeekCalendar = () => {
//     //   const [month , setMonth] =useState(monthName)
//     const { ThisMonthDaysNumsArray,
//         handleClickNextWeek,
//         handleClickPrevWeek,
//         // fullArray,
//         // weekDays,
//         PrevMonthDaysNumsArray,
//         NextMonthDaysNumsArray,
//         NumLastDayInMonth,
//         // nextMonthName,
//         thisDay,
//         thisMonth,
//         MONTH,
//         monthName,
//         NumFirstDayInMonth,
      
//         hoursOfDay,
//         timezone,
//         // prevMonthName,
//         getWeekDays,
//         thisDayInWeek } = useDate()
//     const parts = timezone.split('/')
//     // console.log(weekDays);
//     // console.log(dayOfWeek);
//      console.log(getWeekDays());
//      let weekDays = getWeekDays();
//      console.log(weekDays);
     

   

//     // const handleMonthName = (i) => {
//     //     let index = fullArray.indexOf(i);
//     //     let name = monthName;
//     //     if (index < fullArray.length - 1) {
//     //         fullArray = [
//     //             ...fullArray,
//     //             ...NextMonthDaysNumsArray
//     //         ]
//     //         name = nextMonthName;

//     //     }
//     //     // const name =  ?
//     //     //     nextMonthName : index > fullArray.length-1 ?
//     //     //         prevMonthName : monthName;
//     //     return name;
//     // }
//     //     const handleMonthName = (dayNum) => {
//     //     // الشهر الحالي يبدأ من 1 وينتهي عند daysInMonth
//     //     if (dayNum >= 1 && dayNum <= NumLastDayInMonth) {
//     //         return monthName;  // الشهر الحالي
//     //     } else if (dayNum < 1) {
//     //         return prevMonthName;  // الشهر السابق
//     //     } else {
//     //         return nextMonthName;  // الشهر الجاي
//     //     }
//     // }









//     return (


//         <div className="flex flex-col h-full bg-surface rounded-3xl shadow-sm ps-8 pe-8 overflow-hidden overflow-x-auto">
//             <div>
//                 <IconBtn icon={ArrowBigLeft} onClick={handleClickPrevWeek} />
//                 <IconBtn icon={ArrowBigRight} onClick={handleClickNextWeek} />



//             </div>
//             < div className="grid grid-cols-[60px_repeat(7,minmax(70px,1fr))] sticky top-0  z-10 bg-white/40 backdrop-blur-md pb-2 pt-3 mb-3" >
//                 {/* TZ cell */}
//                 <div className=""  >
//                     <span className="block text-md font-medium">{parts[0]}/</span>
//                     {parts[1] && <span className="text-sm block">{parts[1]}</span>}
//                 </div >


//                 {/* Day headers */}

//                 {
//                     weekDays.map((item, index) => (
//                         <div key={index} className={` text-center cursor-pointer ${index === thisDayInWeek && MONTH === thisMonth ? 'text-primary' : ''}`} >
//                             <span className="block text-md font-medium">{CONST.DAYS__OF__WEEK[index]}</span>
//                             <span className="text-sm block ">{item.getDate()},{monthName}</span>
//                         </div>
//                     ))
//                 }

//             </div >
//             <div className="grid grid-cols-[60px_repeat(7,minmax(70px,1fr))] overflow-y-scroll flex-1 pt-8">
//                 {/* Hour column */}
//                 <div className=" sticky left-0 bg-white/70 ">
//                     {hoursOfDay.map((i, index) => (
//                         <div className="h-[60px] text-[12px]">


//                             <span key={index} className=" relative bottom-2  z-10  block">{i.label}</span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Day columns */}
//                 {weekDays.map((item, index) => (
//                     <div key={index} className="border-l border-border flex-1 cursor-pointer relative ">
//                         {hoursOfDay.map((i, index) => (
//                             <div key={index} className="h-[60px] border-b border-border" />
//                         ))}
//                         {thisDay === item ? <CurrentTimeLine /> : ''}
//                     </div>


//                 ))}
//             </div>




//         </ div >


//     )
// }
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useDate } from "../../Hooks/useDate";
import { CONST } from "../../constants/const";
import { IconBtn } from "../Buttons/IconBtn";
import { CurrentTimeLine } from "../CurrentTimeLine";

export const WeekCalendar = () => {

    const {
        handleClickNextWeek,
        handleClickPrevWeek,
        thisDay,
        thisMonth,
        thisYear,
        MONTH,
        hoursOfDay,
        timezone,
        getWeekDays,        
    } = useDate();

    const parts = timezone.split('/');

    const weekDays = getWeekDays();

    return (
        <div className="flex flex-col  h-full bg-surface rounded-3xl shadow-sm   overflow-hidden overflow-y-scroll">

            {/* Navigation */}
            {/* <div>
                <IconBtn icon={ArrowBigLeft} onClick={handleClickPrevWeek} />
                <IconBtn icon={ArrowBigRight} onClick={handleClickNextWeek} />
            </div> */}

            {/* Header */}
            <div className="grid grid-cols-[30px_repeat(7,minmax(0px,1fr))] md:grid-cols-[55px_repeat(7,minmax(0px,1fr))] px-3 md:px-8 justify-between items-center sticky top-0 z-30 bg-white/40 backdrop-blur-md pb-2 pt-3  ">

                {/* Timezone */}
                <div className=" text-[6px] md:text-xs font-light ">
                    <span className="block">{parts[0]}/</span>
                    {parts[1] && <span className=" block">{parts[1]}</span>}
                </div>

                {/* Days */}
                {weekDays.map((item, index) => {
                    const isToday =
                        item.getDate() === thisDay &&
                        item.getMonth() === thisMonth &&
                        item.getFullYear() === thisYear;

                    return (
                        <div
                            key={index}
                            className={`text-center cursor-pointer ${isToday ? 'text-primary' : ''}`}
                        >
                            <span className="block text-[10px] md:text-sm font-medium">
                                {CONST.DAYS__OF__WEEK[item.getDay()].slice(0,3)}
                            </span>

                            <span className="text-[8px] md:text-sm block">
                                {item.getDate()},
                                {CONST.MONTHS__OF__YEAR[item.getMonth()]}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Body */}
            <div className="grid grid-cols-[30px_repeat(7,minmax(0px,1fr))]  md:grid-cols-[55px_repeat(7,minmax(0px,1fr))]  px-3 md:px-8  flex-1 pt-4">

                {/* Hours */}
                <div className="sticky left-0 bg-white/70">
                    {hoursOfDay.map((i, index) => (
                        <div key={index} className="h-[60px] text-[8px] md:text-[12px]">
                            <span className="relative bottom-1.5 md:bottom-2 z-10 block">
                                {i.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Days Columns */}
                {weekDays.map((item, index) => {

                    const isToday =
                        item.getDate() === thisDay &&
                        item.getMonth() === thisMonth &&
                        item.getFullYear() === thisYear;

                    return (
                        <div key={index} className="border-l border-border flex-1 relative">

                            {hoursOfDay.map((_, i) => (
                                <div key={i} className="h-[60px] border-b border-border" />
                            ))}

                            {isToday && <CurrentTimeLine />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
