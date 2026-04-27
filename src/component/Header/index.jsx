// import './header.css'
import { Menu, Logs } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useContext } from "react"
import { VisibleContext } from "../../context/VisibleContext"
export const Header = () => {

    const location = useLocation();


    const { toggleVisibleMenu, toggleVisibleDropDown, isVisibleDropDown, isVisibleMenu } = useContext(VisibleContext)
    const handleClickMenu = () => {
        toggleVisibleMenu()
    }
    const handleClickDropDown = () => {
        toggleVisibleDropDown()
    }
    const getViewName = () => {
        if (location.pathname === "/") return "Month";
        if (location.pathname === "/week") return "Week";
        if (location.pathname === "/day") return "Day";
    }
    return (
    
        <>
            <header className="logo w-auto flex px-16 py-3 bg-white/80 backdrop-blur sticky top-2 z-40  h-14 content-center items-center   justify-between  shadow-lg mx-10 my-4 rounded-full text-text ">
                <div >
                    <h1 className=" text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary
                                 bg-clip-text text-transparent text-heading md:text-2xl lg:text-3xl">
                        Calender
                    </h1>
                </div>
                <nav className="max-w-[300px] min-w-[200px] hidden md:flex ">
                    <ul className="  hidden md:flex  justify-between items-center w-full ">
                        <li className="cursor-pointer  text-sm px-3 py-6 hover:text-gray-400 transition-all  "><NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : ''}>Month</NavLink></li>
                        <li className="cursor-pointer text-sm px-3 py-6 hover:text-gray-400 transition-all "><NavLink to='/week' className={({ isActive }) => isActive ? 'text-primary' : ''}>Week</NavLink></li>
                        <li className="cursor-pointer text-sm px-3 py-6 hover:text-gray-400 transition-all "><NavLink to='/day' className={({ isActive }) => isActive ? 'text-primary' : ''}>Day</NavLink></li>
                        <li className="cursor-pointer  text-[55px] px-3 py-6 ">{isVisibleMenu ? <Logs onClick={() => handleClickMenu()} size='20px' className="text-primary " /> : <Menu onClick={() => handleClickMenu()} size='20px' className="hover:text-gray-400 transition-all " />}</li>
                    </ul>

                </nav>
                <nav className="rounded-2xl flex justify-between relative  items-center md:hidden " >
                    <nav className="relative flex items-center">

                        {/* الزر */}
                        <div
                            onClick={handleClickDropDown}
                            className="cursor-pointer px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm"
                        >
                            {getViewName()}
                        </div>

                        {/* dropdown */}
                        {isVisibleDropDown && (
                            <ul className="absolute top-full left-0 mt-2 w-32 bg-white shadow-lg rounded-xl border overflow-hidden z-50">

                                <li>
                                    <NavLink to="/" className="block px-4 py-2 hover:bg-gray-100">
                                        Month
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/week" className="block px-4 py-2 hover:bg-gray-100">
                                        Week
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/day" className="block px-4 py-2 hover:bg-gray-100">
                                        Day
                                    </NavLink>
                                </li>

                            </ul>
                        )}
                    </nav>
                    <div
                        onClick={handleClickMenu}
                        className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        {isVisibleMenu ? (
                            <Logs size={20} className="text-primary" />
                        ) : (
                            <Menu size={20} className="text-text" />
                        )}
                    </div>
                </nav>

            </header>
        </>
    )
}