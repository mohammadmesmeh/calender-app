import { Menu, X } from "lucide-react"
export const MobileMenuButton = ({ onClick, mobileOpen }) => (


  <button
    type="button"
    onClick={onClick}
    className="flex h-11 w-11 items-center justify-center rounded-button border border-border/80 bg-surface text-text shadow-subtle transition-all duration-200 hover:bg-primary-light hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:hidden"
    aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
  >
    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
  </button>


)
