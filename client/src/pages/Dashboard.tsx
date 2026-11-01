import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Countdown from '../components/Countdown'
import usePageTitle from '../hooks/usePageTitle'
import { mockActiveBids } from '../data/mockAccount'
import type { BidEntry } from '../data/mockAccount'
import styles from './Dashboard.module.css'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

function BidCard({ item }: { item: BidEntry }) {
  const outbid = item.status === 'outbid'
  const badge = (
    <span className={`${styles.statusBadge} ${outbid ? styles.statusOutbid : styles.statusLeading}`}>
      {outbid ? 'Superado' : 'Na liderança'}
    </span>
  )

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
              {badge}
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
          <div className={styles.footer}>
            <Countdown endsAt={item.endsAt} size="sm" />
            <span className={styles.cta}>Ver leilão →</span>
          </div>
        </div>
      </Link>
    </article>
  )
}


export default function Dashboard() {
  usePageTitle('Dashboard')
  const navigate = useNavigate()
  const { logout } = useAuth()

  const empty = mockActiveBids.length === 0

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <p className={styles.eyebrow}>Área do comprador</p>
              <div className={styles.headerActions}>
                <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/') }}>Sair</button>
                <Link to="/account" className={styles.accountLink}>Minha Conta →</Link>
              </div>
            </div>
            <h1 className={styles.heading}>Dashboard</h1>
          </div>

          {empty ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Você ainda não participou de nenhum leilão.</p>
              <Link to="/auctions" className={styles.exploreLink}>Explorar leilões</Link>
            </div>
          ) : (
            <div className={styles.sections}>
              {mockActiveBids.length > 0 && (
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Leilões</h2>
                    {mockActiveBids.length >= 6 && (
                      <Link to="/bids" className={styles.sectionAction}>Ver todos</Link>
                    )}
                  </div>
                  <div className={styles.list}>
                    {mockActiveBids.slice(0, 6).map(item => (
                      <BidCard key={item.auctionId} item={item} />
                    ))}
                  </div>
                </section>
              )}

              <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Minha Loja</h2>
                    <Link to="/under-development" className={styles.sectionAction}>Anunciar</Link>
                  </div>
                  <div className={styles.emptyState}>
                    <p className={styles.emptyText}>Você ainda não tem itens à venda.</p>
                  </div>
                </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
