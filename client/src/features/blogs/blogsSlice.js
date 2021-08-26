import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import blogService from "./blogService";

const blogsAdapter = createEntityAdapter();

const initialState = blogsAdapter.getInitialState();

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await blogService.getAll();
  return res;
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async ({ title, author, url }) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    const res = await blogService.createOne(newBlog);
    console.log(res);
    return res;
  }
);

export const updateBlog = createAsyncThunk("blogs/updateBlog", async (blog) => {
  const res = await blogService.updateOne(blog);
  console.log(res);
  return res;
});

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId) => {
    const res = await blogService.deleteOne(blogId);
    console.log(res);
    return res;
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBlogs.fulfilled]: blogsAdapter.setAll,
    [createBlog.fulfilled]: blogsAdapter.addOne,
    [updateBlog.fulfilled]: blogsAdapter.upsertOne,
    [deleteBlog.fulfilled]: blogsAdapter.deleteOne,
  },
});

export default blogsSlice.reducer;

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
  // Pass in a selector that returns the posts slice of state
} = blogsAdapter.getSelectors((state) => state.blogs);
