import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'default' | 'alt'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'default', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return (localStorage.getItem('cv-theme') as Theme) || 'default' } catch { return 'default' }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'alt' ? 'alt' : ''
    try { localStorage.setItem('cv-theme', theme) } catch {}
  }, [theme])

  const toggle = () => setTheme(t => t === 'default' ? 'alt' : 'default')

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
