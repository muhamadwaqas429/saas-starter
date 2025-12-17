import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.list = action.payload;
    },
    addUser(state, action) {
      state.list.push(action.payload);
    },
    clearUsers(state) {
      state.list = [];
    },
  },
});

export const { setUsers, addUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
