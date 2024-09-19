import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; // Импортируем RootState
import { Product } from './Product';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [
    {
      id: 1,
      name: 'Когтеточка',
      price: 200,
      image: 'https://via.placeholder.com/150',
      description: 'Отличная когтеточка для вашего кота!',
    },
    {
      id: 2,
      name: 'Мышка',
      price: 50,
      image: 'https://via.placeholder.com/150',
      description: 'Игрушка мышка для веселья вашего кота!',
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

// Селекторы
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductById = (state: RootState, id: number) =>
  state.products.products.find((product) => product.id === id);

export default productsSlice.reducer;
