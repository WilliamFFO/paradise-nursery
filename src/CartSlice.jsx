import { createSlice } from '@reduxjs/toolkit'

/**
 * Convierte un precio a número. Acepta números o cadenas como "$15" o
 * "$1,299.50" (formato con punto decimal). Cualquier valor no válido vale 0,
 * para que los totales nunca terminen en NaN.
 */
export function parsePrice(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value.replace(/[^0-9.-]/g, ''))
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

const roundToCents = (amount) => Math.round(amount * 100) / 100

/** Normaliza un producto del catálogo al formato que se guarda en el carrito. */
export function toCartItem(product, quantity = 1) {
  return {
    id: String(product.id ?? product.name),
    name: product.name,
    image: product.image,
    category: product.category ?? '',
    price: parsePrice(product.price),
    quantity,
  }
}

const removeById = (state, id) => {
  state.items = state.items.filter((item) => item.id !== id)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { id, name, image, category, price, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const incoming = toCartItem(action.payload)
      const existing = state.items.find((item) => item.id === incoming.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push(incoming)
      }
    },
    removeItem: (state, action) => {
      removeById(state, action.payload)
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (item) item.quantity += 1
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        // Bajar de 1 a 0 elimina el artículo del carrito.
        removeById(state, item.id)
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((entry) => entry.id === id)
      if (!item) return
      const nextQuantity = Math.floor(Number(quantity))
      if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
        removeById(state, id)
      } else {
        item.quantity = nextQuantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  clearCart,
} = cartSlice.actions

// Selectores
export const selectCartItems = (state) => state.cart.items

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartTotal = (state) =>
  roundToCents(
    state.cart.items.reduce(
      (total, item) => total + parsePrice(item.price) * item.quantity,
      0,
    ),
  )

export const selectIsInCart = (state, id) =>
  state.cart.items.some((item) => item.id === id)

export default cartSlice.reducer
