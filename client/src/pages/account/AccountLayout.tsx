import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import { mockUser } from '../../data/mockAccount'
import styles from './AccountLayout.module.css'

const navItems = [
  { to: '/account',           label: 'Dashboard',         end: true },
  { to: '/account/bids',      label: 'Meus Lances',       end: false },
  { to: '/account/watchlist', label: 'Acompanhando',      end: false },
  { to: '/account/payments',  label: 'Pagamentos',        end: false },
  { to: '/account/profile',   label: 'Dados da Conta',    end: false },
]

export default function AccountLayout() {
  usePageTitle('Minha Conta')

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.body}>
        {/* Sidebar desktop / abas mobile */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarUser}>
            <div className={styles.avatar}>{mockUser.name[0]}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{mockUser.name}</span>
              <span className={styles.userEmail}>{mockUser.email}</span>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Abas mobile */}
        <div className={styles.tabBar}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.tab} ${isActive ? styles.tabActive : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Conteúdo da sub-página */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
