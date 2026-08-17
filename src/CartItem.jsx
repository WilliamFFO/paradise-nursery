import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, updateQuantity } from './CartSlice.jsx'
import './CartItem.css'

function CartItem({ onHomeClick, onProductsClick, onContinueShopping }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  const calculateItemSubtotal = (item) => {
    return (item.price * item.quantity).toFixed(2)
  }

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
  }

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeItem(item.name))
    }
  }

  const handleRemove = (name) => {
    dispatch(removeItem(name))
  }

  const handleCheckout = () => {
    alert('¡Próximamente! La funcionalidad de pago estará disponible pronto.')
  }

  const handleContinueShopping = () => {
    onContinueShopping()
  }

  return (
    <div className="cart-page">
      <nav className="navbar">
        <div className="navbar-title">🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <a onClick={onHomeClick}>Inicio</a>
          <a onClick={onProductsClick}>Plantas</a>
          <a className="active-link cart-icon">
            Carrito 🛒 <span className="cart-count">{cartCount}</span>
          </a>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Carrito de Compras</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Tu carrito está vacío.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-thumbnail"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Precio unitario: ${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <p>Subtotal: ${calculateItemSubtotal(item)}</p>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item.name)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-total">
          <h3>Total del carrito: ${calculateTotalAmount()}</h3>
        </div>

        <div className="cart-actions">
          <button
            className="continue-shopping-button"
            onClick={handleContinueShopping}
          >
            Continuar Comprando
          </button>
          <button className="checkout-button" onClick={handleCheckout}>
            Pagar (Próximamente)
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
