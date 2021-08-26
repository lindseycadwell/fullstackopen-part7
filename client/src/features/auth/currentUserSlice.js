import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import authService from "./authService";

const initialState = {
  user: null, // | {id, username, name, token}
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
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("action :>> ", action);
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      console.log("action :>> ", action);
      state.error = action.payload;
    },
  },
});

export const { loadUser, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;

export const selectCurrentUser = createSelector(
  (state) => state.currentUser.user,
  (user) => user
);

export const selectErrorFromCurrentUser = createSelector(
  (state) => state.currentUser.error,
  (error) => error
);
