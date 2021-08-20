import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "First Post!",
    author: "lin",
    url: "lin",
    likes: 3,
  },
  { id: "2", title: "Second Post", author: "lin", url: "lin", likes: 3 },
];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
});

export default blogsSlice.reducer;
