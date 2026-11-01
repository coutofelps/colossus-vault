import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import usePageTitle from '../hooks/usePageTitle'
import { useTheme } from '../context/ThemeContext'
import styles from './ResetPassword.module.css'

export default function ResetPassword() {
  usePageTitle('Nova senha')
  const { theme } = useTheme()
  const icon = theme === 'alt'
    ? '/brand-identity/assets/grey-version-icon.png'
    : '/brand-identity/assets/green-version-icon.png'

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})

  if (!token) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <img src={icon} alt="Colossus Vault" className={styles.logoImg} />
                <span className={styles.logoText}>Colossus <span>Vault</span></span>
              </Link>
            </div>
            <div className={styles.invalidToken}>
              <h1 className={styles.heading}>Link inválido</h1>
              <p className={styles.sub}>Este link é inválido ou já expirou. Solicite um novo.</p>
              <Link to="/forgot-password" className={styles.backLink}>Solicitar novo link</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  function validate() {
    const e: typeof errors = {}
    if (!password) e.password = 'Informe a nova senha.'
    else if (password.length < 8) e.password = 'A senha deve ter pelo menos 8 caracteres.'
    if (!confirm) e.confirm = 'Confirme a nova senha.'
    else if (password && confirm !== password) e.confirm = 'As senhas não coincidem.'
    return e
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    // TODO: chamar API de redefinição de senha com o token
    navigate('/login', { state: { passwordReset: true } })
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <img src={icon} alt="Colossus Vault" className={styles.logoImg} />
              <span className={styles.logoText}>Colossus <span>Vault</span></span>
            </Link>
          </div>

          <h1 className={styles.heading}>Nova senha</h1>
          <p className={styles.sub}>Escolha uma senha com pelo menos 8 caracteres.</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Nova senha</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
              {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="confirm" className={styles.label}>Confirmar nova senha</label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className={`${styles.input} ${errors.confirm ? styles.inputError : ''}`}
              />
              {errors.confirm && <span className={styles.errorMsg}>{errors.confirm}</span>}
            </div>

            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
              Salvar nova senha
            </Button>

            <div className={styles.footer}>
              <Link to="/login" className={styles.footerLink}>Voltar para o login</Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
