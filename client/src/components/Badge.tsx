import styles from './Badge.module.css'

type BadgeVariant = 'active' | 'closed' | 'draft' | 'review' | 'no-winner'

interface BadgeProps {
  variant: BadgeVariant
  label?: string
}

const LABELS: Record<BadgeVariant, string> = {
  active: 'Ativo',
  closed: 'Encerrado',
  draft: 'Rascunho',
  review: 'Em Revisão',
  'no-winner': 'Sem Vencedor',
}

export default function Badge({ variant, label }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {variant === 'active' && <span className={styles.dot} />}
      {label ?? LABELS[variant]}
    </span>
  )
}
