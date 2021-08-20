import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "../slices/blogsSlice";
import currentUserReducer from "../slices/currentUserSlice";
import notificationSlice from "../slices/notificationSlice";

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    currentUser: currentUserReducer,
    notification: notificationSlice,
  },
});
