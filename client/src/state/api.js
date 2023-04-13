import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants/constants";

const tagTypes = [
  "User",
  "Products",
  "Customers",
  "Transactions",
  "Geography",
  "Sales",
  "Dashboard",
];

const getEndpoints = (build) => {
  return {
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  };
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "api",
  tagTypes,
  endpoints: getEndpoints,
});

export const {
  useGetUserQuery,
  useGetSalesQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetDashboardQuery,
  useGetGeographyQuery,
  useGetTransactionsQuery,
} = api;
