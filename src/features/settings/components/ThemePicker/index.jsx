import { Check } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext/ThemeContext'

export const ThemePicker = () => {
  const { theme, themes, setTheme } = useTheme()

  return (
    <div className="grid grid-cols-1 gap-1" role="listbox" aria-label="Select theme">
      {themes.map((t) => {
        const isActive = t.id === theme
        return (
          <button
            key={t.id}
            type="button"
            role="option"
            aria-selected={isActive}
            onClick={() => setTheme(t.id)}
            className={`
              flex items-center gap-2.5 rounded-button px-2.5 py-2 text-left text-xs
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
              ${isActive
                ? 'bg-primary/10 text-primary font-medium ring-1 ring-primary/30'
                : 'text-text-secondary hover:bg-primary-light/50 hover:text-primary'
              }
            `}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-border"
              style={{ backgroundColor: t.colors[1] }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: t.colors[0] }}
              />
            </span>

            <div className="flex-1 min-w-0">
              <div className="font-medium truncate text-xs">{t.label}</div>
              <div className="text-[11px] text-text-muted truncate">{t.description}</div>
            </div>

            {isActive && (
              <span className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white">
                <Check size={10} />
              </span>
            )}

            <span className="flex gap-0.5 shrink-0" aria-hidden="true">
              {t.colors.map((c, i) => (
                <span
                  key={i}
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </span>
          </button>
        )
      })}
    </div>
  )
}
