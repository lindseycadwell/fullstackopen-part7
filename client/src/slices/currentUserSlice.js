import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import authService from "../services/auth";

const initialState = {
  isAuthenticated: false, // | true
  user: {}, // {username, name, token}
  error: null, // | String
};

export const login = createAsyncThunk(
  "currentUser/login",
  async ({ username, password }) => {
    const res = await authService.login({ username, password });
    return res.data;
  }
);

/* const logout = createAsyncThunk("currentUser/logout", async () => {
  const res = await authAPIService.logout();
  return res;
}); */

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("action :>> ", action);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      console.log("action :>> ", action);
      state.error = action.payload;
    },
  },
});

export const { logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;

export const selectIsAuthenticated = (state) =>
  state.currentUser.isAuthenticated;

export const selectCurrentUser = createSelector(
  (state) => state.currentUser.user,
  (user) => user
);
