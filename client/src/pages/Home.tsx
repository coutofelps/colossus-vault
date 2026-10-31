import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080C08',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: '#D6DCCE',
      gap: '32px',
    }}>
      <h1 style={{
        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
        fontSize: 'clamp(48px, 10vw, 120px)',
        fontWeight: 900,
        textTransform: 'uppercase',
        color: '#FFFFE8',
        letterSpacing: '-0.01em',
        lineHeight: 0.88,
        margin: 0,
      }}>
        Colossus <span style={{ color: '#8FD62F' }}>Vault</span>
      </h1>

      <p style={{ color: '#A8B89C', fontSize: '14px', fontWeight: 300, margin: 0 }}>
        Em construção
      </p>

      <Link
        to="/brand-identity"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'transparent',
          color: '#8FD62F',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          padding: '10px 20px',
          border: '1px solid rgba(143, 214, 47, 0.35)',
          textDecoration: 'none',
        }}
      >
        Brand Identity →
      </Link>
    </div>
  )
}
