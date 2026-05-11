import { LayoutDashboard, CirclePlus ,Search,Bell  } from 'lucide-react'
import { Logo } from '../Logo'
import { UserProfile } from '../UserProfile'
import { AddButtons } from '../Buttons/AddButtons'
export const DashboardHeader = () => {
    return (
        <div className="dashboard-header-container flex items-center justify-between  shadow-xl px-6 py-4 ">
            <div className="logo-container flex items-center gap-2  bg-white text-primary  ">
                <div className="icon  "><LayoutDashboard size={45} /> </div>
                <div className="logo  ">
                    <Logo />
                    <span className="  text-text-muted capitalize text-sm  ">dashboard</span>
                </div>

            </div>
            <div className="dashboard-header-actions flex items-center gap-4">
                <form action="" className="relative">
                    <label htmlFor="search" className="text-text-muted absolute bottom-3 left-2 z-10 pointer-events-none">
                        <Search  size={20}/>
                    </label>
                    <input type="search" id="search" name='search' placeholder="Search tasks, events..." className="bg-white text-text border-2 border-border rounded-xl py-2 px-8 placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/30 " />
                </form>
                <div className="notification cursor-pointer relative ">
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 text-[10px] text-center  z-10 text-white border-white ">2</span>
                        <Bell className="text-text-muted hover:text-primary hover:rotate-3 transition-colors transition-transform  "  />
                </div>
                <AddButtons content="Quick Add" className='hidden md:flex bg-primary text-white group' >
                    <CirclePlus className=' transition-transform duration-300  group-hover:rotate-180' />
                </AddButtons>
                <UserProfile classNameIcon='bg-primary text-white ' hiddenName='hidden' />
            </div>
        </div>
    )
}