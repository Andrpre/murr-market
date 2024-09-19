import { configureStore } from "@reduxjs/toolkit";

import { productsSlice } from "../slices/productsSlice";
import { cartSlice } from "../slices/cartSlice";

const rootReducer = {
  [productsSlice.name]: productsSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
