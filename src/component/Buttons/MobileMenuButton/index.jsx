import { Menu, X } from "lucide-react"
export const MobileMenuButton = ({ onClick, mobileOpen }) => (


  <button
    type="button"
    onClick={onClick}
    className="  flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-white text-text shadow-soft transition-all duration-200 hover:bg-primary-light hover:text-primary md:hidden"
    aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
  >
    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
  </button>


)
