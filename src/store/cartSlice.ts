import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../types'

type CartState = {
  items: Produto[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Produto>) {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
