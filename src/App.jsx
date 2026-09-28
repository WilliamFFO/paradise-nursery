import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import ProductList from './ProductList.jsx'
import CartItem from './CartItem.jsx'
import AboutUs from './AboutUs.jsx'
import './App.css'

const PAGE_TITLES = {
  '/': 'Paradise Nursery · Plantas de interior',
  '/plantas': 'Plantas · Paradise Nursery',
  '/carrito': 'Carrito · Paradise Nursery',
  '/sobre-nosotros': 'Sobre nosotros · Paradise Nursery',
}

/** Sube al inicio de la página y actualiza el título al cambiar de ruta. */
function RouteEffects() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? PAGE_TITLES['/']
    // Si venimos de una tarjeta de categoría, ProductList hace su propio scroll.
    if (!state?.category) window.scrollTo(0, 0)
  }, [pathname, state])

  return null
}

function App() {
  return (
    <div className="app-shell">
      <RouteEffects />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plantas" element={<ProductList />} />
          <Route path="/carrito" element={<CartItem />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
