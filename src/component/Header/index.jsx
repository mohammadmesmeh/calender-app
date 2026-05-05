// import './header.css'
import { Menu, Logs, ChevronDown, ChevronUp } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
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
    const [displayedView, setDisplayedView] = useState(getViewName());
    const [animating, setAnimating] = useState(false);
    useEffect(() => {
        setAnimating(true);

        const timeout = setTimeout(() => {
            setDisplayedView(getViewName());
            setAnimating(false);
        }, 150);

        return () => clearTimeout(timeout);
    }, [location.pathname]);
    return (

        <>
            <header className="logo w-auto flex px-5 sm:px-16 py-3 bg-white/80 backdrop-blur sticky top-2 z-50  h-14 content-center items-center   justify-between  shadow-lg mx-10 my-4 rounded-full text-text ">
                <div >
                    <h1 className=" text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary
                                 bg-clip-text text-transparent text-heading sm:text-2xl lg:text-3xl">
                        Calender
                    </h1>
                </div>
                {/* <nav className="max-w-[300px] min-w-[200px] hidden md:flex ">
                    <ul className="  hidden md:flex  justify-between items-center w-full ">
                        <li className="cursor-pointer  text-sm px-3 py-6 hover:text-gray-400 transition-all  "><NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : ''}>Month</NavLink></li>
                        <li className="cursor-pointer text-sm px-3 py-6 hover:text-gray-400 transition-all "><NavLink to='/week' className={({ isActive }) => isActive ? 'text-primary' : ''}>Week</NavLink></li>
                        <li className="cursor-pointer text-sm px-3 py-6 hover:text-gray-400 transition-all "><NavLink to='/day' className={({ isActive }) => isActive ? 'text-primary' : ''}>Day</NavLink></li>
                        <li className="cursor-pointer  text-[55px] px-3 py-6 ">{isVisibleMenu ? <Logs onClick={() => handleClickMenu()} size='20px' className="text-primary " /> : <Menu onClick={() => handleClickMenu()} size='20px' className="hover:text-gray-400 transition-all " />}</li>
                    </ul>

                </nav> */}
                <nav className={`rounded-2xl flex justify-between relative  items-center `} >
                    <nav className={`relative flex items-center  justify-end gap-2  min-w-28   `}>
                        <div
                            onClick={handleClickDropDown}
                            className={`cursor-pointer px-2 sm:px-4  py-1 sm:py-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-[14px] rounded-full bg-gray-100
                             hover:bg-gray-200 active:scale-95 transition-all duration-200 ease-out
                             shadow-sm hover:shadow-md`}
                        >
                            <span
                                className={`transition-transform duration-300 ease-in-out ${isVisibleDropDown ? "rotate-180" : "rotate-0"
                                    }`}
                            >
                                <ChevronDown size={'15px'} />
                            </span>

                            <span
                                className={`font-medium transition-all duration-300 ease-out 
                                 ${animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}
                            >
                                {displayedView}
                            </span>
                        </div>

                        <nav className={`transition-all duration-300 ease-in-out  ${isVisibleDropDown ? "max-h-60 opacity-100 bg-slate-600" : "max-h-0 opacity-0 pointer-events-none"}`}>

                            {isVisibleDropDown && (
                                <ul
                                    className={`absolute top-full left-0 mt-2 w-32 bg-white shadow-lg rounded-xl border overflow-hidden z-50 `}

                                >
                                    <li >
                                        <NavLink to="/" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                                            Month
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/week" className="block px-4 py-2 hover:bg-gray-100 transition-all " >
                                            Week
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/day" className="block px-4 py-2 hover:bg-gray-100 transition-all ">
                                            Day
                                        </NavLink>
                                    </li>

                                </ul>
                            )}
                        </nav>
                    </nav>
                    <div
                        onClick={handleClickMenu}
                        className="cursor-pointer p-2 rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-200 ease-out
                             shadow-sm hover:shadow-md"
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