import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{id, name, price, count, ...}]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCount: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) item.count = action.payload.count;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { addToCart, removeFromCart, updateCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
