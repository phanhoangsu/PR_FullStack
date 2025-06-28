import { http } from "./AxiosInstance";

export const fetchAllStaff = () => http.get("staff");
export const createStaff = (data) => http.post("staff", data);
export const updateStaff = (id, data) => http.put(`staff/${id}`, data);
export const deleteStaff = (id) => http.delete(`staff/${id}`);
export const getStaffById = (id) => http.get(`staff/${id}`);
