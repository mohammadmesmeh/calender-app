import { CONST } from "../../constants/const";
import { useDate } from "../../Hooks/useDate"
import { BaseCalendarDay } from "../BaseCalendarDay";
import { Day } from "../Day";
import { IconBtn } from '../Buttons/IconBtn'
import { ChevronLeft, ChevronRight } from "lucide-react";

export const MonthCalendar = () => {
    const { day, ThisMonthDaysNumsArray, NumFirstDayInMonth, PrevMonthDaysNumsArray, NextMonthDaysNumsArray, nextMonthName, prevMonthName,
        YEAR,
        handleClickNextMonth,
        handleClickPrevMonth,
        monthName,
        thisMonth,
        MONTH,
        thisYear

    } = useDate();
    return (
        <div className="flex-grow flex-shrink bg-surface rounded-3xl shadow-sm   pb-8  h-full overflow-x-hidden overflow-y-scroll  w-full">
            <div className=" sticky  top-0 bg-white/70 backdrop-blur w-auto  py-3  px-3 md:px-8   ">
                <div className=" flex   items-center content-center">
                    <IconBtn icon={ChevronLeft} onClick={handleClickPrevMonth} />
                    <p className=" text-center font-bold mx-5 w-40">{monthName},{YEAR}</p>
                    <IconBtn icon={ChevronRight} onClick={handleClickNextMonth} />

                </div>
                <div className="  hidden md:grid grid-cols-[repeat(7,minmax(30px,1fr))] md:grid-cols-[repeat(7,minmax(60px,1fr))] xl:grid-cols-[repeat(7,minmax(120px,1fr))] gap-1 justify-center  items-center my-3 ">
                    {CONST.DAYS__OF__WEEK.map((item, index) => (
                        <div
                            key={index}
                            className="flex-1 text-center text-[10px]  lg:text-sm font-medium text-text-secondary "
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className="  grid md:hidden grid-cols-[repeat(7,minmax(30px,1fr))] md:grid-cols-[repeat(7,minmax(60px,1fr))] xl:grid-cols-[repeat(7,minmax(120px,1fr))] gap-1 justify-center  items-center my-3 ">
                    {CONST.DAYS__OF__WEEK.map((item, index) => (
                        <div
                            key={index}
                            className="flex-1 text-center text-[10px]  lg:text-sm font-medium text-text-secondary "
                        >
                            {item.slice(0,3)}
                        </div>
                    ))}
                </div>

           
            </div>


            <div className="grid grid-cols-[repeat(7,minmax(30px,1fr))] md:grid-cols-[repeat(7,minmax(60px,1fr))] xl:grid-cols-[repeat(7,minmax(120px,1fr))]  gap-1  px-3 md:px-8 " >

                {
                    NumFirstDayInMonth !== 0 ? (

                        PrevMonthDaysNumsArray.slice(-NumFirstDayInMonth).map((item) => (
                            < BaseCalendarDay Month={`,${prevMonthName}`} day={item} className="text-gray-400 " />


                        ))
                    ) : null

                }

                {ThisMonthDaysNumsArray.map((item) => (
                    <BaseCalendarDay day={item}
                        classNameOfContainer={`border ${item === day && thisMonth === MONTH && thisYear === YEAR ? "border-primary shadow-active" : ""}`}


                        className={item === day && thisMonth === MONTH && thisYear === YEAR ? " bg-primary rounded-full flex justify-center items-center  w-11 aspect-square  text-white" : ""}
                    >

                    </BaseCalendarDay>

                ))}
                {
                    NextMonthDaysNumsArray.slice(0, 42 - NumFirstDayInMonth - ThisMonthDaysNumsArray.length).map((item) => (
                        < BaseCalendarDay Month={`,${nextMonthName}`} day={item} className="text-gray-400" />

                    ))




                }
            </div>
        </div>

    )

}