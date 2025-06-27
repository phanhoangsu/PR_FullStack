// redux/appointments/appointmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../api/AxiosInstance";

export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const res = await http.post("/customer/appointments", appointmentData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Đặt lịch thất bại"
      );
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    loading: false,
    success: false,
    error: null,
    response: null,
  },
  reducers: {
    resetAppointmentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.response = action.payload;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
