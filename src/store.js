import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { toCartItem } from './CartSlice.jsx'
import { findPlant } from './data/plants.js'

export const CART_STORAGE_KEY = 'paradise-nursery:cart'

/**
 * Recupera el carrito guardado en localStorage. Solo conserva artículos que
 * siguen existiendo en el catálogo y toma de él nombre, precio e imagen, para
 * que el carrito y el listado de productos nunca queden desincronizados.
 */
export function loadPersistedCart(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(CART_STORAGE_KEY)
    if (!raw) return undefined
    const saved = JSON.parse(raw)
    if (!Array.isArray(saved?.items)) return undefined

    const itemsById = new Map()
    for (const entry of saved.items) {
      const plant = findPlant(entry?.id)
      const quantity = Math.floor(Number(entry?.quantity))
      if (!plant || !Number.isFinite(quantity) || quantity < 1) continue
      if (!itemsById.has(plant.id)) itemsById.set(plant.id, toCartItem(plant, quantity))
    }
    return { items: [...itemsById.values()] }
  } catch {
    return undefined
  }
}

export function makeStore(preloadedCart) {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: preloadedCart ? { cart: preloadedCart } : undefined,
  })
}

export const store = makeStore(loadPersistedCart())

store.subscribe(() => {
  try {
    globalThis.localStorage?.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(store.getState().cart),
    )
  } catch {
    // Almacenamiento no disponible (modo privado, cuota, etc.): se ignora.
  }
})
