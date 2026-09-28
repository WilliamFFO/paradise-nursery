import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from './data/plants.js'
import { ArrowRightIcon, CategoryIcon } from './Icons.jsx'
import { pluralize } from './utils/format.js'

const HERO_PHOTO =
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1600&q=80'

function Home() {
  // Si la foto externa no carga, el hero conserva su fondo verde ilustrado.
  const [photoAvailable, setPhotoAvailable] = useState(true)

  return (
    <>
      <section className={photoAvailable ? 'hero has-photo' : 'hero'}>
        {photoAvailable && (
          <img
            className="hero-photo"
            src={HERO_PHOTO}
            alt=""
            fetchpriority="high"
            onError={() => setPhotoAvailable(false)}
          />
        )}
        <div className="hero-content">
          <p className="hero-badge">Proyecto académico · Maestría en Arquitectura de Software</p>
          <h1 className="hero-title">Paradise Nursery</h1>
          <p className="hero-tagline">Donde las plantas se encuentran con el cuidado</p>
          <p className="hero-text">
            Descubre nuestra colección de plantas de interior, elegidas cuidadosamente
            para llenar de vida y frescura cada rincón de tu hogar u oficina.
          </p>
          <div className="hero-actions">
            <Link to="/plantas" className="btn btn-primary btn-lg">
              Explorar plantas
              <ArrowRightIcon />
            </Link>
            <Link to="/sobre-nosotros" className="btn btn-ghost-light btn-lg">
              Sobre el proyecto
            </Link>
          </div>
          <p className="hero-note">
            Tienda de demostración: no se realizan compras ni pagos reales.
          </p>
        </div>
      </section>

      <section className="section container" aria-labelledby="categorias-titulo">
        <div className="section-head">
          <h2 id="categorias-titulo">Explora por categoría</h2>
          <p>Encuentra la planta ideal según el espacio, la luz y el tiempo que tienes para cuidarla.</p>
        </div>
        <div className="category-cards">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/plantas"
              state={{ category: category.id }}
              className="category-card"
            >
              <span className="category-card-icon">
                <CategoryIcon name={category.icon} size={22} />
              </span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="category-card-cta">
                Ver {pluralize(category.plants.length, 'planta', 'plantas')}
                <ArrowRightIcon size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
