import axios from "axios";

// Use deployed backend URL from .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// Interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
