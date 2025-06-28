// redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import serviceReducer from "./services/serviceSlice";
import appointmentReducer from "./appointments/appointmentSlice";
import staffReducer from "./staff/staffSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    appointments: appointmentReducer,
    staff: staffReducer,
  },
});
