import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import usePageTitle from '../hooks/usePageTitle'
import styles from './Home.module.css'

export default function Home() {
  usePageTitle('')
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.hero}>
        <div className={styles.grid} aria-hidden />
        <div className={styles.glow} aria-hidden />
        <div className={styles.content}>
          <p className={styles.eyebrow}>A primeira plataforma premium de leilão de estátuas</p>
          <h1 className={styles.heading}>
            Colossus<br /><em>Vault</em>
          </h1>
          <p className={styles.sub}>
            Action figures raros e colecionáveis verificados.<br />
            Leilões reais, vendedores confiáveis, sem WhatsApp.
          </p>
          <div className={styles.ctas}>
            <Link to="/auctions">
              <Button size="lg">Ver Leilões</Button>
            </Link>
            <Link to="/brand-identity">
              <Button variant="ghost" size="lg">Brand Identity →</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
