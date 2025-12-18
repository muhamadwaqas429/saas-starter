import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "User" },
    { name: "Mark Wilson", email: "mark@example.com", role: "User" },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    clearUsers: (state) => {
      state.list = [];
    },
  },
});

export const { setUsers, addUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
