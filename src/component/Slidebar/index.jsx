import { AddButtons } from "../Buttons/AddButtons"
import { NavigationMenuItem } from "../NavigationMenuItem"
import { Logo } from "../Logo"
import { UserProfile } from "../UserProfile"
import { ShineButton } from "../Buttons/ShineButton"
import { Calendar, ChartColumn, CalendarClock, ListChecks, LayoutDashboard, Settings, CalendarPlus } from 'lucide-react'
export const Slidebar = () => {
    return (
        <div className=" slidebar-container w-[300px] h-dvh tracking-tight bg-gradient-to-r from-primary to-secondary shadow-md   py-5 px-5 flex flex-col   text-white sticky top-0   ">

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
            <div className="flex-1 flex flex-col justify-start gap-3 mt-3">
                <div className="relative mb-4"><div className="absolute my-6 h-px w-full bg-gradient-to-r from-transparent via-border/70 to-transparent z-10 "></div></div>

                <UserProfile classNameIcon='bg-white text-primary ' className='bg-secondary p-4 rounded-lg text-white mt-4  ' />

            </div>


        </div>
    )
}