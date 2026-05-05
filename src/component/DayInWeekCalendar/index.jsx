
import { useDate } from "../../Hooks/useDate"

export const DayInWeekCalendar = ({
 
    children
}) => {
    const { hoursOfDay } = useDate()
    return (
        
        <div className=" w-full ">

           {/* <div className="  pb-6 shadow-sm  bg-white backdrop-blur sticky top-0 ">
             <span className=" block px-3 pt-3  text-xl font-medium ">{dayName}</span>
                <span className="text-sm block px-3  ">{day},{Month}</span>
           </div> */}
            <div className="  w-full border-l  border-border" >
                {hoursOfDay.map(() => (
                    <div className="h-[120px]  text-sm border-b border-[#cccccc]">

                        {children}
                    </div>
                ))}
            </div>
        </div>
        
    )
}