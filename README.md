# Paradise Nursery

**Demo en vivo:** https://williamffo.github.io/paradise-nursery/

Paradise Nursery es una tienda en línea **ficticia** de plantas de interior,
construida como una aplicación de una sola página (SPA) con React y Redux
Toolkit. Permite explorar un catálogo organizado por categorías, agregar
plantas a un carrito y gestionar cantidades con totales calculados en tiempo
real.

> **Proyecto académico** desarrollado para la **Maestría en Arquitectura de
> Software** del Politécnico Grancolombiano.
>
> Es una demostración: **no se venden productos ni se realizan compras o pagos
> reales**. No existe pasarela de pago ni formulario de tarjeta; el carrito solo
> se guarda en el navegador (localStorage).

## Características

- Página de inicio con presentación de la tienda y acceso por categorías.
- Catálogo de 18 plantas en 3 categorías, con tarjetas responsive.
- Botón "Agregar al carrito" que se deshabilita mientras la planta está en el
  carrito y se vuelve a habilitar al quitarla.
- Carrito con aumento/disminución de cantidades (bajar de 1 elimina el
  artículo), eliminación individual, "Vaciar carrito" y total general.
- Contador del carrito en la barra de navegación (unidades totales).
- Persistencia del carrito en localStorage, validada contra el catálogo.
- Página "Sobre nosotros" con el contexto académico del proyecto.
- Diseño responsive (desde ~360 px hasta escritorio) y accesible (navegación
  con teclado, etiquetas ARIA, buen contraste).

## Tecnologías

- React 18 + Vite 5
- Redux Toolkit / React-Redux (slice del carrito con selectores)
- React Router 6 (`HashRouter`, compatible con GitHub Pages)
- CSS moderno sin librerías de UI; fuentes Inter y Fraunces (Fontsource)
- Vitest + Testing Library + jsdom para pruebas
- GitHub Actions + GitHub Pages para integración y despliegue continuos

## Estructura

```
src/
  App.jsx          Rutas y layout (Navbar, Footer)
  Home.jsx         Página de inicio
  ProductList.jsx  Catálogo por categorías
  CartItem.jsx     Página del carrito
  AboutUs.jsx      Sobre nosotros / proyecto académico
  CartSlice.jsx    Estado del carrito (reducers y selectores)
  store.js         Store de Redux y persistencia
  data/plants.js   Catálogo de productos
```

## Cómo ejecutarlo

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev      # servidor de desarrollo
npm test         # pruebas (Vitest)
npm run build    # compilación de producción en dist/
npm run preview  # previsualizar la compilación
```

La compilación usa por defecto la ruta base `/paradise-nursery/` (GitHub
Pages). Para servirla en otra ruta, define `VITE_BASE_PATH`, por ejemplo
`VITE_BASE_PATH=/ npm run build`.

## Despliegue

Cada push a `main` ejecuta el flujo `.github/workflows/deploy.yml`: instala
dependencias, corre las pruebas, compila y publica `dist/` en GitHub Pages.

## Autor

William Fuentes: proyecto académico, Maestría en Arquitectura de Software,
Politécnico Grancolombiano.
