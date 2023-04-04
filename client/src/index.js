import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/query";

import { SnackbarProvider, useSnackbar } from "notistack";

import "./index.css";
import App from "./App";
import { store } from "state/store";

setupListeners(store.dispatch);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
