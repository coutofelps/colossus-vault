import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrandIdentity from './pages/BrandIdentity'
import Home from './pages/Home'
import Auctions from './pages/Auctions'
import AuctionDetail from './pages/AuctionDetail'
import UnderDevelopment from './pages/UnderDevelopment'
import ThemePanel from './components/ThemePanel'

function App() {
  return (
    <BrowserRouter>
      <ThemePanel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:id" element={<AuctionDetail />} />
        <Route path="/brand-identity" element={<BrandIdentity />} />
        <Route path="/under-development" element={<UnderDevelopment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
