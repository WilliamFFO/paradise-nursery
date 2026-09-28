import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from './CartSlice.jsx'
import { ArrowRightIcon, InfoIcon, LeafIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons.jsx'
import PlantImage from './PlantImage.jsx'
import { formatPrice, pluralize } from './utils/format.js'
import './CartItem.css'

function CartRow({ item }) {
  const dispatch = useDispatch()
  const isLastUnit = item.quantity === 1

  return (
    <li className="cart-row">
      <PlantImage
        src={item.image}
        alt={item.name}
        className="cart-row-image"
        width={96}
        height={96}
      />
      <div className="cart-row-info">
        <h3>{item.name}</h3>
        <p className="cart-row-meta">
          {item.category && <span>{item.category} · </span>}
          {formatPrice(item.price)} c/u
        </p>
      </div>
      <div className="qty" role="group" aria-label={`Cantidad de ${item.name}`}>
        <button
          type="button"
          onClick={() => dispatch(decrementQuantity(item.id))}
          aria-label={
            isLastUnit ? `Quitar ${item.name} del carrito` : `Disminuir cantidad de ${item.name}`
          }
        >
          <MinusIcon size={16} />
        </button>
        <span className="qty-value" aria-live="polite">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => dispatch(incrementQuantity(item.id))}
          aria-label={`Aumentar cantidad de ${item.name}`}
        >
          <PlusIcon size={16} />
        </button>
      </div>
      <p className="cart-row-subtotal">
        <span className="sr-only">Subtotal: </span>
        {formatPrice(item.price * item.quantity)}
      </p>
      <button
        type="button"
        className="icon-btn cart-row-remove"
        onClick={() => dispatch(removeItem(item.id))}
        aria-label={`Eliminar ${item.name} del carrito`}
        title="Eliminar"
      >
        <TrashIcon size={18} />
      </button>
    </li>
  )
}

function CartItem() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartCount = useSelector(selectCartCount)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className="page cart-page">
      <header className="page-header">
        <div className="container">
          <h1>Tu carrito</h1>
          <p>
            {cartCount === 0
              ? 'Aún no has agregado plantas.'
              : `Tienes ${pluralize(cartCount, 'planta', 'plantas')} en tu carrito.`}
          </p>
        </div>
      </header>

      <div className="container">
        <div className="demo-notice" role="note">
          <InfoIcon />
          <p>
            <strong>Proyecto académico de demostración:</strong> no se realizan compras
            ni pagos reales. El carrito solo se guarda en este navegador.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">
              <LeafIcon size={28} />
            </span>
            <h2>Tu carrito está vacío</h2>
            <p>Explora el catálogo y agrega las plantas que más te gusten.</p>
            <Link to="/plantas" className="btn btn-primary">
              Explorar plantas
              <ArrowRightIcon />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <ul className="cart-list" aria-label="Plantas en el carrito">
              {cartItems.map((item) => (
                <CartRow key={item.id} item={item} />
              ))}
            </ul>

            <aside className="cart-summary" aria-labelledby="resumen-titulo">
              <h2 id="resumen-titulo">Resumen</h2>
              <dl className="summary-list">
                <div>
                  <dt>Plantas distintas</dt>
                  <dd>{cartItems.length}</dd>
                </div>
                <div>
                  <dt>Unidades</dt>
                  <dd>{cartCount}</dd>
                </div>
                <div className="summary-total">
                  <dt>Total</dt>
                  <dd data-testid="cart-total">{formatPrice(cartTotal)}</dd>
                </div>
              </dl>
              <Link to="/plantas" className="btn btn-primary btn-block">
                Seguir explorando
              </Link>
              <button
                type="button"
                className="btn btn-danger-ghost btn-block"
                onClick={() => {
                  dispatch(clearCart())
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <TrashIcon size={18} />
                Vaciar carrito
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartItem
