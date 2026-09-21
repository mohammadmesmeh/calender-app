import { createContext, useContext } from "react"

export const SidebarContext = createContext({
  isDesktop: true,
  mobileOpen: false,
  expanded: false,
  setHovered: () => {},
  setMobileOpen: () => {},
})

export const useSidebarContext = () => useContext(SidebarContext)
