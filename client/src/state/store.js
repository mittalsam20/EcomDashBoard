import { configureStore } from "@reduxjs/toolkit";
import { api } from "./state/api";
import globalReducer from "./state/index";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
