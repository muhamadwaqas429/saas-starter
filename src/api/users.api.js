// helper functions for user CRUD operations, using our pre-configured Axios instance. Each function maps directly to a REST API endpoint

import api from "./axios";

export const getAllUsersAPI = () => api.get("/users");
export const getUserByIdAPI = (id) => api.get(`/users/${id}`);
export const updateUserAPI = (id, data) => api.put(`/users/${id}`, data);
export const deleteUserAPI = (id) => api.delete(`/users/${id}`);
