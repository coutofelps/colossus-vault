// Mock data para a área logada — substitua por chamadas à API quando o backend existir

export const mockUser = {
  name: 'Marcos Felipe',
  email: '0709.marcoscouto@gmail.com',
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
  totalAmount: number
  paymentMethod: string | null
  installments: number
  installmentsPaid: number
  nextPaymentDate: Date | null
  status: 'pending_contact' | 'in_progress' | 'completed'
}

export const mockActiveBids: BidEntry[] = [
  {
    auctionId: '1',
    title: 'Immortal Hulk 1:4 Diorama — Prime 1 Studio',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    myBid: 12400,
    currentBid: 14800,
    status: 'outbid',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
    hasProxy: false,
  },
  {
    auctionId: '2',
    title: 'Spider-Man Premium Format Figure — Sideshow',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    myBid: 8900,
    currentBid: 8900,
    status: 'leading',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 27),
    hasProxy: true,
  },
  {
    auctionId: '3',
    title: 'Batman Arkham Knight 1:6 — Hot Toys',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    myBid: 5200,
    currentBid: 5200,
    status: 'leading',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 72),
    hasProxy: false,
  },
]

export const mockWatchlist: WatchEntry[] = [
  {
    auctionId: '4',
    title: 'Venom Symbiote Origins 1:4 — XM Studios',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    currentBid: 22000,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
  },
  {
    auctionId: '5',
    title: 'Wolverine Classic Ver. ARTFX — Kotobukiya',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    currentBid: 3400,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 120),
  },
]

export const mockClosedBids: ClosedBidEntry[] = [
  {
    auctionId: '9',
    title: 'Iron Man Mark III 1:6 — Hot Toys',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    myMaxBid: 9800,
    result: 'won',
    closedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    auctionId: '10',
    title: 'Thor Avengers Endgame — Sideshow',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    myMaxBid: 6200,
    result: 'lost',
    closedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
]

export const mockPayments: PaymentEntry[] = [
  {
    auctionId: '9',
    title: 'Iron Man Mark III 1:6 — Hot Toys',
    thumbnail: '/brand-identity/assets/green-version-icon.png',
    seller: 'FigCollect Brasil',
    totalAmount: 9800,
    paymentMethod: 'PIX',
    installments: 3,
    installmentsPaid: 1,
    nextPaymentDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
    status: 'in_progress',
  },
]
