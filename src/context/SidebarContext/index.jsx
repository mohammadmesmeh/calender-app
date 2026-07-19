import { createContext, useContext, useEffect, useState } from "react"

const SidebarContext = createContext({
  isDesktop: true,
  mobileOpen: false,
  expanded: false,
  setHovered: () => {},
  setMobileOpen: () => {},
})

export const SidebarProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  )

  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768
      setIsDesktop(desktop)
      if (!desktop) setHovered(false)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [mobileOpen])

  const expanded = isDesktop ? hovered : mobileOpen

  return (
    <SidebarContext.Provider value={{ isDesktop, mobileOpen, expanded, setHovered, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => useContext(SidebarContext)
