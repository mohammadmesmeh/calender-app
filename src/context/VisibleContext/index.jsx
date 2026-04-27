import { createContext, useState } from "react"

export const VisibleContext = createContext({
    isVisibleMenu: false,
    isVisibleDropDown: false,
    toggleVisibleMenu: () => { },
    toggleVisibleDropDown: () => { },
});
export const VisibleContextProvider = ({ children }) => {
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);
    const toggleVisibleMenu = () => setIsVisibleMenu(!isVisibleMenu);
    const toggleVisibleDropDown = () => setIsVisibleDropDown(!isVisibleDropDown);
    return (
        <VisibleContext.Provider value={{ isVisibleMenu, isVisibleDropDown, toggleVisibleMenu, toggleVisibleDropDown }}>
            {children}
        </VisibleContext.Provider>
    )

}
