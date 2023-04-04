import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  TostMessage: null,
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToastMessage: ({ message, variant = "success", duration = 6000 }) => {},
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});
const globalReducer = globalSlice.reducer;

export const { setMode } = globalSlice.actions;
export default globalReducer;
