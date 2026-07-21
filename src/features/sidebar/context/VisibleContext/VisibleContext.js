import { createContext } from "react"

export const VisibleContext = createContext({
  isVisibleMenu: false,
  isVisibleDropDown: false,
  toggleVisibleMenu: () => {},
  toggleVisibleDropDown: () => {},
})
