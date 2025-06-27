import { http } from "./AxiosInstance";

export const fetchAllServices = () => http.get("services");
export const createService = (data) => http.post("services", data);
export const updateService = (id, data) => http.put(`services/${id}`, data);
export const deleteService = (id) => http.delete(`services/${id}`);
export const getServiceById = (id) => http.get(`services/${id}`);
