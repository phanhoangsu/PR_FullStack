import {
  createService,
  deleteService,
  fetchAllServices,
  updateService,
} from "../api/serviceAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getServices = createAsyncThunk("services/getAll", async () => {
  const res = await fetchAllServices();
  return res.data.dataError;
});

export const addService = createAsyncThunk(
  "services/create",
  async (service) => {
    const res = await createService(service);
    return res.data.dataError;
  }
);

export const editService = createAsyncThunk(
  "services/update",
  async ({ id, data }) => {
    const res = await updateService(id, data);
    return res.data.dataError;
  }
);

export const removeService = createAsyncThunk("services/delete", async (id) => {
  await deleteService(id);
  return id;
});

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(editService.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          (s) => s.serviceId === action.payload.serviceId
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })

      .addCase(removeService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (s) => s.serviceId !== action.payload
        );
      });
  },
});

export default serviceSlice.reducer;
