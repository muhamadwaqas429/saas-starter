import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_BASE,
});

=======
  baseURL: "http://localhost:5000/api",
});

// Interceptor to add token to every request
>>>>>>> origin/main
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
<<<<<<< HEAD
  (error) => Promise.reject(error),
=======
  (error) => Promise.reject(error)
>>>>>>> origin/main
);

export default api;
