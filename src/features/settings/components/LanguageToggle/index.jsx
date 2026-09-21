import { Globe } from 'lucide-react'
import { useLocalization } from '@/i18n/LocalizationProvider'

/**
 * One-click AR/EN switch. Shows the TARGET language's name in its own
 * script (e.g. "العربية" while the app is in English), not the current
 * language, so the label always reads as an action rather than a status.
 */
export const LanguageToggle = ({ className = '' }) => {
  const { t, lang, setLang } = useLocalization()
  const isArabic = lang === 'ar'
  const targetLabel = isArabic ? t('settings.english') : t('settings.arabic')
  const ariaLabel = isArabic ? t('settings.switchToEnglish') : t('settings.switchToArabic')

  return (
    <button
      type="button"
      onClick={() => setLang(isArabic ? 'en' : 'ar')}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center gap-1.5
        rounded-button px-2.5 py-2
        bg-background text-text-muted
        border border-border
        shadow-subtle
        hover:bg-border/70 hover:text-text hover:shadow-card
        active:scale-95
        motion-safe:transition-all motion-safe:duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        ${className}
      `}
    >
      <Globe size={16} className="shrink-0" aria-hidden="true" />
      <span className="text-xs font-medium whitespace-nowrap">{targetLabel}</span>
    </button>
  )
}
