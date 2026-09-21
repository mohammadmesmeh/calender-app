import { Languages, CalendarDays, Hash, Moon } from 'lucide-react'
import { useLocalization } from '@/i18n/LocalizationProvider'

const WEEK_START_OPTIONS = [
  { value: 'sat', labelKey: 'settings.weekStartSaturday' },
  { value: 'sun', labelKey: 'settings.weekStartSunday' },
  { value: 'mon', labelKey: 'settings.weekStartMonday' },
]

const Row = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2.5 px-1 pb-1 pt-3 text-xs font-medium text-text-secondary">
    <Icon size={14} className="shrink-0 text-text-muted" />
    <span>{label}</span>
  </div>
)

export const LanguageSettings = () => {
  const { t, lang, setLang, weekStart, setPref, digits, showHijri } = useLocalization()

  return (
    <div className="space-y-2">
      <Row icon={Languages} label={t('settings.language')} />
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
          className={`rounded-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            lang === 'en'
              ? 'border-primary bg-primary/10 font-medium text-primary'
              : 'border-border text-text-secondary hover:bg-primary-light/40'
          }`}
        >
          {t('settings.english')}
        </button>
        <button
          type="button"
          onClick={() => setLang('ar')}
          aria-pressed={lang === 'ar'}
          className={`rounded-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            lang === 'ar'
              ? 'border-primary bg-primary/10 font-medium text-primary'
              : 'border-border text-text-secondary hover:bg-primary-light/40'
          }`}
        >
          {t('settings.arabic')}
        </button>
      </div>

      <Row icon={CalendarDays} label={t('settings.weekStart')} />
      <div className="grid grid-cols-3 gap-2">
        {WEEK_START_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setPref('weekStart', option.value)}
            aria-pressed={weekStart === option.value}
            className={`rounded-button border px-2 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              weekStart === option.value
                ? 'border-primary bg-primary/10 font-medium text-primary'
                : 'border-border text-text-secondary hover:bg-primary-light/40'
            }`}
          >
            {t(option.labelKey)}
          </button>
        ))}
      </div>

      <Row icon={Hash} label={t('settings.digits')} />
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setPref('digits', 'latn')}
          aria-pressed={digits === 'latn'}
          className={`rounded-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            digits === 'latn'
              ? 'border-primary bg-primary/10 font-medium text-primary'
              : 'border-border text-text-secondary hover:bg-primary-light/40'
          }`}
        >
          {t('settings.digitsLatn')}
        </button>
        <button
          type="button"
          onClick={() => setPref('digits', 'arab')}
          aria-pressed={digits === 'arab'}
          className={`rounded-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            digits === 'arab'
              ? 'border-primary bg-primary/10 font-medium text-primary'
              : 'border-border text-text-secondary hover:bg-primary-light/40'
          }`}
        >
          {t('settings.digitsArab')}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setPref('showHijri', !showHijri)}
        aria-pressed={showHijri}
        className="mt-3 flex w-full items-center justify-between gap-2 rounded-button border border-border px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-primary-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <span className="flex items-center gap-2.5">
          <Moon size={14} className="shrink-0 text-text-muted" />
          <span className="text-start">{t('settings.showHijri')}</span>
        </span>
        <span
          aria-hidden="true"
          className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
            showHijri ? 'bg-primary' : 'bg-border'
          }`}
        >
          <span
            className={`h-4 w-4 rounded-full bg-white shadow transition-[margin] ${
              showHijri ? 'ms-auto' : 'me-auto'
            }`}
          />
        </span>
      </button>
      <p className="px-1 pb-1 text-[11px] text-text-muted">{t('settings.showHijriHint')}</p>
    </div>
  )
}