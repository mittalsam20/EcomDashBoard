import { createSlice } from "@reduxjs/toolkit";

const initialCustomerFilters = {
  skip: 0,
  sortBy: { name: 1 },
  pageSize: 30,
  searchText: "",
  stateFilter: "ALL",
  statusFilter: "ALL",
};
const initialTransactionFilters = {
  skip: 0,
  sortBy: { name: 1 },
  pageSize: "",
  searchText: "",
  statusFilter: "ALL",
  // dateRangeFilter: {},
  modeOfPaymentFilter: "ALL",
};

const initialState = {
  mode: "dark",
  rootUserId: null,
  toastMessageProps: null,
  customerFilters: initialCustomerFilters,
  transactionFilters: initialTransactionFilters,
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
    setCustomerFilters: (state, action) => {
      const { name, value } = action.payload;
      state.customerFilters = { ...state.customerFilters, [name]: value };
    },
    setTransactionFilters: (state, action) => {
      const { name, value } = action.payload;
      state.transactionFilters = { ...state.transactionFilters, [name]: value };
    },
  },
});

const globalReducer = globalSlice.reducer;
export const {
  setMode,
  setRootUserId,
  setToastMessage,
  setCustomerFilters,
  setTransactionFilters,
} = globalSlice.actions;
export default globalReducer;
