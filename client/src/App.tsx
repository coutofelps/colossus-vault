import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import BrandIdentity from './pages/BrandIdentity'
import Home from './pages/Home'
import Auctions from './pages/Auctions'
import AuctionDetail from './pages/AuctionDetail'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UnderDevelopment from './pages/UnderDevelopment'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import Payments from './pages/Payments'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:id" element={<AuctionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/brand-identity" element={<BrandIdentity />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/under-development" element={<UnderDevelopment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
