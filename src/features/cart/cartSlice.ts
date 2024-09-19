import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products/Product';
import { RootState } from '../../app/store';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalAmount -= item.price;
        if (item.quantity === 1) {
          state.items.splice(itemIndex, 1);
        } else {
          item.quantity -= 1;
        }
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;

export default cartSlice.reducer;
