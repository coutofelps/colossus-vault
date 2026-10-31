import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BrandIdentity from './pages/BrandIdentity'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand-identity" element={<BrandIdentity />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
