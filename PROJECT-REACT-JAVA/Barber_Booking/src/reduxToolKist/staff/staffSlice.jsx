// reduxToolKist/staff/staffSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../api/StaffAPI";

export const getAllStaff = createAsyncThunk("staff/getAll", async () => {
  const res = await fetchAllStaff();
  // console.log("✅ API trả về:", res.data); // THÊM DÒNG NÀY
  return res.data; // ✅ Giả sử API trả về trong dataError
});

export const addStaff = createAsyncThunk("staff/add", async (staffData) => {
  const res = await createStaff(staffData);
  return res.data.dataError;
});

export const editStaff = createAsyncThunk(
  "staff/edit",
  async ({ id, data }) => {
    await updateStaff(id, data);
    return { id, data };
  }
);

export const removeStaff = createAsyncThunk("staff/delete", async (id) => {
  await deleteStaff(id);
  return id;
});

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = action.payload;
      })
      .addCase(getAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.staffs.push(action.payload);
      })
      .addCase(editStaff.fulfilled, (state, action) => {
        const index = state.staffs.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.staffs[index] = {
            ...state.staffs[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(removeStaff.fulfilled, (state, action) => {
        state.staffs = state.staffs.filter((s) => s.id !== action.payload);
      });
  },
});

export default staffSlice.reducer;
