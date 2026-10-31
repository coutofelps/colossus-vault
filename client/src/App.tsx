import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Brand from './pages/Brand'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand" element={<Brand />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
