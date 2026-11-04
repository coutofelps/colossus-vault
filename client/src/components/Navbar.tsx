import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { theme } = useTheme()
  const { isLoggedIn, user, logout } = useAuth()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const icon = theme === 'alt'
    ? '/brand-identity/assets/grey-version-icon.png'
    : '/brand-identity/assets/green-version-icon.png'

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.dataset.scrollLockNav = '1'
    } else {
      delete document.documentElement.dataset.scrollLockNav
    }
    return () => { delete document.documentElement.dataset.scrollLockNav }
  }, [menuOpen])

  const navigate = useNavigate()
  const firstName = user?.name.split(' ')[0] ?? ''

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
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive || ['/bids', '/account'].includes(pathname) ? styles.active : ''
                    }
                  >
                    Área do Comprador
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/payments" className={({ isActive }) => isActive ? styles.active : ''}>
                    Pagamentos
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className={styles.actions}>
{isLoggedIn ? (
              <NavLink to="/dashboard" className={styles.userChip}>{firstName}</NavLink>
            ) : (
              <Link to="/login" className={styles.loginBtn}>Entrar</Link>
            )}
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

      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

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

        {isLoggedIn && (
          <>
            <div className={styles.mobileDivider} />
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive || ['/bids', '/account'].includes(pathname) ? styles.mobileLinkActive : ''}`
              }
            >
              Área do Comprador
            </NavLink>
            <div className={styles.mobileDivider} />
            <NavLink to="/payments" className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}>
              Pagamentos
            </NavLink>
            <div className={styles.mobileDivider} />
            <NavLink to="/account" className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}>
              Dados da Conta
            </NavLink>
            <div className={styles.mobileDivider} />
            <button className={styles.mobileLogoutBtn} onClick={() => { logout(); navigate('/') }}>Sair</button>
          </>
        )}

      </div>
    </>
  )
}
