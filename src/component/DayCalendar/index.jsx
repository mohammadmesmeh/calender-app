import { ChevronLeft, ChevronRight } from "lucide-react"
import { CONST } from "../../constants/const"
import { useDate } from "../../Hooks/useDate"
import { CurrentTimeLine } from "../CurrentTimeLine"
import { IconBtn } from "../Buttons/IconBtn"

export const DayCalendar = () => {
    const { hoursOfDay, dayInWeek, DAY , MONTH , handleClickNextDay,
        handleClickPrevDay } = useDate()
        

    return (
        


        <div className=" overflow-y-scroll bg-surface h-dvh z-10  px-4 md:px-8 pb-8 rounded-xl shadow-sm  w-full">
            
            <div className="header-day flex gap-6 w-full sticky bg-surface/70 backdrop-blur justify-center sm:justify-start items-center  top-0 p-6 z-50 " >
            
                <IconBtn icon={ChevronLeft} onClick={()=>handleClickPrevDay()}/>
                   <h3 className=" font-bold text-md md:text-3xl text-center w-40 md:w-60  ">{CONST.DAYS__OF__WEEK[dayInWeek]}<span className=" font-normal text-sm">{DAY},{CONST.MONTHS__OF__YEAR[MONTH]}</span></h3>
                 
                <IconBtn icon={ChevronRight} onClick={()=>handleClickNextDay()}/>
                
            </div>

            <div className="w-full flex flex-row px-3 mt-10  ">
                
                <div className="w-12">
                    {hoursOfDay.map((i) => (
                        <p className={`w-full h-[60px] text-[8px] md:text-[12px] relative bottom-1.5 sm:bottom-2`}>{i.label}</p>
                    ))}
                </div>
                <div className="w-full relative">
                    <CurrentTimeLine />
                    {hoursOfDay.map((i, index) => (
                        <p className={`w-full h-[60px] border-b border-border  ${index === 0 ? "border-t border-border " : ""} `}></p>
                    ))}
                </div>



            </div>
        </div>



    )
}