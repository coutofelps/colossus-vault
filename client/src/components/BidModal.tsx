import { useState, useRef, useEffect } from 'react'
import type { Auction } from '../data/auctions'
import { fmt } from '../data/auctions'
import styles from './BidModal.module.css'

interface Props {
  auction: Auction
  onClose: () => void
  onConfirm: (value: number, proxy: boolean, proxyMax?: number) => void
  onSimulateWin?: () => void
}

function getThumb(auction: Auction) {
  return `/statues/${auction.imageSlug}/001.${auction.imageExt}`
}

export default function BidModal({ auction, onClose, onConfirm, onSimulateWin }: Props) {
  const minBid = auction.currentBid + auction.increment
  const [value, setValue] = useState(minBid.toString())
  const [proxyEnabled, setProxyEnabled] = useState(false)
  const [proxyMax, setProxyMax] = useState('')
  const [error, setError] = useState('')
  const [proxyError, setProxyError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Bloqueia scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function validate() {
    const num = Number(value)
    if (!value || isNaN(num)) { setError('Informe um valor.'); return false }
    if (num < minBid) { setError(`O lance mínimo é ${fmt(minBid)}.`); return false }
    if (proxyEnabled) {
      const max = Number(proxyMax)
      if (!proxyMax || isNaN(max)) { setProxyError('Informe seu valor máximo.'); return false }
      if (max < minBid) { setProxyError(`O valor máximo deve ser pelo menos ${fmt(minBid)}.`); return false }
    }
    return true
  }

  function handleConfirm() {
    if (!validate()) return
    onConfirm(Number(value), proxyEnabled, proxyEnabled ? Number(proxyMax) : undefined)
    onClose()
  }

  function handleProxyToggle() {
    const next = !proxyEnabled
    setProxyEnabled(next)
    setProxyError('')
    if (!next) setProxyMax('')
  }

  const numValue = Number(value)
  const confirmDisabled =
    !value || isNaN(numValue) || numValue < minBid ||
    (proxyEnabled && (!proxyMax || Number(proxyMax) < minBid))

  return (
    <div
      className={styles.backdrop}
      ref={backdropRef}
      onClick={e => { if (e.target === backdropRef.current) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Dar lance"
    >
      <div className={styles.card}>
        {/* Cabeçalho */}
        <div className={styles.header}>
          <div className={styles.itemInfo}>
            <img
              src={getThumb(auction)}
              alt={auction.title}
              className={styles.thumb}
            />
            <div className={styles.itemText}>
              <p className={styles.itemBrand}>{auction.brand} · {auction.scale}</p>
              <p className={styles.itemTitle}>{auction.title}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">×</button>
        </div>

        {/* Valores de referência */}
        <div className={styles.refs}>
          <div className={styles.ref}>
            <span className={styles.refLabel}>Lance atual</span>
            <span className={styles.refValue}>
              {auction.currentBid > 0 ? fmt(auction.currentBid) : '—'}
            </span>
          </div>
          <div className={styles.ref}>
            <span className={styles.refLabel}>Lance mínimo</span>
            <span className={styles.refValueMin}>{fmt(minBid)}</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Campo de lance ou proxy */}
        {!proxyEnabled && (
          <div className={styles.field}>
            <label htmlFor="bid-value" className={styles.fieldLabel}>Seu lance</label>
            <div className={styles.inputRow}>
              <span className={styles.currency}>R$</span>
              <input
                ref={inputRef}
                id="bid-value"
                type="number"
                min={minBid}
                step={auction.increment || 1}
                value={value}
                onChange={e => { setValue(e.target.value); setError('') }}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
              />
            </div>
            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>
        )}

        {/* Toggle Lance Proxy */}
        <div className={styles.proxyWrap}>
          <button
            type="button"
            className={`${styles.proxyToggle} ${proxyEnabled ? styles.proxyToggleOn : ''}`}
            onClick={handleProxyToggle}
          >
            <span className={styles.proxyBox} />
            Lance Proxy
          </button>

          {proxyEnabled && (
            <div className={styles.proxyField}>
              <label htmlFor="proxy-max" className={styles.fieldLabel}>Seu valor máximo</label>
              <div className={styles.inputRow}>
                <span className={styles.currency}>R$</span>
                <input
                  id="proxy-max"
                  type="number"
                  min={minBid}
                  step={auction.increment || 1}
                  placeholder={minBid.toString()}
                  value={proxyMax}
                  onChange={e => { setProxyMax(e.target.value); setProxyError('') }}
                  className={`${styles.input} ${proxyError ? styles.inputError : ''}`}
                  autoFocus
                />
              </div>
              {proxyError && <p className={styles.errorMsg}>{proxyError}</p>}
              <p className={styles.proxyHint}>
                O sistema dará o menor lance necessário para mantê-lo na liderança, até este limite. O valor máximo é oculto dos outros compradores.
              </p>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={confirmDisabled}
          >
            Confirmar lance
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          {onSimulateWin && (
            <button
              type="button"
              className={styles.simulateBtn}
              onClick={() => { onSimulateWin(); onClose() }}
            >
              Simular vitória
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
