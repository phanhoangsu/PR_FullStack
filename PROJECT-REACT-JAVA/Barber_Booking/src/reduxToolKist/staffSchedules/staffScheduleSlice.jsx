import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../api/AxiosInstance";

// 🎯 Lấy toàn bộ lịch làm việc
export const fetchSchedules = createAsyncThunk(
  "staffSchedule/fetchSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/staff-schedules");
      return res.data; // ✅ Trả về response chuẩn [{...}, {...}]
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🎯 Thêm lịch làm việc
export const addSchedule = createAsyncThunk(
  "staffSchedule/addSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const res = await http.post("/staff-schedules", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🎯 Cập nhật lịch làm việc
export const updateSchedule = createAsyncThunk(
  "staffSchedule/updateSchedule",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await http.put(`/staff-schedules/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🎯 Xóa lịch làm việc
export const deleteSchedule = createAsyncThunk(
  "staffSchedule/deleteSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const res = await http.delete(`/staff-schedules/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const staffScheduleSlice = createSlice({
  name: "staffSchedule",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ GET
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload; // ✅ Dữ liệu là mảng [{...}]
        state.loading = false;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ ADD
      .addCase(addSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSchedule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ UPDATE
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSchedule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ DELETE
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSchedule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default staffScheduleSlice.reducer;
