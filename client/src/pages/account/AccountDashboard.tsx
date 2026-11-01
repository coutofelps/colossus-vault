import { Link } from 'react-router-dom'
import usePageTitle from '../../hooks/usePageTitle'
import Countdown from '../../components/Countdown'
import { mockActiveBids, mockWatchlist } from '../../data/mockAccount'
import type { BidEntry, WatchEntry } from '../../data/mockAccount'
import styles from './AccountDashboard.module.css'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

function BidCard({ item }: { item: BidEntry }) {
  const outbid = item.status === 'outbid'
  return (
    <div className={`${styles.card} ${outbid ? styles.cardOutbid : ''}`}>
      <div className={styles.cardThumb}>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className={styles.cardBody}>
        <Link to={`/auctions/${item.auctionId}`} className={styles.cardTitle}>
          {item.title}
        </Link>
        <div className={styles.cardMeta}>
          <div className={styles.cardMetaRow}>
            <span className={styles.metaLabel}>Seu lance</span>
            <span className={styles.metaValue}>{formatBRL(item.myBid)}</span>
          </div>
          <div className={styles.cardMetaRow}>
            <span className={styles.metaLabel}>Lance atual</span>
            <span className={`${styles.metaValue} ${outbid ? styles.metaValueHighlight : ''}`}>
              {formatBRL(item.currentBid)}
            </span>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.statusRow}>
            <span className={`${styles.statusBadge} ${outbid ? styles.statusOutbid : styles.statusLeading}`}>
              {outbid ? 'Superado' : 'Na liderança'}
            </span>
            {item.hasProxy && <span className={styles.proxyBadge}>Proxy ativo</span>}
          </div>
          <Countdown endsAt={item.endsAt} size="sm" />
        </div>
      </div>
    </div>
  )
}

function WatchCard({ item }: { item: WatchEntry }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardThumb}>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className={styles.cardBody}>
        <Link to={`/auctions/${item.auctionId}`} className={styles.cardTitle}>
          {item.title}
        </Link>
        <div className={styles.cardMeta}>
          <div className={styles.cardMetaRow}>
            <span className={styles.metaLabel}>Lance atual</span>
            <span className={styles.metaValue}>{formatBRL(item.currentBid)}</span>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <Countdown endsAt={item.endsAt} size="sm" />
          <Link to={`/auctions/${item.auctionId}`} className={styles.bidLink}>
            Dar lance
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AccountDashboard() {
  usePageTitle('Dashboard — Minha Conta')

  const empty = mockActiveBids.length === 0 && mockWatchlist.length === 0

  if (empty) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>Você ainda não participou de nenhum leilão.</p>
        <Link to="/auctions" className={styles.exploreLink}>Explorar leilões</Link>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {mockActiveBids.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Participando</h2>
            {mockActiveBids.length >= 6 && (
              <Link to="/account/bids" className={styles.seeAll}>Ver todos</Link>
            )}
          </div>
          <div className={styles.grid}>
            {mockActiveBids.slice(0, 6).map(item => (
              <BidCard key={item.auctionId} item={item} />
            ))}
          </div>
        </section>
      )}

      {mockWatchlist.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Acompanhando</h2>
            {mockWatchlist.length >= 6 && (
              <Link to="/account/watchlist" className={styles.seeAll}>Ver todos</Link>
            )}
          </div>
          <div className={styles.grid}>
            {mockWatchlist.slice(0, 6).map(item => (
              <WatchCard key={item.auctionId} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
