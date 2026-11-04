import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Countdown from '../components/Countdown'
import usePageTitle from '../hooks/usePageTitle'
import { mockActiveBids, mockClosedBids } from '../data/mockAccount'
import type { BidEntry, ClosedBidEntry } from '../data/mockAccount'
import styles from './Bids.module.css'

type Tab = 'active' | 'closed'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function ActiveCard({ item }: { item: BidEntry }) {
  const outbid = item.status === 'outbid'
  return (
    <article className={`${styles.card} ${outbid ? styles.cardOutbid : styles.cardLeading}`}>
      <Link to={`/auctions/${item.auctionId}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          <img src={item.thumbnail} alt={item.title} className={styles.image} />
        </div>
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.badgeRow}>
              <span className={`${styles.statusBadge} ${outbid ? styles.statusOutbid : styles.statusLeading}`}>
                {outbid ? 'Superado' : 'Na liderança'}
              </span>
              {item.hasProxy && <span className={styles.proxyBadge}>Proxy</span>}
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Seu lance</span>
              <span className={styles.statValue}>{formatBRL(item.myBid)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Lance atual</span>
              <span className={`${styles.statValue} ${outbid ? styles.statValueDanger : ''}`}>
                {formatBRL(item.currentBid)}
              </span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <Countdown endsAt={item.endsAt} size="sm" />
            <span className={styles.cta}>Ver leilão →</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

function ClosedCard({ item }: { item: ClosedBidEntry }) {
  const won = item.result === 'won'
  const navigate = useNavigate()
  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/auctions/${item.auctionId}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.cardLink}>
        <div className={styles.imageWrap}>
          <img src={item.thumbnail} alt={item.title} className={styles.image} />
        </div>
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{item.title}</h3>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Maior lance</span>
              <span className={`${styles.statValue} ${won ? styles.statValueWon : styles.statValueLost}`}>
                {formatBRL(item.myMaxBid)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Resultado</span>
              <span className={`${styles.statResult} ${won ? styles.statResultWon : styles.statResultLost}`}>
                {won ? 'Vencedor' : 'Não venceu'}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Encerrado em</span>
              <span className={styles.statDate}>{formatDate(item.closedAt)}</span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            {won && (
              <Link to="/payments" className={styles.paymentsLink} onClick={e => e.stopPropagation()}>
                Pagar →
              </Link>
            )}
            <span className={styles.cta}>Ver leilão →</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Bids() {
  usePageTitle('Meus Lances')
  const [tab, setTab] = useState<Tab>('active')

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <p className={styles.eyebrow}>Área do comprador</p>
              <Link to="/dashboard" className={styles.backLink}>← Dashboard</Link>
            </div>
            <h1 className={styles.heading}>Meus Lances</h1>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'active' ? styles.tabActive : ''}`}
              onClick={() => setTab('active')}
            >
              Ativos
              {mockActiveBids.length > 0 && (
                <span className={styles.tabCount}>{mockActiveBids.length}</span>
              )}
            </button>
            <button
              className={`${styles.tab} ${tab === 'closed' ? styles.tabActive : ''}`}
              onClick={() => setTab('closed')}
            >
              Encerrados
              {mockClosedBids.length > 0 && (
                <span className={styles.tabCount}>{mockClosedBids.length}</span>
              )}
            </button>
          </div>

          {tab === 'active' && (
            <div className={styles.list}>
              {mockActiveBids.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>Você não tem lances ativos no momento.</p>
                  <Link to="/auctions" className={styles.exploreLink}>Explorar leilões</Link>
                </div>
              ) : (
                mockActiveBids.map(item => <ActiveCard key={item.auctionId} item={item} />)
              )}
            </div>
          )}

          {tab === 'closed' && (
            <div className={styles.list}>
              {mockClosedBids.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>Você ainda não participou de nenhum leilão encerrado.</p>
                </div>
              ) : (
                mockClosedBids.map(item => <ClosedCard key={item.auctionId} item={item} />)
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
