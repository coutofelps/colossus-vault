// Mock data para a área logada — substitua por chamadas à API quando o backend existir

export const mockUser = {
  name: 'Felipe Couto',
  email: '0709.marcoscouto@gmail.com',
  phone: '(11) 99876-5432',
  cpf: '•••.•••.•••-12',
  memberSince: new Date('2024-03-15'),
  totalBids: 18,
  wonAuctions: 3,
  activeWatching: 2,
  verified: true,
  address: {
    cep: '01310-100',
    logradouro: 'Avenida Paulista',
    numero: '1578',
    complemento: 'Apto 42',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    estado: 'SP',
  },
}

export interface BidEntry {
  auctionId: string
  title: string
  thumbnail: string
  myBid: number
  currentBid: number
  status: 'leading' | 'outbid'
  endsAt: Date
  hasProxy: boolean
}

export interface WatchEntry {
  auctionId: string
  title: string
  thumbnail: string
  currentBid: number
  endsAt: Date
}

export interface ClosedBidEntry {
  auctionId: string
  title: string
  thumbnail: string
  myMaxBid: number
  result: 'won' | 'lost'
  closedAt: Date
}

export interface PaymentEntry {
  auctionId: string
  title: string
  thumbnail: string
  seller: string
  purchaseDate: Date
  totalAmount: number
  paymentMethod: string | null
  installments: number
  installmentsPaid: number
  nextPaymentDate: Date | null
  status: 'pending_contact' | 'in_progress' | 'completed'
}

export const mockActiveBids: BidEntry[] = [
  {
    auctionId: '2',
    title: 'Immortal Hulk vs Sentry Diorama',
    thumbnail: '/statues/custom-hulk-vs-sentry-marvel/001.jpg',
    myBid: 12400,
    currentBid: 14800,
    status: 'outbid',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
    hasProxy: false,
  },
  {
    auctionId: '4',
    title: 'Superior Spider-Man Premium Format',
    thumbnail: '/statues/custom-superior-spider-man-marvel/001.jpg',
    myBid: 8900,
    currentBid: 8900,
    status: 'leading',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 27),
    hasProxy: true,
  },
  {
    auctionId: '5',
    title: 'Old Wolverine 1:6 — Mad Creations',
    thumbnail: '/statues/madx-mad-creations-old-wolverine-x-men-marvel/001.jpg',
    myBid: 5200,
    currentBid: 5200,
    status: 'leading',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 72),
    hasProxy: false,
  },
]

export const mockWatchlist: WatchEntry[] = [
  {
    auctionId: '1',
    title: 'Cyclops Age of Apocalypse — AO Studios',
    thumbnail: '/statues/ao-studios-cyclops-age-of-apocalypse-x-men-marvel/001.jpg',
    currentBid: 22000,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
  },
  {
    auctionId: '6',
    title: 'Victor Creed X-Men — Mad Creations',
    thumbnail: '/statues/madx-mad-creations-victor-creed-xmen-marvel/001.webp',
    currentBid: 3400,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 99),
  },
]

export const mockClosedBids: ClosedBidEntry[] = [
  {
    auctionId: '3',
    title: 'Polaris X-Men Custom',
    thumbnail: '/statues/custom-polaris-xmen-marvel/001.jpg',
    myMaxBid: 9800,
    result: 'won',
    closedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    auctionId: '5',
    title: 'Old Wolverine 1:6 — Mad Creations',
    thumbnail: '/statues/madx-mad-creations-old-wolverine-x-men-marvel/001.jpg',
    myMaxBid: 6200,
    result: 'lost',
    closedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
]

export const mockPayments: PaymentEntry[] = [
  {
    auctionId: '3',
    title: 'Polaris X-Men Custom',
    thumbnail: '/statues/custom-polaris-xmen-marvel/001.jpg',
    seller: 'FigCollect Brasil',
    purchaseDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    totalAmount: 9800,
    paymentMethod: 'PIX',
    installments: 3,
    installmentsPaid: 1,
    nextPaymentDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
    status: 'in_progress',
  },
]
