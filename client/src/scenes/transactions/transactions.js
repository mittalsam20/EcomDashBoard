import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetTransactionsQuery } from "state/api";

const initialSearchParams = {
  page: 0,
  pageSize: 20,
  sort: {},
  search: "",
};

const Transactions = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const { page, pageSize, sort, search } = searchParams;
  const { data, isLoading } = useGetTransactionsQuery({
    ...searchParams,
    sort: JSON.stringify(sort),
  });

  return <div>Transactions</div>;
};

export default Transactions;
