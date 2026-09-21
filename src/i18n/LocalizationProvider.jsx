import { createContext, useContext, useEffect, useMemo, useCallback, useState } from 'react'
import en from './en'
import ar from './ar'

export const LANGS = ['en', 'ar']

const STORAGE_KEY = 'calendar-language'
const PREFS_KEY = 'calendar-preferences'

const DEFAULT_PREFS = {
  weekStart: null,
  digits: 'latn',
  showHijri: false,
}

const WEEK_START_DAY = { sat: 6, sun: 0, mon: 1 }

export const getInitialLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(stored)) return stored
    if (typeof navigator !== 'undefined' && /^ar\b/i.test(navigator.language || '')) return 'ar'
  } catch {
    // localStorage unavailable
  }
  return 'en'
}

export const getInitialPrefs = (lang) => {
  try {
    const stored = JSON.parse(localStorage.getItem(PREFS_KEY) || 'null')
    if (stored && typeof stored === 'object') {
      return {
        weekStart: lang === 'ar'
          ? stored.weekStart || 'sat'
          : stored.weekStart || 'sun',
        digits: stored.digits === 'arab' ? 'arab' : 'latn',
        showHijri: !!stored.showHijri,
      }
    }
  } catch {
    // ignore corrupted prefs
  }
  return { ...DEFAULT_PREFS, weekStart: lang === 'ar' ? 'sat' : 'sun' }
}

const getDict = (lang) => (lang === 'ar' ? ar : en)

const resolve = (obj, path) =>
  path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)

const getNumberSystem = (digits) => (digits === 'arab' ? 'arab' : 'latn')

export const LocalizationContext = createContext(null)

export function LocalizationProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)
  const [prefs, setPrefs] = useState(() => getInitialPrefs(getInitialLang()))

  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const dict = getDict(lang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang, dir])

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
    } catch {
      // ignore
    }
  }, [prefs])

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return
    setLangState(next)
    setPrefs((current) => ({
      ...current,
      weekStart:
        current.weekStart == null
          ? next === 'ar' ? 'sat' : 'sun'
          : current.weekStart || (next === 'ar' ? 'sat' : 'sun'),
    }))
  }, [])

  const setPref = useCallback((key, value) => {
    setPrefs((current) => ({ ...current, [key]: value }))
  }, [])

  const t = useCallback(
    (key, params) => {
      const template = resolve(dict, key)
      if (typeof template !== 'string') return key
      if (!params) return template
      return template.replace(/\{(\w+)\}/g, (match, name) =>
        params[name] == null ? match : String(params[name])
      )
    },
    [dict]
  )

  const locale = lang === 'ar' ? `ar-u-nu-${getNumberSystem(prefs.digits)}` : 'en'
  const hijriLocale =
    `ar-SA-u-ca-islamic-umalqura-nu-${getNumberSystem(prefs.digits)}`

  const formatters = useMemo(() => {
    const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: 'long' })
    const weekdayShort = new Intl.DateTimeFormat(locale, { weekday: 'short' })
    const weekdayNarrow = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })
    const monthLong = new Intl.DateTimeFormat(locale, { month: 'long' })
    const monthShort = new Intl.DateTimeFormat(locale, { month: 'short' })
    const dateFull = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const time12 = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
    })

    return {
      weekday: (date, width = 'short') => {
        const fmt =
          width === 'long'
            ? weekdayLong
            : width === 'narrow'
              ? weekdayNarrow
              : weekdayShort
        try {
          return fmt.format(date)
        } catch {
          return ''
        }
      },
      month: (date, width = 'long') => (width === 'short' ? monthShort : monthLong).format(date),
      dateFull: (date) => dateFull.format(date),
      time: (date) => time12.format(date),
      hijri: (date) => {
        try {
          return new Intl.DateTimeFormat(hijriLocale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(date)
        } catch {
          return ''
        }
      },
      dayNumber: (date) => String(date.getDate()),
    }
  }, [locale, hijriLocale])

  // Weekday labels in calendar order for the configured week start.
  const weekLabels = useMemo(() => {
    const offset = WEEK_START_DAY[prefs.weekStart || (lang === 'ar' ? 'sat' : 'sun')]
    const base = new Date(2024, 0, offset)
    const full = []
    const short = []
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(2024, 0, offset + i)
      full.push(formatters.weekday(d, 'long'))
      short.push(formatters.weekday(d, 'short'))
    }
    return { full, short, offset, base }
  }, [formatters, prefs.weekStart, lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      dir,
      t,
      locale,
      prefs,
      setPref,
      weekStart: prefs.weekStart || (lang === 'ar' ? 'sat' : 'sun'),
      digits: prefs.digits,
      showHijri: prefs.showHijri,
      ...formatters,
      weekLabels,
    }),
    [lang, setLang, dir, t, locale, prefs, setPref, formatters, weekLabels]
  )

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>
}

export const useLocalization = () => {
  const ctx = useContext(LocalizationContext)
  if (!ctx) throw new Error('useLocalization must be used within LocalizationProvider')
  return ctx
}