import { createSlice } from "@reduxjs/toolkit";


//iniatl state
const initialState = {
  //no user exist 
  user: null,
  //no one is authenticated
  isAuthenticated: false,
};
//createSlice simplify creation like reducers action creation initialState
//before this we have actionaction types and reducers seperate 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload; //current login
      state.isAuthenticated = true; //boolean to track user login
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
