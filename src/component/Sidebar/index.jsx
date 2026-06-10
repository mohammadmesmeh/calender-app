import { AddButtons } from "../Buttons/AddButtons"
import { NavigationMenuItem } from "../NavigationMenuItem"
import { Logo } from "../Logo"
import { UserProfile } from "../UserProfile"
import { ShineButton } from "../Buttons/ShineButton"
import { Calendar, ChartColumn, CalendarClock, ListChecks, LayoutDashboard, Settings, CalendarPlus } from 'lucide-react'
export const Sidebar = () => {
  return (
    <div className="sidebar-container w-[100px] md:w-[300px] h-screen flex flex-col gap-2  tracking-tight bg-white shadow-lg py-2 md:py-6 px-2 md:px-5 text-text sticky min-h-screen  top-0    ">
      <div className="logo-container flex items-center gap-2  bg-white text-primary  ">
        <div className="icon  "><LayoutDashboard size={45} /> </div>
        <div className="logo  ">
          <Logo />
          <span className="  text-text-muted capitalize text-xs md:text-sm  ">dashboard</span>
        </div>

      </div>
      <nav>
        <ul className="flex flex-col gap-3 mt-3">
          <NavigationMenuItem to="/dashboard" text="Dashboard" icon={LayoutDashboard} />
          <NavigationMenuItem to="/" text="Calendar" icon={Calendar} />
          <NavigationMenuItem to="/tasks" text="Tasks" icon={ListChecks} />
          <NavigationMenuItem to="/events" text="Events" icon={CalendarClock} />
          <NavigationMenuItem to="/analytics" text="Analytics" icon={ChartColumn} />
          <NavigationMenuItem to="/settings" text="Settings" icon={Settings} />


        </ul>
      </nav>
      <ShineButton className="mt-3 h-fit text-white">
        <CalendarPlus size={20} className="" />
        <p className="hidden md:block ">Add Task </p>
      </ShineButton>


      <div className="mt-auto">
        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

        <UserProfile
          classNameIcon="bg-white text-primary"
          className="bg-secondary p-2 md:p-4 rounded-lg text-white"
        />
      </div>
    </div>

  )
}
