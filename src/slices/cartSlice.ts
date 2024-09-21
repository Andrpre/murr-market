import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../utils/types";

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
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
  selectors: {
    selectCartItems: (sliceState: CartState) => sliceState.items,
    selectTotalAmount: (sliceState: CartState) => sliceState.totalAmount,
    selectTotalQuantity: (sliceState: CartState) =>
      sliceState.items.reduce((total, item) => total + item.quantity, 0),
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export const { selectCartItems, selectTotalAmount, selectTotalQuantity } =
  cartSlice.selectors;
