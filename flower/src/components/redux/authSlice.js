import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLogged: false,
    cart: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
    },
    updateCart: (state, action) => {
      if (state.user) {
        state.user.cart = action.payload;
      }
    },

    updateHistory: (state, action) => {
      if (state.user) {
        state.user.history = action.payload;
      }
    },
  },
});

export const { setUser, logout, updateCart, updateHistory } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const isLoggedIn = (state) => state.auth.isLogged;
export default authSlice.reducer;

