import Box from '@mui/material/Box'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import CarDetailPage from './pages/CarDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import { CartProvider } from './context/CartContext.jsx'

export default function App() {
  return (
    <CartProvider>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100svh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/carro/:id" element={<CarDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />
        </Routes>
      </Box>
    </CartProvider>
  )
}
