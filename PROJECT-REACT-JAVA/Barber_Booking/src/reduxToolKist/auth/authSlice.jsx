import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../api/AuthService";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthService.login(data);
      const { token, expired } = res.data;

      // gọi /profile để lấy roles sau khi đăng nhập
      const profileRes = await AuthService.getRole(token); // api này cần định nghĩa nếu chưa có
      // const roles = profileRes.data.roles || [];

      const profile = profileRes.data;

      const roles = profile.roles || [];

      sessionStorage.setItem("Token", res.data.token);
      sessionStorage.setItem("Expired", res.data.expired);
      sessionStorage.setItem("Role", JSON.stringify(roles));

      sessionStorage.setItem("UserProfile", JSON.stringify(profile));

      return { token, expired, roles, profile };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Đăng nhập thất bại");
    }
  }
);

// export const register = createAsyncThunk(
//   "auth/register",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await AuthService.register(data);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Đăng ký thất bại");
//     }
//   }
// );
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthService.register(data);
      return res.data;
    } catch (err) {
      // ✅ Ưu tiên lấy message từ API backend nếu có
      const errorMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response.data
          : "Đăng ký thất bại");

      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("Token") || null,
    expired: sessionStorage.getItem("Expired") || null,
    roles: JSON.parse(sessionStorage.getItem("Role") || "[]"),

    profile: JSON.parse(sessionStorage.getItem("UserProfile") || "null"),

    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("Expired");
      sessionStorage.removeItem("Role");

      state.token = null;
      state.expired = null;
      state.roles = [];

      state.profile = null;
    },
    clearMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.expired = action.payload.expired;
        state.roles = action.payload.roles;
        state.profile = action.payload.profile;

        state.success = "Đăng nhập thành công";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Đăng ký thành công";
      })
      .addCase(login.rejected, register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;
