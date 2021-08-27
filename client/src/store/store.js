import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "../features/blogs/blogsSlice";
import usersReducer from "../features/users/usersSlice";
import currentUserReducer from "../features/auth/currentUserSlice";
import notificationSlice from "../features/notifications/notificationSlice";

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    currentUser: currentUserReducer,
    notification: notificationSlice,
  },
});
