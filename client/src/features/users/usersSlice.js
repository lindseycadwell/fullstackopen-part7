import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import usersService from "./usersService";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await usersService.getAll();
  return res;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { entities: [] },
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.entities = action.payload;
    },
  },
});

export default usersSlice.reducer;

export const selectUsers = (state) => state.users.entities;
