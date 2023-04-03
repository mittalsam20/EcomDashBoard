import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "AppComponents/Header/Header";
import DataGridCustomToolbar from "AppComponents/DataGridCustomToolbar/DataGridCustomToolbar";

const initialSearchParams = {
  page: 0,
  pageSize: 20,
  sort: {},
  search: "",
};

const Transactions = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const { page, pageSize, sort } = searchParams;
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    ...searchParams,
    sort: JSON.stringify(sort),
  });

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "products",
      headerName: "Number of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"TRANSACTIONS"} subtitle={"Entire List Of Transactions"} />
      <Box
        height={"80vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          rowsPerPageOptions={[20, 50, 100]}
          pageSize={pageSize}
          paginationMode={"server"}
          sortingMode={"server"}
          onPageChange={(newPage) =>
            setSearchParams((prevState) => ({ ...prevState, page: newPage }))
          }
          onPageSizeChange={(newPageSize) =>
            setSearchParams((prevState) => ({
              ...prevState,
              pageSize: newPageSize,
            }))
          }
          onSortModelChange={(newSortMode) =>
            setSearchParams((prevState) => ({
              ...prevState,
              sort: { ...newSortMode },
            }))
          }
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearchParams },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
