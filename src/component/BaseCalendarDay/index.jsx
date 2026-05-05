

// export const BaseCalendarDay =({day ,children, className , Month ,classNameOfContainer ,styleOfDay})=>{
//     return(
//             <div className="day">
//                 <span style={styleOfDay} className={` p-2 text-xl font-medium ${className}`}>{day}<span className="text-sm font-normal">{Month}</span></span>
//             </div>
//             <div className="tasks-pending">
//                 {children}
//             </div>

//         </div>
//     )


//<div className={ `w-14 h-14 sm:w-22 sm:h-22  md:w-28 md:h-28 lg:w-36 lg:h-36 min-w-10 min-h-10 p-[12px] border  border-[#DCE0E5] rounded-xl shadow-sm ${classNameOfContainer}`} >
// }
export const BaseCalendarDay = ({
    day,
    children,
    className,
    Month,
    classNameOfContainer,
    styleOfDay,
}) => {
    return (
        <div
            className={` max-w-[160px] aspect-square
            p-1
            md:p-2
            
            border
             border-[#DCE0E5] 
             rounded-2xl
            shadow-sm
             bg-white
            flex 
            flex-col
             justify-start
             gap-2
            hover:shadow-md
             transition-all
              duration-200
               
              
            ${classNameOfContainer}`}
        >
            <div className="flex items-center  justify-center md:justify-between 
             pb-1
            after:h-px
               relative
              after:bg-gray-200
               after:absolute
               after:left-0
               
       
                after:bottom-0
                after:w-full
               after:content-['']
                ">
                <span
                    style={styleOfDay}
                    className={`text-[8px] md:text-sm  font-semibold ${className} rounded-full flex justify-center items-center w-full max-w-5 md:max-w-8 aspect-square  `}
                >
                    {day}
                </span>

                {Month && (
                    <span className="text-xs text-gray-400 font-medium hidden md:block">
                        {Month}
                    </span>
                )}
            </div>

            
           

            {/* tasks */}
            <div className="flex-1 overflow-hidden flex flex-col gap-1">
                {children}
            </div>
        </div>
    );
};