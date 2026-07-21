
import { useContext } from "react"
import { CalendarPopover } from "@/features/calendar/components/CalendarPopover"
import { VisibleContext } from "@/features/sidebar/context/VisibleContext"

export const MainMenu = ({ className }) => {
    const { isVisibleMenu } = useContext(VisibleContext)
    return (
        <div style={{
            display: isVisibleMenu ? 'flex' : 'none'
        }} className={`MainMenu w-96 bg-surface flex-row justify-end overflow-hidden  my-3  ${className}`}>
           <div className="overflow-x-hidden overflow-y-scroll w-fit h-[100vh] py-4 px-3">

            <CalendarPopover />
           </div>
        </div>
    )

}