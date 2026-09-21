import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext/ThemeContext'

export const ThemeToggle = ({ className = '' }) => {
  const { setTheme, isDark } = useTheme()

  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <button
      type="button"
      onClick={toggle}
      className={`
        relative inline-flex items-center justify-center gap-1.5
        rounded-button p-2
        bg-background text-text-muted
        border border-border
        shadow-subtle
        hover:bg-border/70 hover:text-text hover:shadow-card
        active:scale-95
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="relative flex items-center justify-center w-5 h-5">
        <Sun
          size={18}
          className={`absolute transition-all duration-300 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          size={18}
          className={`absolute transition-all duration-300 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </span>
    </button>
  )
}
