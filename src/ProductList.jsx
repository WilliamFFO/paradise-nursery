import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './CartSlice.jsx'
import './ProductList.css'

const plantsByCategory = [
  {
    category: 'Plantas de Aire Fresco',
    plants: [
      {
        name: 'Palma de Areca',
        image: 'https://picsum.photos/seed/areca-palm/400/300',
        price: 32,
      },
      {
        name: 'Hiedra Inglesa',
        image: 'https://picsum.photos/seed/english-ivy/400/300',
        price: 18,
      },
      {
        name: 'Planta de Caucho',
        image: 'https://picsum.photos/seed/rubber-plant/400/300',
        price: 25,
      },
      {
        name: 'Lengua de Suegra',
        image: 'https://picsum.photos/seed/snake-plant-2/400/300',
        price: 24,
      },
      {
        name: 'Palma de Bambú',
        image: 'https://picsum.photos/seed/bamboo-palm/400/300',
        price: 30,
      },
      {
        name: 'Helecho de Boston',
        image: 'https://picsum.photos/seed/boston-fern/400/300',
        price: 19,
      },
    ],
  },
  {
    category: 'Plantas Aromáticas',
    plants: [
      {
        name: 'Lavanda',
        image: 'https://picsum.photos/seed/lavender/400/300',
        price: 15,
      },
      {
        name: 'Jazmín',
        image: 'https://picsum.photos/seed/jasmine/400/300',
        price: 20,
      },
      {
        name: 'Menta',
        image: 'https://picsum.photos/seed/mint/400/300',
        price: 10,
      },
      {
        name: 'Romero',
        image: 'https://picsum.photos/seed/rosemary/400/300',
        price: 12,
      },
      {
        name: 'Albahaca',
        image: 'https://picsum.photos/seed/basil/400/300',
        price: 9,
      },
      {
        name: 'Eucalipto',
        image: 'https://picsum.photos/seed/eucalyptus/400/300',
        price: 22,
      },
    ],
  },
  {
    category: 'Plantas de Bajo Mantenimiento',
    plants: [
      {
        name: 'Suculenta Echeveria',
        image: 'https://picsum.photos/seed/echeveria/400/300',
        price: 12,
      },
      {
        name: 'Sansevieria',
        image: 'https://picsum.photos/seed/sansevieria/400/300',
        price: 22,
      },
      {
        name: 'ZZ Plant',
        image: 'https://picsum.photos/seed/zz-plant/400/300',
        price: 28,
      },
      {
        name: 'Pothos',
        image: 'https://picsum.photos/seed/pothos/400/300',
        price: 16,
      },
      {
        name: 'Cactus San Pedro',
        image: 'https://picsum.photos/seed/cactus-san-pedro/400/300',
        price: 14,
      },
      {
        name: 'Planta Araña',
        image: 'https://picsum.photos/seed/spider-plant/400/300',
        price: 13,
      },
    ],
  },
]

function ProductList({ onHomeClick, onCartClick }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName)
  }

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant))
  }

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="navbar-title">🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <a onClick={onHomeClick}>Inicio</a>
          <a className="active-link">Plantas</a>
          <a onClick={onCartClick} className="cart-icon">
            Carrito 🛒 <span className="cart-count">{cartCount}</span>
          </a>
        </div>
      </nav>

      <div className="product-list-container">
        {plantsByCategory.map((categoryGroup) => (
          <div key={categoryGroup.category} className="category-section">
            <h2>{categoryGroup.category}</h2>
            <div className="plant-grid">
              {categoryGroup.plants.map((plant) => (
                <div key={plant.name} className="plant-card">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="plant-thumbnail"
                  />
                  <h3>{plant.name}</h3>
                  <p className="plant-price">${plant.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-button"
                    disabled={isInCart(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isInCart(plant.name) ? 'Agregado' : 'Agregar al Carrito'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
