import { useEffect, useState } from 'react'
import styles from './Countdown.module.css'

interface CountdownProps {
  endsAt: Date
  onEnd?: () => void
  size?: 'sm' | 'md' | 'lg'
}

function parse(ms: number) {
  const total = Math.max(0, ms)
  const h = Math.floor(total / 3_600_000)
  const m = Math.floor((total % 3_600_000) / 60_000)
  const s = Math.floor((total % 60_000) / 1_000)
  return { h, m, s, urgent: total < 5 * 60_000 }
}

function pad(n: number) { return String(n).padStart(2, '0') }

export default function Countdown({ endsAt, onEnd, size = 'md' }: CountdownProps) {
  const [remaining, setRemaining] = useState(() => endsAt.getTime() - Date.now())

  useEffect(() => {
    if (remaining <= 0) { onEnd?.(); return }
    const id = setInterval(() => {
      const r = endsAt.getTime() - Date.now()
      setRemaining(r)
      if (r <= 0) { clearInterval(id); onEnd?.() }
    }, 1_000)
    return () => clearInterval(id)
  }, [endsAt, onEnd])

  const { h, m, s, urgent } = parse(remaining)

  if (remaining <= 0) {
    return <span className={`${styles.root} ${styles[size]} ${styles.ended}`}>Encerrado</span>
  }

  return (
    <span className={`${styles.root} ${styles[size]} ${urgent ? styles.urgent : ''}`}>
      <span className={styles.segment}>{pad(h)}<abbr title="horas">h</abbr></span>
      <span className={styles.sep}>:</span>
      <span className={styles.segment}>{pad(m)}<abbr title="minutos">m</abbr></span>
      <span className={styles.sep}>:</span>
      <span className={styles.segment}>{pad(s)}<abbr title="segundos">s</abbr></span>
    </span>
  )
}
