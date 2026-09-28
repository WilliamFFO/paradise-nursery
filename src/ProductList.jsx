import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { addItem, selectCartItems } from './CartSlice.jsx'
import { allPlants, categories } from './data/plants.js'
import { CartIcon, CategoryIcon, CheckIcon } from './Icons.jsx'
import PlantImage from './PlantImage.jsx'
import { formatPrice, pluralize } from './utils/format.js'
import './ProductList.css'

const sectionId = (categoryId) => `categoria-${categoryId}`

function scrollToCategory(categoryId, behavior = 'smooth') {
  document.getElementById(sectionId(categoryId))?.scrollIntoView?.({ behavior, block: 'start' })
}

function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { state } = useLocation()
  const targetCategory = state?.category

  // El estado del botón se deriva del carrito: si un artículo se elimina del
  // carrito, su botón "Agregar" vuelve a habilitarse automáticamente.
  const idsInCart = useMemo(() => new Set(cartItems.map((item) => item.id)), [cartItems])

  useEffect(() => {
    if (targetCategory) scrollToCategory(targetCategory, 'auto')
  }, [targetCategory])

  return (
    <div className="page products-page">
      <header className="page-header">
        <div className="container">
          <h1>Nuestras plantas</h1>
          <p>
            {allPlants.length} plantas de interior en {categories.length} categorías.
            Agrega tus favoritas al carrito y ajusta las cantidades cuando quieras.
          </p>
          <div className="category-chips" aria-label="Ir a una categoría">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="chip"
                onClick={() => scrollToCategory(category.id)}
              >
                <CategoryIcon name={category.icon} size={16} />
                {category.shortName}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container">
        {categories.map((category) => (
          <section
            key={category.id}
            id={sectionId(category.id)}
            className="category-section"
            aria-labelledby={`${sectionId(category.id)}-titulo`}
          >
            <div className="category-head">
              <span className="category-head-icon">
                <CategoryIcon name={category.icon} size={22} />
              </span>
              <div>
                <h2 id={`${sectionId(category.id)}-titulo`}>{category.name}</h2>
                <p>{category.description}</p>
              </div>
              <span className="pill">{pluralize(category.plants.length, 'planta', 'plantas')}</span>
            </div>

            <ul className="plant-grid">
              {category.plants.map((plant) => {
                const inCart = idsInCart.has(plant.id)
                return (
                  <li key={plant.id} className="plant-card">
                    <div className="plant-media">
                      <PlantImage src={plant.image} alt={plant.name} />
                    </div>
                    <div className="plant-body">
                      <div className="plant-title-row">
                        <h3>{plant.name}</h3>
                        <span className="plant-price">{formatPrice(plant.price)}</span>
                      </div>
                      <p className="plant-description">{plant.description}</p>
                      <button
                        type="button"
                        className={inCart ? 'btn btn-block btn-added' : 'btn btn-block btn-primary'}
                        disabled={inCart}
                        onClick={() => dispatch(addItem({ ...plant, category: category.shortName }))}
                      >
                        {inCart ? <CheckIcon /> : <CartIcon />}
                        {inCart ? 'En el carrito' : 'Agregar al carrito'}
                        <span className="sr-only">: {plant.name}</span>
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ProductList
