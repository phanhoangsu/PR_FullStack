// reduxToolKist/product/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../api/AxiosInstance";

export const getAllProducts = createAsyncThunk("product/getAll", async () => {
  const res = await http.get("products");
  return res.data.dataError; // ✅ Lấy đúng mảng sản phẩm
});

export const addProduct = createAsyncThunk("product/add", async (data) => {
  const res = await http.post("products", data);
  return res.data.dataError;
});

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({ id, data }) => {
    const res = await http.put(`products/${id}`, data);
    return res.data.dataError;
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  await http.delete(`products/${id}`);
  return { id };
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p.productId !== action.payload.id
        );
      });
  },
});

export default productSlice.reducer;
