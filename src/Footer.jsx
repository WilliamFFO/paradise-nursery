import { CodeIcon, LeafIcon } from './Icons.jsx'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <LeafIcon size={18} />
          <span>Paradise Nursery</span>
        </div>
        <p className="footer-text">
          Proyecto académico · Maestría en Arquitectura de Software, Politécnico
          Grancolombiano. Tienda ficticia: no se realizan compras ni pagos reales.
          Fotos de plantas: Wikimedia Commons (licencias Creative Commons).
        </p>
        <a
          className="footer-link"
          href="https://github.com/WilliamFFO/paradise-nursery"
          target="_blank"
          rel="noreferrer"
        >
          <CodeIcon size={18} />
          Código fuente
        </a>
      </div>
    </footer>
  )
}

export default Footer
