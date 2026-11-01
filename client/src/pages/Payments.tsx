import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import usePageTitle from '../hooks/usePageTitle'
import { mockPayments } from '../data/mockAccount'
import type { PaymentEntry } from '../data/mockAccount'
import styles from './Payments.module.css'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const STATUS_LABEL: Record<PaymentEntry['status'], string> = {
  pending_contact: 'Aguardando contato',
  in_progress: 'Em andamento',
  completed: 'Concluído',
}

const STATUS_CLASS: Record<PaymentEntry['status'], string> = {
  pending_contact: 'statusPending',
  in_progress: 'statusProgress',
  completed: 'statusDone',
}

function PaymentCard({ item }: { item: PaymentEntry }) {
  const paidAmount = (item.totalAmount / item.installments) * item.installmentsPaid
  const progress = (item.installmentsPaid / item.installments) * 100

  return (
    <div className={styles.card}>
      <div className={styles.thumb}>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <div>
            <Link to={`/auctions/${item.auctionId}`} className={styles.title}>
              {item.title}
            </Link>
            <p className={styles.seller}>por {item.seller}</p>
          </div>
          <span className={`${styles.status} ${styles[STATUS_CLASS[item.status]]}`}>
            {STATUS_LABEL[item.status]}
          </span>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Data da compra</span>
            <span className={styles.metaValue}>{formatDate(item.purchaseDate)}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Total</span>
            <span className={styles.metaValue}>{formatBRL(item.totalAmount)}</span>
          </div>
          {item.paymentMethod && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Forma</span>
              <span className={styles.metaValue}>{item.paymentMethod}</span>
            </div>
          )}
          {item.installments > 1 && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Parcelas</span>
              <span className={styles.metaValue}>{item.installmentsPaid}/{item.installments}</span>
            </div>
          )}
          {item.nextPaymentDate && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Próx. venc.</span>
              <span className={styles.metaValue}>{formatDate(item.nextPaymentDate)}</span>
            </div>
          )}
        </div>

        {item.installments > 1 && (
          <div className={styles.progress}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressLabel}>
              {formatBRL(paidAmount)} pago de {formatBRL(item.totalAmount)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Payments() {
  usePageTitle('Pagamentos')

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <div className={styles.headerTop}>
              <p className={styles.eyebrow}>Área do comprador</p>
              <Link to="/account" className={styles.accountLink}>Minha Conta →</Link>
            </div>
            <h1 className={styles.heading}>Pagamentos</h1>
          </div>

          {mockPayments.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Nenhum pagamento pendente.</p>
              <Link to="/auctions" className={styles.emptyLink}>Explorar leilões</Link>
            </div>
          ) : (
            <div className={styles.list}>
              {mockPayments.map(p => (
                <PaymentCard key={p.auctionId} item={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
