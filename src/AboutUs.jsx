import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon, CodeIcon } from './Icons.jsx'

const PROJECT_HIGHLIGHTS = [
  'SPA con React 18 y React Router (HashRouter, compatible con GitHub Pages).',
  'Estado global del carrito con Redux Toolkit: slice, selectores y persistencia en localStorage.',
  'Componentes reutilizables y diseño responsive con CSS moderno.',
  'Pruebas unitarias y de integración con Vitest y Testing Library.',
  'Integración y despliegue continuos en GitHub Pages con GitHub Actions.',
]

function AboutUs() {
  return (
    <div className="page about-page">
      <header className="page-header">
        <div className="container">
          <h1>Sobre nosotros</h1>
          <p>La historia de Paradise Nursery y el contexto académico de este proyecto.</p>
        </div>
      </header>

      <div className="container about-grid">
        <section className="about-us prose" aria-labelledby="historia-titulo">
          <h2 id="historia-titulo">Nuestra historia</h2>
          <p>
            Paradise Nursery nació de la pasión por acercar la naturaleza a cada hogar.
            Cultivamos y seleccionamos cuidadosamente plantas de interior de la más alta
            calidad, ayudando a crear espacios más saludables, tranquilos y llenos de vida.
          </p>
          <p>
            Cada planta se elige pensando en la facilidad de cuidado, la belleza y el
            bienestar que aporta a quienes la rodean. Creemos que un pequeño rincón verde
            puede transformar cualquier espacio en un paraíso personal.
          </p>
          <p>
            Más que vender plantas, queremos acompañar a cada persona con consejos de
            cuidado para que sus plantas prosperen en su nuevo hogar.
          </p>
          <p className="fiction-note">
            Paradise Nursery es una marca ficticia creada para este proyecto académico.
          </p>
          <Link to="/plantas" className="btn btn-primary">
            Ver el catálogo
            <ArrowRightIcon />
          </Link>
        </section>

        <aside className="project-card" aria-labelledby="proyecto-titulo">
          <p className="project-card-eyebrow">Proyecto académico</p>
          <h2 id="proyecto-titulo">Maestría en Arquitectura de Software</h2>
          <p>
            Aplicación desarrollada por William Fuentes como proyecto de la Maestría en
            Arquitectura de Software del Politécnico Grancolombiano. Es una tienda de
            demostración: no se venden productos ni se procesan pagos reales.
          </p>
          <ul className="project-highlights">
            {PROJECT_HIGHLIGHTS.map((highlight) => (
              <li key={highlight}>
                <CheckIcon size={18} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <a
            className="btn btn-ghost-light btn-block"
            href="https://github.com/WilliamFFO/paradise-nursery"
            target="_blank"
            rel="noreferrer"
          >
            <CodeIcon />
            Ver código en GitHub
          </a>
        </aside>
      </div>
    </div>
  )
}

export default AboutUs
