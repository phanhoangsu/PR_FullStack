import { http } from "./AxiosInstance";

export const AuthService = {
  login: (data) => http.post("auth/token", data),
  getRole: (token) =>
    http.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  register: (data) => http.post("auth/register", data),
};
