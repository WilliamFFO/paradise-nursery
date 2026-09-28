import { describe, expect, it } from 'vitest'
import reducer, {
  addItem,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  parsePrice,
  removeItem,
  selectCartCount,
  selectCartTotal,
  selectIsInCart,
  updateQuantity,
} from './CartSlice.jsx'

const lavanda = { id: 'lavanda', name: 'Lavanda', image: 'lavanda.jpg', price: 15, category: 'Aromáticas' }
const pothos = { id: 'pothos', name: 'Pothos', image: 'pothos.jpg', price: '$16.50' }

const reduce = (...actions) => actions.reduce(reducer, undefined)
const asRoot = (cart) => ({ cart })

describe('cartSlice', () => {
  it('empieza con el carrito vacío', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({ items: [] })
  })

  it('addItem agrega un artículo nuevo con cantidad 1 y precio numérico', () => {
    const state = reduce(addItem(lavanda))
    expect(state.items).toEqual([
      { id: 'lavanda', name: 'Lavanda', image: 'lavanda.jpg', category: 'Aromáticas', price: 15, quantity: 1 },
    ])
  })

  it('addItem sobre un artículo existente incrementa la cantidad', () => {
    const state = reduce(addItem(lavanda), addItem(lavanda))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
  })

  it('addItem convierte precios en texto ("$16.50") a número', () => {
    const state = reduce(addItem(pothos))
    expect(state.items[0].price).toBe(16.5)
  })

  it('incrementQuantity suma una unidad', () => {
    const state = reduce(addItem(lavanda), incrementQuantity('lavanda'), incrementQuantity('lavanda'))
    expect(state.items[0].quantity).toBe(3)
  })

  it('decrementQuantity resta una unidad y elimina el artículo al bajar de 1', () => {
    let state = reduce(addItem(lavanda), incrementQuantity('lavanda'), decrementQuantity('lavanda'))
    expect(state.items[0].quantity).toBe(1)

    state = reducer(state, decrementQuantity('lavanda'))
    expect(state.items).toEqual([])
  })

  it('updateQuantity fija la cantidad y elimina el artículo si es menor que 1', () => {
    let state = reduce(addItem(lavanda), updateQuantity({ id: 'lavanda', quantity: 5 }))
    expect(state.items[0].quantity).toBe(5)

    state = reducer(state, updateQuantity({ id: 'lavanda', quantity: 0 }))
    expect(state.items).toEqual([])
  })

  it('removeItem elimina solo el artículo indicado', () => {
    const state = reduce(addItem(lavanda), addItem(pothos), removeItem('lavanda'))
    expect(state.items.map((item) => item.id)).toEqual(['pothos'])
  })

  it('clearCart vacía el carrito', () => {
    const state = reduce(addItem(lavanda), addItem(pothos), clearCart())
    expect(state.items).toEqual([])
  })

  it('los selectores calculan unidades totales e importe total', () => {
    const state = reduce(
      addItem(lavanda),
      incrementQuantity('lavanda'), // 2 x 15
      addItem(pothos), // 1 x 16.50
    )
    expect(selectCartCount(asRoot(state))).toBe(3)
    expect(selectCartTotal(asRoot(state))).toBe(46.5)
    expect(selectIsInCart(asRoot(state), 'pothos')).toBe(true)
    expect(selectIsInCart(asRoot(state), 'menta')).toBe(false)
  })

  it('el total de un carrito vacío es 0', () => {
    const state = reduce(addItem(lavanda), decrementQuantity('lavanda'))
    expect(selectCartCount(asRoot(state))).toBe(0)
    expect(selectCartTotal(asRoot(state))).toBe(0)
  })
})

describe('parsePrice', () => {
  it.each([
    [15, 15],
    ['$15', 15],
    ['$1,299.99', 1299.99],
    ['abc', 0],
    [undefined, 0],
    [Number.NaN, 0],
  ])('parsePrice(%s) = %s', (input, expected) => {
    expect(parsePrice(input)).toBe(expected)
  })
})
