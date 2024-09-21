import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../utils/types';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<Product>) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.items.push(action.payload);
      }
    },
    removeItemFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  selectors: {
      selectWishlistItems: (sliceState: WishlistState ) => sliceState.items,
  }
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;
export const { selectWishlistItems } =
wishlistSlice.selectors;
