export type AuctionStatus = 'active' | 'closed' | 'review'

export interface Bid {
  id: string
  user: string
  value: number
  at: Date
}

export interface Auction {
  id: string
  title: string
  brand: string
  scale: string
  seller: string
  description?: string
  currentBid: number
  bidCount: number
  endsAt: Date
  status: AuctionStatus
  imageSlug: string
  imageCount: number
  imageExt: string
  increment: number
  antiSnipe?: number
  bids: Bid[]
}

const now = Date.now()
const h = (n: number) => n * 3_600_000
const m = (n: number) => n * 60_000

export const MOCK_AUCTIONS: Auction[] = [
  {
    id: '1',
    title: 'Cyclops Age of Apocalypse',
    brand: 'AO Studios',
    scale: '1/4',
    seller: 'VaultSeller',
    description: 'Estátua em resina de alta qualidade, pintura artesanal com detalhamento extremo. Peça única numerada, acompanha certificado de autenticidade e base exclusiva. Condições: item usado em perfeito estado, sem quebras ou retoques. Fotos reais da peça anunciada. Embalagem reforçada com seguro para envio.',
    currentBid: 3200,
    bidCount: 18,
    endsAt: new Date(now + h(3) + m(22)),
    status: 'active',
    imageSlug: 'ao-studios-cyclops-age-of-apocalypse-x-men-marvel',
    imageCount: 32,
    imageExt: 'jpg',
    increment: 100,
    antiSnipe: 10,
    bids: [
      { id: 'b1-1', user: 'VaultSeller',   value: 3200, at: new Date(now - m(8)) },
      { id: 'b1-2', user: 'MarcelBR',      value: 3100, at: new Date(now - m(22)) },
      { id: 'b1-3', user: 'X_Colecionador',value: 3000, at: new Date(now - m(45)) },
      { id: 'b1-4', user: 'PedroVault',    value: 2800, at: new Date(now - h(1) - m(10)) },
      { id: 'b1-5', user: 'RafaelFig',     value: 2600, at: new Date(now - h(1) - m(38)) },
      { id: 'b1-6', user: 'MarcelBR',      value: 2400, at: new Date(now - h(2) - m(5)) },
      { id: 'b1-7', user: 'X_Colecionador',value: 2200, at: new Date(now - h(2) - m(30)) },
      { id: 'b1-8', user: 'PedroVault',    value: 2000, at: new Date(now - h(2) - m(55)) },
    ],
  },
  {
    id: '2',
    title: 'Hulk vs Sentry',
    brand: 'Custom',
    scale: '1/4',
    seller: 'MarvelVault',
    description: 'Diorama customizado único, produção exclusiva de artista independente. Peça nova, nunca exposta, saindo direto da embalagem original. Acompanha base temática e placa de identificação. Frete por conta do comprador; envio apenas para território nacional.',
    currentBid: 4750,
    bidCount: 27,
    endsAt: new Date(now + h(11) + m(40)),
    status: 'active',
    imageSlug: 'custom-hulk-vs-sentry-marvel',
    imageCount: 34,
    imageExt: 'jpg',
    increment: 150,
    bids: [
      { id: 'b2-1', user: 'HulkFan99',    value: 4750, at: new Date(now - m(15)) },
      { id: 'b2-2', user: 'MarvelVault',  value: 4600, at: new Date(now - m(34)) },
      { id: 'b2-3', user: 'SentryCollect',value: 4450, at: new Date(now - m(58)) },
      { id: 'b2-4', user: 'HulkFan99',    value: 4300, at: new Date(now - h(1) - m(20)) },
      { id: 'b2-5', user: 'Rodrigo_M',    value: 4150, at: new Date(now - h(1) - m(50)) },
      { id: 'b2-6', user: 'SentryCollect',value: 4000, at: new Date(now - h(2) - m(10)) },
      { id: 'b2-7', user: 'MarvelVault',  value: 3800, at: new Date(now - h(3)) },
    ],
  },
  {
    id: '3',
    title: 'Polaris',
    brand: 'Custom',
    scale: '1/4',
    seller: 'XMenStore',
    description: 'Custom artesanal pintado à mão com tintas acrílicas premium. Estado impecável, sem defeitos. Peça exposta por 3 meses em vitrine fechada, longe de luz solar direta. Valor inclui embalagem profissional com espuma moldada.',
    currentBid: 1800,
    bidCount: 9,
    endsAt: new Date(now + h(23) + m(15)),
    status: 'active',
    imageSlug: 'custom-polaris-xmen-marvel',
    imageCount: 4,
    imageExt: 'jpg',
    increment: 100,
    bids: [
      { id: 'b3-1', user: 'MagnetoJr',   value: 1800, at: new Date(now - m(30)) },
      { id: 'b3-2', user: 'XMenStore',   value: 1700, at: new Date(now - h(1)) },
      { id: 'b3-3', user: 'PolarisFan',  value: 1600, at: new Date(now - h(2) - m(20)) },
      { id: 'b3-4', user: 'ColecionaBR', value: 1500, at: new Date(now - h(4)) },
    ],
  },
  {
    id: '4',
    title: 'Superior Spider-Man',
    brand: 'Custom',
    scale: '1/4',
    seller: 'SpideyCollector',
    description: 'Estátua customizada com repaint profissional, teia em fio de nylon real. Peça usada em ótimo estado, pequeno detalhe na base (visível nas fotos). Venda sem direito a devolução. Frete a combinar.',
    currentBid: 2650,
    bidCount: 14,
    endsAt: new Date(now + m(4) + 30_000),
    status: 'active',
    imageSlug: 'custom-superior-spider-man-marvel',
    imageCount: 42,
    imageExt: 'jpg',
    increment: 100,
    antiSnipe: 5,
    bids: [
      { id: 'b4-1', user: 'SpideyFan',    value: 2650, at: new Date(now - m(2)) },
      { id: 'b4-2', user: 'OctoBR',       value: 2550, at: new Date(now - m(7)) },
      { id: 'b4-3', user: 'MarcoFigures', value: 2450, at: new Date(now - m(18)) },
      { id: 'b4-4', user: 'SpideyFan',    value: 2350, at: new Date(now - m(35)) },
      { id: 'b4-5', user: 'OctoBR',       value: 2250, at: new Date(now - m(55)) },
      { id: 'b4-6', user: 'MarcoFigures', value: 2150, at: new Date(now - h(1) - m(15)) },
    ],
  },
  {
    id: '5',
    title: 'Old Man Logan',
    brand: 'MadX Mad Creations',
    scale: '1/4',
    seller: 'MutantMarket',
    description: 'Edição limitada numerada 47/150. Resina importada com acabamento premium. Peça nova, lacrada, box com leve amassado no canto inferior. Acompanha certificado de autenticidade da MadX Mad Creations. Pagamento via PIX ou transferência bancária.',
    currentBid: 5100,
    bidCount: 31,
    endsAt: new Date(now - 1000),
    status: 'closed',
    imageSlug: 'madx-mad-creations-old-wolverine-x-men-marvel',
    imageCount: 5,
    imageExt: 'jpg',
    increment: 200,
    bids: [
      { id: 'b5-1', user: 'LoganFan',     value: 5100, at: new Date(now - h(1)) },
      { id: 'b5-2', user: 'ClawCollect',  value: 4900, at: new Date(now - h(1) - m(20)) },
      { id: 'b5-3', user: 'MutantMarket', value: 4700, at: new Date(now - h(2)) },
      { id: 'b5-4', user: 'WolverineBR',  value: 4500, at: new Date(now - h(3)) },
      { id: 'b5-5', user: 'LoganFan',     value: 4300, at: new Date(now - h(4)) },
    ],
  },
  {
    id: '6',
    title: 'Victor Creed',
    brand: 'MadX Mad Creations',
    scale: '1/4',
    seller: 'MutantMarket',
    description: 'Peça em processo de avaliação pela nossa equipe. Estátua custom de Victor Creed em escala 1/4, pintura original do artista. Detalhes completos e fotos adicionais disponíveis após aprovação do leilão.',
    currentBid: 0,
    bidCount: 0,
    endsAt: new Date(now + h(48)),
    status: 'review',
    imageSlug: 'madx-mad-creations-victor-creed-xmen-marvel',
    imageCount: 9,
    imageExt: 'webp',
    increment: 150,
    bids: [],
  },
]

export function getImages(auction: Auction): string[] {
  return Array.from({ length: auction.imageCount }, (_, i) => {
    const n = String(i + 1).padStart(3, '0')
    return `/statues/${auction.imageSlug}/${n}.${auction.imageExt}`
  })
}

export function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
