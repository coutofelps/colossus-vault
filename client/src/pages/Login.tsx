import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import usePageTitle from '../hooks/usePageTitle'
import { useTheme } from '../context/ThemeContext'
import styles from './Login.module.css'

export default function Login() {
  usePageTitle('Entrar')
  const { theme } = useTheme()
  const icon = theme === 'alt'
    ? '/brand-identity/assets/grey-version-icon.png'
    : '/brand-identity/assets/green-version-icon.png'

  const [email, setEmail] = useState(() => {
    try { return localStorage.getItem('cv_remember_email') ?? '' } catch { return '' }
  })
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => {
    try { return !!localStorage.getItem('cv_remember_email') } catch { return false }
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  function validate() {
    const e: typeof errors = {}
    if (!email.trim()) e.email = 'Informe seu e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido.'
    if (!password) e.password = 'Informe sua senha.'
    return e
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    try {
      if (remember) localStorage.setItem('cv_remember_email', email)
      else localStorage.removeItem('cv_remember_email')
    } catch { /* ignore */ }
    // TODO: autenticação real
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

          <h1 className={styles.heading}>Entrar</h1>
          <p className={styles.sub}>Acesse sua conta para dar lances e acompanhar seus leilões</p>

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
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Senha</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
              {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
            </div>

            <div className={styles.forgotRow}>
              <label className={styles.rememberLabel}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className={styles.rememberCheck}
                />
                Lembrar-me
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>Esqueci minha senha</Link>
            </div>

            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
              Entrar
            </Button>
          </form>

        </div>
      </main>
      <Footer />
    </div>
  )
}
