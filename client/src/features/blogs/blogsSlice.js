import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  nanoid,
} from "@reduxjs/toolkit";

import blogsService from "./blogsService";

const blogsAdapter = createEntityAdapter();

const initialState = blogsAdapter.getInitialState();

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await blogsService.getAll();
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

    const res = await blogsService.createOne(newBlog);
    console.log(res);
    return res;
  }
);

export const updateBlog = createAsyncThunk("blogs/updateBlog", async (blog) => {
  const res = await blogsService.updateOne(blog);
  console.log(res);
  return res;
});

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId) => {
    const res = await blogsService.deleteOne(blogId);
    console.log(res);
    return blogId;
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlogComment: {
      reducer: (state, action) => {
        const { blogId, comment } = action.payload;

        state.entities[blogId].comments
          ? state.entities[blogId].comments.push(comment)
          : (state.entities[blogId].comments = [comment]);
      },
      prepare({ blogId, comment }) {
        const { name, content } = comment;

        return {
          payload: {
            blogId,
            comment: {
              id: nanoid(),
              name,
              content,
            },
          },
        };
      },
    },
  },
  extraReducers: {
    [fetchBlogs.fulfilled]: blogsAdapter.setAll,
    [createBlog.fulfilled]: blogsAdapter.addOne,
    [updateBlog.fulfilled]: blogsAdapter.upsertOne,
    [deleteBlog.fulfilled]: blogsAdapter.removeOne,
  },
});

export const { addBlogComment } = blogsSlice.actions;

export default blogsSlice.reducer;

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
  // Pass in a selector that returns the posts slice of state
} = blogsAdapter.getSelectors((state) => state.blogs);
