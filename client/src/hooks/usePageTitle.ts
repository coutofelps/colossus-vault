import { useEffect } from 'react'

export default function usePageTitle(title: string | null) {
  useEffect(() => {
    if (title !== null) document.title = title ? `${title} — Colossus Vault` : 'Colossus Vault'
  }, [title])
}
