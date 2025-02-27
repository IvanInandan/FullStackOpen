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

export const { setNotif, clearNotif } = notificationSlice.actions;
export default notificationSlice.reducer;
