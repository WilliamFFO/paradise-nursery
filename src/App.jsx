import React, { useState } from 'react'
import ProductList from './ProductList.jsx'
import CartItem from './CartItem.jsx'
import './App.css'

function App() {
  // Estado que controla qué página se muestra: 'home' | 'products' | 'cart'
  const [currentPage, setCurrentPage] = useState('home')

  const handleGetStarted = () => {
    setCurrentPage('products')
  }

  const handleHomeClick = () => {
    setCurrentPage('home')
  }

  const handleProductsClick = () => {
    setCurrentPage('products')
  }

  const handleCartClick = () => {
    setCurrentPage('cart')
  }

  const handleContinueShopping = () => {
    setCurrentPage('products')
  }

  if (currentPage === 'cart') {
    return (
      <CartItem
        onHomeClick={handleHomeClick}
        onProductsClick={handleProductsClick}
        onContinueShopping={handleContinueShopping}
      />
    )
  }

  if (currentPage === 'products') {
    return (
      <ProductList
        onHomeClick={handleHomeClick}
        onCartClick={handleCartClick}
      />
    )
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <h2>Donde las plantas se encuentran con el cuidado</h2>
        <p>
          Descubre nuestra colección de plantas de interior, elegidas
          cuidadosamente para llenar de vida y frescura cada rincón de tu
          hogar u oficina.
        </p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Comenzar
        </button>
      </div>
    </div>
  )
}

export default App
