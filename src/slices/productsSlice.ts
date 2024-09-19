import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../utils/types";

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [
    {
      id: 1,
      name: "Когтеточка",
      price: 200,
      image: "https://via.placeholder.com/150",
      description: "Отличная когтеточка для вашего кота!",
    },
    {
      id: 2,
      name: "Мышка",
      price: 50,
      image: "https://via.placeholder.com/150",
      description: "Игрушка мышка для веселья вашего кота!",
    },
  ],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  selectors: {
    selectProducts: (sliceState: ProductsState) => sliceState.products,
    selectProductById: (sliceState: ProductsState, id: number) =>
      sliceState.products.find((product) => product.id === id),
  },
});

export const { selectProducts, selectProductById } =
productsSlice.selectors;
