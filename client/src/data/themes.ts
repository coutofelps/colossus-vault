export const THEMES = [
  {
    id: 'default',
    label: 'Principal',
    desc: 'Verde ácido & Roxo cripta',
    swatches: ['#8FD62F', '#080C08', '#1C0E30'],
  },
  {
    id: 'alt',
    label: 'Alternativa',
    desc: 'Cinza & Roxo elétrico',
    swatches: ['#A050FF', '#080C08', '#E8E8E8'],
  },
] as const

export type ThemeId = typeof THEMES[number]['id']
