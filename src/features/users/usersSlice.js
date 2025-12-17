import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // array of user objects
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setUsers, addUser, removeUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
