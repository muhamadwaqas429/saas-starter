//centralized Axios instance to handle API calls and automatically attach the user token for authenticated requests

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const { token } = JSON.parse(authUser);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
