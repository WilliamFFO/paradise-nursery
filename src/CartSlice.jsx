import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { name, image, price, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, price } = action.payload
      const existingItem = state.items.find((item) => item.name === name)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ name, image, price, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload
      const item = state.items.find((item) => item.name === name)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions

export default cartSlice.reducer
