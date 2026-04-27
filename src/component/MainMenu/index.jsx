
import { useContext } from "react"
import { CalendarPopover } from "../CalendarPopover"
import { VisibleContext } from "../../context/VisibleContext"

export const MainMenu = ({ className }) => {
    const { isVisibleMenu } = useContext(VisibleContext)
    return (
        <div style={{
            display: isVisibleMenu ? 'flex' : 'none'
        }} className={`MainMenu w-96 bg-white  flex-row justify-end overflow-hidden flex-grow my-3  ${className}`}>
           <div className="overflow-x-hidden overflow-y-scroll h-[100vh] py-4 px-3">

            <CalendarPopover />
           </div>
        </div>
    )

}