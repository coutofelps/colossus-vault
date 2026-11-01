import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import usePageTitle from '../hooks/usePageTitle'
import styles from './UnderDevelopment.module.css'
import btnStyles from '../components/Button.module.css'

interface Props { bare?: boolean; title?: string }

export default function UnderDevelopment({ bare, title }: Props) {
  usePageTitle(bare ? null : (title ?? 'Em Desenvolvimento'))

  const main = (
    <main className={bare ? styles.mainBare : styles.main}>
      <p className={styles.eyebrow}>Em construção</p>
      <p className={styles.code} aria-hidden>WIP</p>
      {!bare && (
        <h1 className={styles.title}>
          {title ?? <>Recurso em <em>desenvolvimento</em></>}
        </h1>
      )}
      <p className={styles.description}>
        Estamos trabalhando nessa parte da plataforma. Em breve estará disponível para você.
      </p>
      {!bare && (
        <div className={styles.actions}>
          <Link to="/auctions" className={`${btnStyles.btn} ${btnStyles.primary} ${btnStyles.md}`}>
            Ver leilões
          </Link>
          <Link to="/" className={`${btnStyles.btn} ${btnStyles.outline} ${btnStyles.md}`}>
            Voltar ao início
          </Link>
        </div>
      )}
    </main>
  )

  if (bare) return main

  return (
    <div className={styles.page}>
      <Navbar />
      {main}
      <Footer />
    </div>
  )
}
