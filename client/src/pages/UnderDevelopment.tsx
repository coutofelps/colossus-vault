import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import usePageTitle from '../hooks/usePageTitle'
import styles from './UnderDevelopment.module.css'
import btnStyles from '../components/Button.module.css'

export default function UnderDevelopment() {
  usePageTitle('Em Desenvolvimento')
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <p className={styles.eyebrow}>Em construção</p>
        <p className={styles.code} aria-hidden>WIP</p>
        <h1 className={styles.title}>
          Recurso em <em>desenvolvimento</em>
        </h1>
        <p className={styles.description}>
          Estamos trabalhando nessa parte da plataforma. Em breve estará disponível para você.
        </p>
        <div className={styles.actions}>
          <Link to="/auctions" className={`${btnStyles.btn} ${btnStyles.primary} ${btnStyles.md}`}>
            Ver leilões
          </Link>
          <Link to="/" className={`${btnStyles.btn} ${btnStyles.outline} ${btnStyles.md}`}>
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
