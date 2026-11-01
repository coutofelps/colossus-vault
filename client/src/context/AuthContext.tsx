import { createContext, useContext, useState } from 'react'

interface AuthUser {
  email: string
  name: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function nameFromEmail(email: string): string {
  const local = email.split('@')[0]
  return local.charAt(0).toUpperCase() + local.slice(1)
}

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('cv_auth_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser)

  function login(email: string) {
    const u: AuthUser = { email, name: nameFromEmail(email) }
    setUser(u)
    try { localStorage.setItem('cv_auth_user', JSON.stringify(u)) } catch { /* ignore */ }
  }

  function logout() {
    setUser(null)
    try { localStorage.removeItem('cv_auth_user') } catch { /* ignore */ }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
