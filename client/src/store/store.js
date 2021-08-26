import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "../features/blogs/blogsSlice";
import currentUserReducer from "../features/auth/currentUserSlice";
import notificationSlice from "../features/notifications/notificationSlice";

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    currentUser: currentUserReducer,
    notification: notificationSlice,
  },
});
