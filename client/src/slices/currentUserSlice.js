import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    id: "1",
    username: "initialuser",
    name: "initalnamez",
    token: "initialtokenblahblah",
  },
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
});

export default currentUserSlice.reducer;
