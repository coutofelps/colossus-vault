import usePageTitle from '../hooks/usePageTitle'

export default function Brand() {
  usePageTitle('Identidade Visual')
  return (
    <iframe
      src="/brand-identity/index.html"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        background: '#080C08',
      }}
      title="Colossus Vault — Brand Identity"
    />
  )
}
