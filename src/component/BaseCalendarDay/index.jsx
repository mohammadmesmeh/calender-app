

export const BaseCalendarDay =({day ,children, className , Month ,classNameOfContainer ,styleOfDay})=>{
    return(
        <div className={ `w-auto max-w-[159.43px] h-[160px] p-[12px] border  border-[#DCE0E5] rounded-xl shadow-sm ${classNameOfContainer}`} >
            <div className="day">
                <span style={styleOfDay} className={` p-2 text-xl font-medium ${className}`}>{day}<span className="text-sm font-normal">{Month}</span></span>
            </div>
            <div className="tasks-pending">
                {children}
            </div>

        </div>
    )


}