import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const icon = theme === 'alt'
    ? '/brand-identity/assets/grey-version-icon.png'
    : '/brand-identity/assets/green-version-icon.png'

  // Fecha o menu ao navegar
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Bloqueia scroll quando menu está aberto (usa dataset para não conflitar com ImageGallery)
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.dataset.scrollLockNav = '1'
    } else {
      delete document.documentElement.dataset.scrollLockNav
    }
    return () => { delete document.documentElement.dataset.scrollLockNav }
  }, [menuOpen])

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.brand}>
            <img src={icon} alt="Colossus Vault" className={styles.logo} />
            <span className={styles.wordmark}>
              Colossus <em>Vault</em>
            </span>
          </Link>

          <ul className={styles.links}>
            <li>
              <NavLink to="/auctions" className={({ isActive }) => isActive ? styles.active : ''}>
                Leilões
              </NavLink>
            </li>
            <li>
              <NavLink to="/under-development" className={({ isActive }) => isActive ? styles.active : ''}>
                Loja da Galera
              </NavLink>
            </li>
          </ul>

          <div className={styles.actions}>
            <Link to="/login" className={styles.loginBtn}>Entrar</Link>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      {/* Mobile dropdown — fora do header para escapar do stacking context do backdrop-filter */}
      <div
        className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <NavLink to="/auctions" className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}>
          Leilões
        </NavLink>
        <div className={styles.mobileDivider} />
        <NavLink to="/under-development" className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}>
          Loja da Galera
        </NavLink>
        <div className={styles.mobileDivider} />
        <div className={styles.mobileThemeSection}>
          <span className={styles.mobileThemeLabel}>Paleta</span>
          <div className={styles.mobileThemeOptions}>
            <button
              className={`${styles.mobileThemeBtn} ${theme === 'default' ? styles.mobileThemeBtnActive : ''}`}
              onClick={() => { if (theme !== 'default') toggle() }}
            >
              <span className={styles.mobileThemeSwatch} style={{ background: '#8FD62F' }} />
              Principal
            </button>
            <button
              className={`${styles.mobileThemeBtn} ${theme === 'alt' ? styles.mobileThemeBtnActive : ''}`}
              onClick={() => { if (theme !== 'alt') toggle() }}
            >
              <span className={styles.mobileThemeSwatch} style={{ background: '#A050FF' }} />
              Alternativa
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
