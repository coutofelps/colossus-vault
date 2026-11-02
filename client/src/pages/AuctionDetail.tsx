import { useState, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import Countdown from '../components/Countdown'
import Button from '../components/Button'
import ImageGallery from '../components/ImageGallery'
import WinnerOverlay from '../components/WinnerOverlay'
import usePageTitle from '../hooks/usePageTitle'
import { MOCK_AUCTIONS, getImages, fmt } from '../data/auctions'
import styles from './AuctionDetail.module.css'

function fmtDate(d: Date) {
  return d.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function AuctionDetail() {
  const { id } = useParams<{ id: string }>()
  const auction = MOCK_AUCTIONS.find(a => a.id === id)

  usePageTitle(auction ? auction.title : 'Leilão não encontrado')

  if (!auction) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.notFound}>
          <p className={styles.notFoundCode}>404</p>
          <h1 className={styles.notFoundTitle}>Leilão não encontrado</h1>
          <Link to="/auctions" className={styles.backLink}>← Ver todos os leilões</Link>
        </main>
        <Footer />
      </div>
    )
  }

  const images = getImages(auction)
  const { user } = useAuth()
  const [ended, setEnded] = useState(false)
  const [showEndAnimation, setShowEndAnimation] = useState(false)
  const winner = auction.bids[0]
  const isWinner = !!user && !!winner && user.name === winner.user
  const handleCountdownEnd = useCallback(() => {
    setEnded(true)
    if (isWinner) setShowEndAnimation(true)
  }, [isWinner])
  const isActive = auction.status === 'active' && !ended

  const [proxyEnabled, setProxyEnabled] = useState(false)
  const [proxyValue, setProxyValue] = useState('')
  const proxyInputRef = useRef<HTMLInputElement>(null)

  function handleProxyToggle() {
    const next = !proxyEnabled
    setProxyEnabled(next)
    if (next) setTimeout(() => proxyInputRef.current?.focus(), 0)
    else setProxyValue('')
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link to="/auctions">Leilões</Link>
            <span className={styles.sep}>›</span>
            <span>{auction.title}</span>
          </nav>

          <div className={styles.layout}>
            {/* Galeria */}
            <div className={styles.galleryCol}>
              <ImageGallery images={images} autoInterval={5000} />
            </div>

            {/* Painel de info */}
            <div className={styles.infoCol}>
              <div className={styles.badgeRow}>
                <Badge variant={auction.status} />
                {auction.antiSnipe && (
                  <span className={styles.antiSnipe}>
                    Anti-snipe {auction.antiSnipe}min
                  </span>
                )}
              </div>

              <p className={styles.brand}>{auction.brand} · {auction.scale}</p>
              <h1 className={styles.title}>{auction.title}</h1>
              <p className={styles.seller}>por <strong>{auction.seller}</strong></p>

              {/* Caixa de lance */}
              <div className={styles.bidBox}>
                <div className={styles.bidCurrent}>
                  <span className={styles.bidLabel}>Lance atual</span>
                  <span className={styles.bidValue}>
                    {auction.currentBid > 0 ? fmt(auction.currentBid) : '—'}
                  </span>
                </div>
                <div className={styles.bidMeta}>
                  <span>{auction.bidCount} {auction.bidCount === 1 ? 'lance' : 'lances'}</span>
                </div>
                {isActive && auction.increment > 0 && (
                  <div className={styles.minBidRow}>
                    <span className={styles.minBidTag}>Lance mínimo definido</span>
                  </div>
                )}

                {auction.status === 'active' && (
                  <div className={styles.countdownWrap}>
                    <span className={styles.countdownLabel}>Encerra em</span>
                    <Countdown endsAt={auction.endsAt} size="md" onEnd={handleCountdownEnd} />
                  </div>
                )}

                {!isActive && (
                  <p className={styles.closedLabel}>
                    {auction.status === 'review' ? 'Aguardando aprovação' : 'Leilão encerrado'}
                  </p>
                )}

                {isActive && (
                  <div className={styles.proxyWrap}>
                    <button
                      type="button"
                      className={`${styles.proxyToggle} ${proxyEnabled ? styles.proxyToggleOn : ''}`}
                      onClick={handleProxyToggle}
                    >
                      <span className={styles.proxyToggleBox} />
                      Lance Proxy
                    </button>
                    {proxyEnabled && (
                      <div className={styles.proxyField}>
                        <label htmlFor="proxy-max" className={styles.proxyLabel}>
                          Seu valor máximo
                        </label>
                        <div className={styles.proxyInputRow}>
                          <span className={styles.proxyCurrency}>R$</span>
                          <input
                            ref={proxyInputRef}
                            id="proxy-max"
                            type="number"
                            min={auction.currentBid + auction.increment}
                            step={auction.increment}
                            placeholder={(auction.currentBid + auction.increment).toString()}
                            value={proxyValue}
                            onChange={e => setProxyValue(e.target.value)}
                            className={styles.proxyInput}
                          />
                        </div>
                        <p className={styles.proxyHint}>
                          O sistema dará o menor lance necessário para mantê-lo na liderança, até este limite. O valor máximo é oculto dos outros compradores.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  variant={isActive ? 'primary' : 'outline'}
                  size="lg"
                  disabled={!isActive}
                  className={isActive ? styles.hideMobile : undefined}
                >
                  {isActive ? 'Dar Lance' : 'Ver resultado'}
                </Button>

                {isActive && (
                  <button
                    type="button"
                    className={styles.simulateBtn}
                    onClick={() => setShowEndAnimation(true)}
                  >
                    Simular vitória
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Botão fixo no fundo — mobile only */}
          {isActive && (
            <div className={styles.stickyBidBar}>
              <Button variant="primary" size="lg" className={styles.stickyBtn}>Dar Lance</Button>
            </div>
          )}

          {/* Seção full-width abaixo do layout */}
          <div className={styles.belowFold}>
            {auction.description && (
              <div className={styles.descriptionBlock}>
                <h2 className={styles.descriptionTitle}>Sobre o lote</h2>
                <p className={styles.description}>{auction.description}</p>
              </div>
            )}

            {auction.bids.length > 0 && (
              <div className={styles.history}>
                <h2 className={styles.historyTitle}>Histórico de lances</h2>
                <div className={styles.historyList}>
                  {auction.bids.map((bid, i) => (
                    <div key={bid.id} className={`${styles.bidRow} ${i === 0 ? styles.bidRowWinner : ''}`}>
                      <span className={styles.bidUser}>
                        {i === 0 && <span className={styles.crown} aria-label="Líder">♛</span>}
                        {bid.user}
                      </span>
                      <span className={styles.bidTime}>{fmtDate(bid.at)}</span>
                      <span className={styles.bidAmount}>{fmt(bid.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showEndAnimation && (
        <WinnerOverlay
          auction={auction}
          isWinner
          onClose={() => setShowEndAnimation(false)}
        />
      )}

      <Footer />
    </div>
  )
}
