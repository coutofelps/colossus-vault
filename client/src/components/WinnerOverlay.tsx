import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Auction } from '../data/auctions'
import { fmt } from '../data/auctions'
import styles from './WinnerOverlay.module.css'

interface Props {
  auction: Auction
  isWinner?: boolean  // sempre true quando renderizado; mantido para flexibilidade futura
  onClose: () => void
}

const CONFETTI_COLORS = ['#8FD62F', '#FFFFE8', '#6B3FA0', '#9D5FD6', '#3A8C1C']

function playVictorySound() {
  try {
    const ctx = new AudioContext()
    // Fanfarra ascendente: C5 E5 G5 C6
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      const t = ctx.currentTime + i * 0.13
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.28, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38)
      osc.start(t)
      osc.stop(t + 0.38)
    })
  } catch { /* AudioContext bloqueado — ignora silenciosamente */ }
}

interface Particle {
  x: number
  y: number
  r: number
  d: number
  color: string
  angle: number
  tiltSpeed: number
}

function spawnParticles(count: number, width: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: -10 - Math.random() * 80,
    r: 3 + Math.random() * 4,
    d: 1.8 + Math.random() * 2.5,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    angle: 0,
    tiltSpeed: 0.05 + Math.random() * 0.04,
  }))
}

export default function WinnerOverlay({ auction, isWinner = false, onClose }: Props) {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const winner = auction.bids[0]
  const hasWinner = auction.bids.length > 0

  const stopConfetti = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }, [])

  const handleClose = useCallback(() => {
    stopConfetti()
    clearTimeout(timerRef.current)
    onClose()
  }, [onClose, stopConfetti])

  const handleCta = useCallback(() => {
    handleClose()
    navigate('/payments')
  }, [handleClose, navigate])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    playVictorySound()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    particlesRef.current = spawnParticles(210, canvas.width)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of particlesRef.current) {
        p.y += p.d
        p.angle += p.tiltSpeed
        const tilt = Math.sin(p.angle) * 12
        if (p.y < canvas.height + 20) alive = true
        ctx.beginPath()
        ctx.lineWidth = p.r
        ctx.strokeStyle = p.color
        ctx.moveTo(p.x + tilt + p.r / 2, p.y)
        ctx.lineTo(p.x + tilt, p.y + tilt + p.r / 2)
        ctx.stroke()
      }
      if (alive) rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    timerRef.current = setTimeout(handleClose, 8000)
    return () => clearTimeout(timerRef.current)
  }, [handleClose])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Resultado do leilão">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.card}>
        <p className={styles.eyebrow}>Leilão encerrado</p>

        <div className={styles.trophyRing} aria-hidden="true">🏆</div>

        {hasWinner ? (
          <>
            <h2 className={styles.heading}>Vencedor!</h2>
            <p className={styles.itemName}>
              {auction.title}
              <span className={styles.itemSeller}>por {auction.seller}</span>
            </p>
            <div className={styles.bidChip}>
              <span className={styles.bidLabel}>Lance vencedor</span>
              <span className={styles.bidValue}>{fmt(winner.value)}</span>
            </div>
            <p className={styles.winnerName}>
              {winner.user.split('').map((char, i) => (
                <span
                  key={i}
                  className={styles.winnerChar}
                  style={{ animationDelay: `${0.55 + i * 0.07}s` }}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </p>
          </>
        ) : (
          <>
            <h2 className={styles.heading}>Encerrado</h2>
            <p className={styles.itemName}>
              {auction.title}
              <span className={styles.itemSeller}>por {auction.seller}</span>
            </p>
            <p className={styles.noBids}>Nenhum lance registrado.</p>
          </>
        )}

        <div className={styles.actions}>
          {hasWinner && (
            <button className={styles.btnPrimary} onClick={handleCta}>
              Ver pagamentos
            </button>
          )}
          <button className={styles.btnSecondary} onClick={handleClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
