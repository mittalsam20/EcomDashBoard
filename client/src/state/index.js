import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  toastMessageProps: null,
  userId: "63701cc1f03239b7f700000e",
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
  },
});

const globalReducer = globalSlice.reducer;
export const { setMode, setToastMessage } = globalSlice.actions;
export default globalReducer;
