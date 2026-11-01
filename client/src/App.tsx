import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrandIdentity from './pages/BrandIdentity'
import Home from './pages/Home'
import Auctions from './pages/Auctions'
import AuctionDetail from './pages/AuctionDetail'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UnderDevelopment from './pages/UnderDevelopment'
import AccountLayout from './pages/account/AccountLayout'
import AccountDashboard from './pages/account/AccountDashboard'
import AccountWip from './pages/account/AccountWip'
import ThemePanel from './components/ThemePanel'

function App() {
  return (
    <BrowserRouter>
      <ThemePanel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:id" element={<AuctionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/brand-identity" element={<BrandIdentity />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/under-development" element={<UnderDevelopment />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountDashboard />} />
          <Route path="bids" element={<AccountWip title="Meus Lances" />} />
          <Route path="watchlist" element={<AccountWip title="Acompanhando" />} />
          <Route path="payments" element={<AccountWip title="Pagamentos" />} />
          <Route path="profile" element={<AccountWip title="Dados da Conta" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
