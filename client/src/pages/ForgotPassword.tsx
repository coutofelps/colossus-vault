import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import usePageTitle from '../hooks/usePageTitle'
import { useTheme } from '../context/ThemeContext'
import styles from './ForgotPassword.module.css'

export default function ForgotPassword() {
  usePageTitle('Recuperar senha')
  const { theme } = useTheme()
  const icon = theme === 'alt'
    ? '/brand-identity/assets/grey-version-icon.png'
    : '/brand-identity/assets/green-version-icon.png'

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!email.trim()) { setError('Informe seu e-mail.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('E-mail inválido.'); return }
    setError('')
    setSubmitted(true)
    // TODO: chamar API de recuperação de senha
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <img src={icon} alt="Colossus Vault" className={styles.logoImg} />
              <span className={styles.logoText}>
                Colossus <span>Vault</span>
              </span>
            </Link>
          </div>

          {submitted ? (
            <div className={styles.confirmation}>
              <div className={styles.confirmIcon}>✉</div>
              <h1 className={styles.heading}>Verifique seu e-mail</h1>
              <p className={styles.sub}>
                Se este e-mail estiver cadastrado, você receberá um link em instantes.
              </p>
              <Link to="/login" className={styles.backLink}>Voltar para o login</Link>
            </div>
          ) : (
            <>
              <h1 className={styles.heading}>Recuperar senha</h1>
              <p className={styles.sub}>Informe o e-mail da sua conta e enviaremos um link para redefinir sua senha.</p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>E-mail</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                  />
                  {error && <span className={styles.errorMsg}>{error}</span>}
                </div>

                <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
                  Enviar link
                </Button>

                <div className={styles.footer}>
                  <Link to="/login" className={styles.footerLink}>Voltar para o login</Link>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
