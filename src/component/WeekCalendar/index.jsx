import {  ChevronLeft, ChevronRight } from "lucide-react";
import { useDate } from "../../Hooks/useDate"
import { DayInWeekCalendar } from "../../component/DayInWeekCalendar"
import { CONST } from "../../constants/const";
import { IconBtn } from "../Buttons/IconBtn";
import { CurrentTimeLine } from "../CurrentTimeLine"; 

export const WeekCalendar = () => {
 
    const { ThisMonthDaysNumsArray, endWeek, day, startWeek ,thisMonth, MONTH, monthName, hoursOfDay, timezone ,DAY } = useDate()
    const parts = timezone.split('/')
    const days = ThisMonthDaysNumsArray.slice(startWeek - 1, endWeek)
    
    
    
    

    return (


        <div className="flex flex-col h-full bg-surface rounded-3xl shadow-sm ps-8 pe-8 overflow-hidden overflow-x-auto">
              
            < div className="grid grid-cols-[60px_repeat(7,minmax(70px,1fr))] sticky top-0  z-10 bg-white/40 backdrop-blur-md pb-2 pt-3 mb-3" >
                {/* TZ cell */}
                <div className=""  >
                    <span className="block text-md font-medium">{parts[0]}/</span>
                    {parts[1] && <span className="text-sm block">{parts[1]}</span>}
                </div >


                {/* Day headers */}
                
                {
                    days.map((item, index) => (
                        <div key={index} className={`cursor-pointer ${index === DAY && MONTH === thisMonth  ? 'text-primary' : ''}`} >
                            <span className="block text-md font-medium">{CONST.DAYS__OF__WEEK[index]}</span>
                            <span className="text-sm block">{item}, {monthName}</span>
                        </div>
                    ))
                }
       
            </div >
            <div className="grid grid-cols-[60px_repeat(7,minmax(70px,1fr))] overflow-y-scroll flex-1 pt-8">
                {/* Hour column */}
                <div className=" sticky left-0 bg-white/70 ">
                    {hoursOfDay.map((i, index) => (
                        <div className="h-[60px] text-[12px]">
                            
                    
                            <span key={index} className=" relative bottom-2  z-10  block">{i.label}</span>
                        </div>
                    ))}
                </div>

                {/* Day columns */}
                {days.map((item, index) => (
                    <div key={index} className="border-l border-border flex-1 cursor-pointer relative ">
                        {hoursOfDay.map((i, index) => (
                            <div key={index} className="h-[60px] border-b border-border" />
                        ))}
                     { day===item ? <CurrentTimeLine/> : ''}
                    </div>

                   
                ))}
            </div>
      



        </ div >


    )
}
