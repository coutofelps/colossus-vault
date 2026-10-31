import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import styles from './Footer.module.css'

const NAV = [
  {
    heading: 'Marketplace',
    links: [
      { label: 'Leilões', to: '/auctions' },
      { label: 'Loja da Galera', to: '/under-development' },
    ],
  },
  {
    heading: 'Plataforma',
    links: [
      { label: 'Como funciona', to: '/under-development' },
      { label: 'Vendedores verificados', to: '/under-development' },
      { label: 'Lance proxy', to: '/under-development' },
    ],
  },
  {
    heading: 'Conta',
    links: [
      { label: 'Entrar', to: '/under-development' },
      { label: 'Cadastrar', to: '/under-development' },
      { label: 'Meus lances', to: '/under-development' },
    ],
  },
]

export default function Footer() {
  const { theme } = useTheme()
  const icon = theme === 'alt'
    ? '/brand-identity/assets/grey-version-icon.png'
    : '/brand-identity/assets/green-version-icon.png'

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLink}>
            <img src={icon} alt="Colossus Vault" className={styles.logo} />
            <span className={styles.wordmark}>
              Colossus <em>Vault</em>
            </span>
          </Link>
          <p className={styles.tagline}>
            A primeira plataforma de leilão premium para action figures e colecionáveis do Brasil.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Links do rodapé">
          {NAV.map(group => (
            <div key={group.heading} className={styles.group}>
              <p className={styles.groupHeading}>{group.heading}</p>
              <ul className={styles.groupLinks}>
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className={styles.link}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Colossus Vault. Todos os direitos reservados.
        </p>
        <p className={styles.madeIn}>
          Feito com dedicação para a comunidade colecionadora brasileira 🇧🇷
        </p>
      </div>
    </footer>
  )
}
