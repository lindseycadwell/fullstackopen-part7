import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "notification initialized!",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
});

export default notificationSlice.reducer;
