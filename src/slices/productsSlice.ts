import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, RequestStatus } from "../utils/types";
import { fetchProducts } from "../utils/api";

interface ProductsState {
  products: Product[];
  status: RequestStatus;
}
export const getProducts = createAsyncThunk<Product[]>(
  "products/getAll",
  async () => fetchProducts()
);

const initialState: ProductsState = {
  products: [],
  status: RequestStatus.Idle,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  selectors: {
    selectProducts: (sliceState: ProductsState) => sliceState.products,
    selectProductById: (sliceState: ProductsState, id: string) =>
      sliceState.products.find((product) => product.id === id),
    getStatusRequest: (sliceState: ProductsState) => sliceState.status,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        getProducts.fulfilled,
        (state, { payload }: PayloadAction<Product[]>) => {
          state.status = RequestStatus.Success;
          state.products = payload;
        }
      )
      .addCase(getProducts.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
});

export const { selectProducts, selectProductById, getStatusRequest } =
  productsSlice.selectors;
