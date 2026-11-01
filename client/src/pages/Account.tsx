import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import usePageTitle from '../hooks/usePageTitle'
import { useTheme } from '../context/ThemeContext'
import { THEMES } from '../data/themes'
import { mockUser } from '../data/mockAccount'
import styles from './Account.module.css'

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

function AccountProfile({ name }: { name: string }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('')

  return (
    <div className={styles.profile}>
      <div className={styles.avatar} aria-hidden>{initials}</div>
      <div className={styles.profileInfo}>
        <div className={styles.profileNameRow}>
          <span className={styles.profileName}>{name}</span>
          {mockUser.verified && (
            <span className={styles.verifiedBadge} title="Conta verificada">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verificado
            </span>
          )}
        </div>
        <span className={styles.profileMeta}>Membro desde {formatDate(mockUser.memberSince)}</span>
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value}</span>
    </div>
  )
}

function EditableNameField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleEdit() {
    setDraft(value)
    setError('')
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function handleSave() {
    if (!draft.trim()) { setError('Nome é obrigatório.'); return }
    onChange(draft.trim())
    setEditing(false)
    setError('')
  }

  function handleCancel() {
    setEditing(false)
    setError('')
  }

  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>Nome completo</span>
      {editing ? (
        <div className={styles.fieldEditRow}>
          <input
            ref={inputRef}
            className={`${styles.fieldInput} ${error ? styles.fieldInputError : ''}`}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel() }}
          />
          <div className={styles.fieldActions}>
            <button className={styles.fieldSave} onClick={handleSave}>Salvar</button>
            <button className={styles.fieldCancel} onClick={handleCancel}>Cancelar</button>
          </div>
          {error && <span className={styles.fieldError}>{error}</span>}
        </div>
      ) : (
        <div className={styles.fieldValueRow}>
          <span className={styles.fieldValue}>{value}</span>
          <button className={styles.fieldEdit} onClick={handleEdit}>Editar</button>
        </div>
      )}
    </div>
  )
}

function ChangePasswordSection() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  function validate() {
    const e: Record<string, string> = {}
    if (!current) e.current = 'Informe sua senha atual.'
    if (!next) e.next = 'Informe a nova senha.'
    else if (next.length < 8) e.next = 'A senha deve ter pelo menos 8 caracteres.'
    if (!confirm) e.confirm = 'Confirme a nova senha.'
    else if (next && confirm !== next) e.confirm = 'As senhas não coincidem.'
    return e
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setSuccess(true)
    setCurrent(''); setNext(''); setConfirm('')
    setTimeout(() => { setSuccess(false); setOpen(false) }, 2500)
  }

  return (
    <div className={styles.passwordSection}>
      <div className={styles.passwordHeader}>
        <span className={styles.passwordLabel}>Senha</span>
        <button className={styles.fieldEdit} onClick={() => { setOpen(o => !o); setErrors({}); setSuccess(false) }}>
          {open ? 'Cancelar' : 'Alterar'}
        </button>
      </div>
      {open && (
        success ? (
          <p className={styles.passwordSuccess}>Senha atualizada com sucesso.</p>
        ) : (
          <form className={styles.passwordForm} onSubmit={handleSubmit} noValidate>
            {(['current', 'next', 'confirm'] as const).map((key) => {
              const labels = { current: 'Senha atual', next: 'Nova senha', confirm: 'Confirmar nova senha' }
              const vals = { current, next, confirm }
              const setters = { current: setCurrent, next: setNext, confirm: setConfirm }
              return (
                <div key={key} className={styles.passwordField}>
                  <label className={styles.passwordFieldLabel}>{labels[key]}</label>
                  <input
                    type="password"
                    autoComplete={key === 'current' ? 'current-password' : 'new-password'}
                    placeholder="••••••••"
                    value={vals[key]}
                    onChange={e => setters[key](e.target.value)}
                    className={`${styles.fieldInput} ${errors[key] ? styles.fieldInputError : ''}`}
                  />
                  {errors[key] && <span className={styles.fieldError}>{errors[key]}</span>}
                </div>
              )
            })}
            <button type="submit" className={styles.passwordSave}>Salvar nova senha</button>
          </form>
        )
      )}
    </div>
  )
}

function ThemeSelector() {
  const { theme, toggle } = useTheme()
  return (
    <ul className={styles.themeList}>
      {THEMES.map(t => (
        <li key={t.id}>
          <button
            className={`${styles.themeOption} ${theme === t.id ? styles.themeOptionActive : ''}`}
            onClick={() => { if (theme !== t.id) toggle() }}
          >
            <span className={styles.themeSwatches}>
              {t.swatches.map(c => (
                <span key={c} className={styles.themeSwatch} style={{ background: c }} />
              ))}
            </span>
            <span className={styles.themeText}>
              <span className={styles.themeLabel}>{t.label}</span>
              <span className={styles.themeDesc}>{t.desc}</span>
            </span>
            <svg className={styles.themeCheck} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              {theme === t.id && (
                <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function Account() {
  usePageTitle('Minha Conta')
  const [name, setName] = useState(mockUser.name)

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <div className={styles.pageTitleRow}>
              <p className={styles.eyebrow}>Área do comprador</p>
              <Link to="/dashboard" className={styles.dashboardLink}>← Dashboard</Link>
            </div>
            <h1 className={styles.pageTitle}>Minha Conta</h1>
          </div>
          <div className={styles.sections}>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Dados da Conta</h2>
              <div className={styles.dataBlock}>
                <AccountProfile name={name} />

                <div className={styles.statsRow}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{mockUser.wonAuctions}</span>
                    <span className={styles.statLabel}>Leilões vencidos</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{mockUser.totalBids}</span>
                    <span className={styles.statLabel}>Lances dados</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{mockUser.activeWatching}</span>
                    <span className={styles.statLabel}>Participando</span>
                  </div>
                </div>

                <div className={styles.fields}>
                  <EditableNameField value={name} onChange={setName} />
                  <InfoField label="E-mail" value={mockUser.email} />
                  <InfoField label="Telefone" value={mockUser.phone} />
                  <InfoField label="CPF" value={mockUser.cpf} />
                  <ChangePasswordSection />
                </div>

                <div className={styles.addressBlock}>
                  <p className={styles.addressBlockTitle}>Endereço de entrega</p>
                  <div className={styles.fields}>
                    <InfoField label="CEP" value={mockUser.address.cep} />
                    <InfoField label="Logradouro" value={`${mockUser.address.logradouro}, ${mockUser.address.numero}`} />
                    {mockUser.address.complemento && (
                      <InfoField label="Complemento" value={mockUser.address.complemento} />
                    )}
                    <InfoField label="Bairro" value={mockUser.address.bairro} />
                    <InfoField label="Cidade / Estado" value={`${mockUser.address.cidade}, ${mockUser.address.estado}`} />
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Configurações</h2>
              <div className={styles.configBlock}>
                <p className={styles.configLabel}>Paleta de cores</p>
                <ThemeSelector />
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
