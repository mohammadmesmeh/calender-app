import { useContext } from "react"
import { CalendarPopover } from "@/features/calendar/components/CalendarPopover"
import { VisibleContext } from "@/features/sidebar/context/VisibleContext"

export const MainMenu = ({ className }) => {
  const { isVisibleMenu } = useContext(VisibleContext)
  if (!isVisibleMenu) return null

  return (
    <div className={`w-64 bg-surface flex-row justify-end overflow-hidden my-3 ${className}`}>
      <div className="overflow-x-hidden overflow-y-auto max-h-[calc(100dvh-8rem)] py-4 px-3">
        <CalendarPopover />
      </div>
    </div>
  )
}