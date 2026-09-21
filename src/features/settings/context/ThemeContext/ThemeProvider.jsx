import { useState, useEffect, useCallback, useMemo } from 'react'
import { THEMES } from '@/constants/themes'
import { ThemeContext } from './ThemeContext'

const STORAGE_KEY = 'calender-theme'

const THEME_IDS = THEMES.map((t) => t.id)

const getInitialTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (THEME_IDS.includes(stored)) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const setThemeById = useCallback((id) => {
    if (THEME_IDS.includes(id)) setTheme(id)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      themes: THEMES,
      setTheme: setThemeById,
      isDark: theme === 'dark' || theme === 'midnight',
    }),
    [theme, setThemeById]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
