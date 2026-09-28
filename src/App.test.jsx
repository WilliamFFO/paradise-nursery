import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { CART_STORAGE_KEY, loadPersistedCart, makeStore } from './store.js'

function renderApp(route = '/') {
  const store = makeStore()
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[route]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    </Provider>,
  )
  return store
}

const addButton = (plantName) =>
  screen.getByRole('button', { name: new RegExp(`: ${plantName}$`) })

describe('Paradise Nursery', () => {
  it('la página de inicio indica que es un proyecto académico', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { level: 1, name: 'Paradise Nursery' })).toBeTruthy()
    expect(screen.getByText(/Maestría en Arquitectura de Software/, { selector: '.hero-badge' })).toBeTruthy()
  })

  it('agregar deshabilita el botón, actualiza el contador y se re-habilita al quitar el artículo', () => {
    renderApp('/plantas')

    fireEvent.click(addButton('Lavanda'))
    fireEvent.click(addButton('Pothos'))

    expect(addButton('Lavanda').disabled).toBe(true)
    expect(screen.getByTestId('cart-badge').textContent).toBe('2')

    // Ir al carrito, subir la cantidad de Lavanda y comprobar el total.
    fireEvent.click(screen.getByRole('link', { name: /Carrito: 2 artículos/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad de Lavanda' }))
    expect(screen.getByTestId('cart-badge').textContent).toBe('3')
    expect(screen.getByTestId('cart-total').textContent).toBe('$46.00') // 2 x 15 + 16

    // Bajar Lavanda hasta 0 la elimina del carrito.
    fireEvent.click(screen.getByRole('button', { name: 'Disminuir cantidad de Lavanda' }))
    fireEvent.click(screen.getByRole('button', { name: 'Quitar Lavanda del carrito' }))
    const list = screen.getByRole('list', { name: 'Plantas en el carrito' })
    expect(within(list).queryByText('Lavanda')).toBeNull()
    expect(screen.getByTestId('cart-badge').textContent).toBe('1')

    // De vuelta al catálogo, el botón de Lavanda vuelve a estar disponible.
    fireEvent.click(screen.getByRole('link', { name: 'Plantas' }))
    expect(addButton('Lavanda').disabled).toBe(false)
    expect(addButton('Pothos').disabled).toBe(true)
  })

  it('el carrito no ofrece pagos y muestra el aviso de demostración', () => {
    renderApp('/plantas')
    fireEvent.click(addButton('Menta'))
    fireEvent.click(screen.getByRole('link', { name: /Carrito: 1 artículo$/ }))

    expect(screen.queryByRole('button', { name: /pagar|checkout|comprar/i })).toBeNull()
    expect(screen.getByRole('note').textContent).toMatch(/no se realizan compras ni pagos reales/)

    fireEvent.click(screen.getByRole('button', { name: /Vaciar carrito/ }))
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
    expect(screen.getByTestId('cart-badge').textContent).toBe('0')
  })
})

describe('loadPersistedCart', () => {
  it('restaura solo artículos válidos del catálogo con sus datos actuales', () => {
    const storage = new Map([
      [
        CART_STORAGE_KEY,
        JSON.stringify({
          items: [
            { id: 'lavanda', name: 'Nombre viejo', price: 999, quantity: 2 },
            { id: 'no-existe', quantity: 1 },
            { id: 'menta', quantity: 0 },
          ],
        }),
      ],
    ])
    const cart = loadPersistedCart({ getItem: (key) => storage.get(key) ?? null })
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]).toMatchObject({ id: 'lavanda', name: 'Lavanda', price: 15, quantity: 2 })
  })

  it('ignora datos corruptos', () => {
    expect(loadPersistedCart({ getItem: () => '{no es json' })).toBeUndefined()
  })
})
