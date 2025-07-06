import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../api/AxiosInstance";
import { getAuthHeaders } from "../utils/authHeader";

export const getAllCustomers = createAsyncThunk("customer/getAll", async () => {
  const res = await http.get("customers"); // baseURL đã là /api/
  return res.data;
});

export const addCustomer = createAsyncThunk("customer/add", async (data) => {
  const res = await http.post("customers", data, getAuthHeaders());
  return res.data;
});

export const editCustomer = createAsyncThunk(
  "customer/edit",
  async ({ phoneNumber, data }) => {
    const res = await http.put(
      `customers/${phoneNumber}`,
      data,
      getAuthHeaders()
    );
    return res.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (phoneNumber) => {
    await http.delete(`customers/${phoneNumber}`, getAuthHeaders());
    return { phoneNumber };
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (c) => c.phoneNumber !== action.payload.phoneNumber
        );
      });
  },
});

export default customerSlice.reducer;
