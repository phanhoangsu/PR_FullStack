// src/reduxToolKist/combos/comboSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../api/AxiosInstance";

export const getCombos = createAsyncThunk(
  "combo/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await http.get("combos");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Lỗi load combo");
    }
  }
);

export const createCombo = createAsyncThunk(
  "combo/create",
  async (data, thunkAPI) => {
    try {
      const res = await http.post("combos", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Lỗi tạo combo");
    }
  }
);

export const updateCombo = createAsyncThunk(
  "combo/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await http.put(`combos/${id}`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Lỗi cập nhật combo"
      );
    }
  }
);

export const deleteCombo = createAsyncThunk(
  "combo/delete",
  async (id, thunkAPI) => {
    try {
      await http.delete(`combos/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Lỗi xoá combo");
    }
  }
);

const comboSlice = createSlice({
  name: "combo",
  initialState: {
    combos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCombos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCombos.fulfilled, (state, action) => {
        state.loading = false;
        // Nếu payload là mảng thì dùng luôn, không cần dataError, không cần filter
        state.combos = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(getCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCombo.fulfilled, (state, action) => {
        state.combos.push(action.payload);
      })
      .addCase(deleteCombo.fulfilled, (state, action) => {
        state.combos = state.combos.filter((c) => c.comboId !== action.payload);
      });
  },
});

export default comboSlice.reducer;
