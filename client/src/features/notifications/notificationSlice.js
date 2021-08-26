import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: null, // | String
  type: null, // | "success" | "failure"
};

/* const setNotifcation = createAsyncThunk(
  "notfication/setNotificationWithTimeout",
  (param, thunkAPI) => {}
);
 */
let nextNotificationId = 0;
export function setNotificationWithTimeout({ content, type }) {
  return function (dispatch) {
    const id = nextNotificationId++;
    dispatch(notificationSlice.actions.setNotification({ id, content, type }));

    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification({ id }));
    }, 3000);
  };
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.content = action.payload.content;
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    clearNotification: (state, action) => {
      console.log("state :>> ", state);
      console.log("action :>> ", action);
      if (state.id === action.payload.id) {
        state.content = null;
        state.type = null;
        state.id = null;
      }
    },
  },
});

//export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectNotificationContent = (state) => state.notification.content;

export const selectNotificationType = (state) => state.notification.type;
