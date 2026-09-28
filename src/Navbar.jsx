import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from './CartSlice.jsx'
import { CartIcon, LeafIcon } from './Icons.jsx'
import { pluralize } from './utils/format.js'

const NAV_LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/plantas', label: 'Plantas' },
  { to: '/sobre-nosotros', label: 'Sobre nosotros' },
]

const linkClass = (base) => ({ isActive }) => (isActive ? `${base} is-active` : base)

function Navbar() {
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <LeafIcon />
          </span>
          <span className="brand-name">Paradise Nursery</span>
        </Link>

        <nav className="nav-links" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass('nav-link')}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/carrito"
          className={linkClass('cart-link')}
          aria-label={`Carrito: ${pluralize(cartCount, 'artículo', 'artículos')}`}
        >
          <CartIcon />
          <span className="cart-link-label">Carrito</span>
          <span className={cartCount > 0 ? 'cart-badge' : 'cart-badge is-empty'} data-testid="cart-badge">
            {cartCount}
          </span>
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar
