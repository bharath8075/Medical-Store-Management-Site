import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: localStorage.getItem("isLoggedIn") === "true",
  currentUser: localStorage.getItem("currentUser") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.currentUser = action.payload;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", action.payload);
    },

    logout: (state) => {
      state.isLoggedin = false;
      state.currentUser = "";
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
