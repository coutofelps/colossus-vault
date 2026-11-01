import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { THEMES } from '../data/themes'
import styles from './ThemePanel.module.css'

export default function ThemePanel() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [open])

  if (pathname === '/brand-identity') return null

  return (
    <div className={styles.root} ref={panelRef}>
      <button
        className={styles.fab}
        onClick={() => setOpen(o => !o)}
        aria-label="Paleta de cores"
        aria-expanded={open}
        title="Personalizar tema"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.54-.21-1.03-.54-1.4a.993.993 0 0 1-.26-.67c0-.55.45-1 1-1h1.18c3.03 0 5.62-2.42 5.62-5.5C21 6.73 16.97 2 12 2z" fill="currentColor" opacity=".15"/>
          <circle cx="6.5"  cy="11.5" r="1.5" fill="currentColor"/>
          <circle cx="9.5"  cy="7.5"  r="1.5" fill="#8FD62F"/>
          <circle cx="14.5" cy="7.5"  r="1.5" fill="#A050FF"/>
          <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
        </svg>
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Selecionar paleta">
          <p className={styles.panelTitle}>Paleta</p>
          <ul className={styles.list}>
            {THEMES.map(t => (
              <li key={t.id}>
                <button
                  className={`${styles.option} ${theme === t.id ? styles.optionActive : ''}`}
                  onClick={() => { if (theme !== t.id) toggle(); setOpen(false) }}
                >
                  <span className={styles.swatches}>
                    {t.swatches.map(c => (
                      <span key={c} className={styles.swatch} style={{ background: c }} />
                    ))}
                  </span>
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{t.label}</span>
                    <span className={styles.optionDesc}>{t.desc}</span>
                  </span>
                  {theme === t.id && (
                    <svg className={styles.check} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
