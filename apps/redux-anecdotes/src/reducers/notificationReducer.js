import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotif(state, action) {
      return action.payload;
    },
    clearNotif(state) {
      return null;
    },
  },
});

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    try {
      const time = duration * 1000;
      dispatch(setNotif(message));
      setTimeout(() => {
        dispatch(clearNotif());
      }, time);
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setNotif, clearNotif } = notificationSlice.actions;
export default notificationSlice.reducer;
