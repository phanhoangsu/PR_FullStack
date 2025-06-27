// services/authHeader.js

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem("Token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
