import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  rootUserId: null,
  toastMessageProps: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToastMessage: (state, action) => {
      const { message, severity = "success", duration = 6000 } = action.payload;
      state.toastMessageProps = message
        ? { message, severity, duration }
        : null;
    },
    setMode: (state, action) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setRootUserId: (state, action) => {
      const { rootUserId } = action.payload;
      state.rootUserId = rootUserId;
    },
  },
});

const globalReducer = globalSlice.reducer;
export const { setMode, setRootUserId, setToastMessage } = globalSlice.actions;
export default globalReducer;
