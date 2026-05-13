import { AddButtons } from "../Buttons/AddButtons"
import { NavigationMenuItem } from "../NavigationMenuItem"
import { Logo } from "../Logo"
import { UserProfile } from "../UserProfile"
import { ShineButton } from "../Buttons/ShineButton"
import { Calendar, ChartColumn, CalendarClock, ListChecks, LayoutDashboard, Settings, CalendarPlus } from 'lucide-react'
export const Slidebar = () => {
  return (
    <div className="slidebar-container w-[300px] h-screen flex flex-col gap-4 tracking-tight bg-gradient-to-r from-primary to-secondary shadow-md py-6 px-5 text-white sticky top-0  overflow-hidden ">

      <nav>
        <ul className="flex flex-col gap-4 mt-4">
          <NavigationMenuItem to="/dashboard" text="Dashboard" icon={LayoutDashboard} />
          <NavigationMenuItem to="/" text="Calendar" icon={Calendar} />
          <NavigationMenuItem to="/tasks" text="Tasks" icon={ListChecks} />
          <NavigationMenuItem to="/events" text="Events" icon={CalendarClock} />
          <NavigationMenuItem to="/analytics" text="Analytics" icon={ChartColumn} />
          <NavigationMenuItem to="/settings" text="Settings" icon={Settings} />


        </ul>
      </nav>
      <ShineButton className="mt-5 h-fit">
        <CalendarPlus />
        Add Task
      </ShineButton>

      <div className="">
        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <UserProfile classNameIcon='bg-white text-primary ' className='bg-secondary p-4 rounded-lg text-white mt-4  ' />
        <div />


      </div>
    </div>
      
)}
