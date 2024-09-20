import { configureStore } from "@reduxjs/toolkit";

import { productsSlice } from "../slices/productsSlice";
import { cartSlice } from "../slices/cartSlice";
import { wishlistSlice } from "../slices/wishlistSlice";

const rootReducer = {
  [productsSlice.name]: productsSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [wishlistSlice.name]: wishlistSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
