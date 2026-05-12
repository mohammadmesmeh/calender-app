import { CONST } from "../../constants/const";
import { useDate } from "../../Hooks/useDate"
import { BaseCalendarDay } from "../BaseCalendarDay";
import { Day } from "../Day";
import { IconBtn } from '../Buttons/IconBtn'
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useRef } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

export const MonthCalendar = () => {
    const {
        ThisMonthDaysNumsArray,
        NumFirstDayInMonth,
        PrevMonthDaysNumsArray,
        NextMonthDaysNumsArray,
        nextMonthName,
        prevMonthName,
        handleClickNextMonth,
        handleClickPrevMonth,
        monthName,
        thisMonth,
        DAY,
        MONTH,
        YEAR,
        thisYear
    } = useDate();
    const carouselRef = useRef(null)
    const { scrollYProgress } = useScroll({
        container: carouselRef
    })

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })



    return (
        <>


            <div ref={carouselRef} className=" relative flex-grow flex-shrink bg-surface rounded-3xl shadow-sm   pb-8  h-dvh overflow-x-hidden overflow-y-scroll  w-full">
                <div className=" sticky  top-0 bg-white/70 backdrop-blur w-auto  py-3 z-10  px-3 md:px-8   ">
                    <motion.div
                        id="scroll-indicator"
                        style={{
                            scaleX,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 10,
                            transformOrigin: "left",
                            backgroundColor: "#3B82F6",
                        }}
                    />
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
                                className="flex-1 text-center text-[10px]  lg:text-sm font-medium text-text-secondary  "
                            >
                                {item.slice(0, 3)}
                            </div>
                        ))}
                    </div>
                </div>





                <div className="grid grid-cols-[repeat(7,minmax(30px,1fr))] md:grid-cols-[repeat(7,minmax(60px,1fr))] xl:grid-cols-[repeat(7,minmax(120px,1fr))]  gap-1  px-3 md:px-8 " >

                    {
                        NumFirstDayInMonth !== 0 ? (

                            PrevMonthDaysNumsArray.slice(-NumFirstDayInMonth).map((item) => (
                                < BaseCalendarDay Month={`${prevMonthName.slice(0, 3)}`} day={item} className="text-gray-400 " />


                            ))
                        ) : null

                    }

                    {ThisMonthDaysNumsArray.map((item) => (
                        <BaseCalendarDay day={item}
                            classNameOfContainer={`border ${item === DAY && thisMonth === MONTH && thisYear === YEAR ? "border-primary shadow-active" : ""}`}


                            className={item === DAY && thisMonth === MONTH && thisYear === YEAR ? " bg-primary text-white" : " bg-transparent  "}
                        >

                        </BaseCalendarDay>

                    ))}
                    {
                        NextMonthDaysNumsArray.slice(0, 42 - NumFirstDayInMonth - ThisMonthDaysNumsArray.length).map((item) => (
                            < BaseCalendarDay Month={`${nextMonthName.slice(0, 3)}`} day={item} className="text-gray-400" />

                        ))




                    }
                </div>
            </div>
        </ >


    )

}