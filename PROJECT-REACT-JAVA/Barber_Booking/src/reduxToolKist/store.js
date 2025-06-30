// redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import serviceReducer from "./services/serviceSlice";
import comboReducer from "./services/comboSlice";
import appointmentReducer from "./appointments/appointmentSlice";
import staffReducer from "./staff/staffSlice";
import customerReducer from "./customers/customerSlice";
import productReducer from "./products/productSlice";
import staffScheduleReducer from "./staffSchedules/staffScheduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    combo: comboReducer,
    appointments: appointmentReducer,
    staff: staffReducer,
    customer: customerReducer,
    product: productReducer,
    staffSchedule: staffScheduleReducer,
  },
});
