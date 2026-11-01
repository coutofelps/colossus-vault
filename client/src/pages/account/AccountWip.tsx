import usePageTitle from '../../hooks/usePageTitle'
import styles from './AccountWip.module.css'

interface AccountWipProps {
  title?: string
}

export default function AccountWip({ title = 'Em Desenvolvimento' }: AccountWipProps) {
  usePageTitle(`${title} — Minha Conta`)
  return (
    <div className={styles.root}>
      <p className={styles.code} aria-hidden>WIP</p>
      <p className={styles.label}>Em construção</p>
      <p className={styles.description}>
        Esta seção estará disponível em breve.
      </p>
    </div>
  )
}
