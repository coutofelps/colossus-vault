import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Badge from '../components/Badge'
import Countdown from '../components/Countdown'
import Button from '../components/Button'
import usePageTitle from '../hooks/usePageTitle'
import { MOCK_AUCTIONS, fmt, type Auction } from '../data/auctions'
import styles from './Auctions.module.css'

function AuctionCard({ auction }: { auction: Auction }) {
  const isActive = auction.status === 'active'
  const thumb = `/statues/${auction.imageSlug}/001.${auction.imageExt}`

  return (
    <article className={styles.card}>
      <Link to={`/auctions/${auction.id}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          <img src={thumb} alt={auction.title} className={styles.image} />
          <div className={styles.badgeOverlay}>
            <Badge variant={auction.status} />
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.brand}>{auction.brand} · {auction.scale}</p>
          <h3 className={styles.title}>{auction.title}</h3>
          <p className={styles.seller}>por {auction.seller}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Lance atual</span>
              <span className={styles.statValue}>
                {auction.currentBid > 0 ? fmt(auction.currentBid) : '—'}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Lances</span>
              <span className={styles.statValue}>{auction.bidCount}</span>
            </div>
          </div>

          <div className={styles.footer}>
            {isActive ? (
              <Countdown endsAt={auction.endsAt} size="sm" />
            ) : (
              <span className={styles.closedLabel}>
                {auction.status === 'review' ? 'Aguardando aprovação' : 'Encerrado'}
              </span>
            )}
            <Button
              variant={isActive ? 'primary' : 'outline'}
              size="sm"
              disabled={!isActive}
            >
              {isActive ? 'Dar Lance' : 'Ver'}
            </Button>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function Auctions() {
  usePageTitle('Leilões')
  const active = MOCK_AUCTIONS.filter(a => a.status === 'active')
  const others = MOCK_AUCTIONS.filter(a => a.status !== 'active')

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Marketplace</p>
          <h1 className={styles.heading}>Leilões</h1>
          <p className={styles.sub}>{active.length} {active.length !== 1 ? 'leilões ativos' : 'leilão ativo'} agora</p>
        </div>

        <section>
          <h2 className={styles.sectionTitle}>Ativos</h2>
          <div className={styles.grid}>
            {active.map(a => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>

        {others.length > 0 && (
          <section className={styles.othersSection}>
            <h2 className={styles.sectionTitle}>Outros</h2>
            <div className={styles.grid}>
              {others.map(a => <AuctionCard key={a.id} auction={a} />)}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  )
}
