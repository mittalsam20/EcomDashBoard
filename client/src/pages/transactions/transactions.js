import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import "./transactions.scss";
import withAuth from "HOC/withAuth";
import { getDataGridCustomStyles } from "constants/constants";
import FilterHeader from "AppComponents/FIlterHeader.js/FilterHeader";
import DataGridCustomToolbar from "AppComponents/DataGridCustomToolbar";

import { setTransactionFilters } from "state";
import { useGetTransactionsQuery } from "state/api";
import { useDispatch, useSelector } from "react-redux";
import AddTransaction from "./addTransaction/addTransaction";
import { getAllCustomers, getAllTransactions } from "apiFunctions/apiFunctions";
import { getFormattedDate } from "utils/helperFunctions";

const getCellData =
  ({ columnName }) =>
  (params) => {
    const { id: transactionId, value, row } = params;
    const {
      fullName,
      phoneNumber,
      address: { city, state },
    } = row.customer;
    const { orderAmount, amountPaid } = row;

    console.log(columnName, params);
    switch (columnName) {
      case "orderNumber": {
        return <>{`#${value}`}</>;
      }
      case "date": {
        const formattedDate = getFormattedDate({ date: value });
        return <>{formattedDate}</>;
      }
      case "customerFullName": {
        return (
          <div>
            <p>{fullName}</p>
            <p>{phoneNumber}</p>
          </div>
        );
      }
      case "destination": {
        return <>{`${city}, ${state}`}</>;
      }
      case "orderAmount": {
        return <>{value}</>;
      }
      case "pendingAmount": {
        const pendingAmount = orderAmount - amountPaid;
        const notPaid = amountPaid == 0;
        console.log(notPaid, orderAmount, amountPaid);
        return pendingAmount ? (
          notPaid ? (
            <div>{"Cross"}</div>
          ) : (
            <>{pendingAmount}</>
          )
        ) : (
          <div>{"Tick"}</div>
        );
      }
      case "orderStatus": {
        return <>{value}</>;
      }
      case "products": {
        return <>{value.length}</>;
      }
      case "paymentMode": {
        return <>{value}</>;
      }
      default: {
        return <>{params.value}</>;
      }
    }
  };

const columns = [
  {
    field: "_id",
    headerName: "Order Number",
    flex: 1,
    renderCell: getCellData({ columnName: "orderNumber" }),
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    renderCell: getCellData({ columnName: "date" }),
  },
  {
    field: "customer",
    headerName: "Customer",
    flex: 1,
    renderCell: getCellData({ columnName: "customerFullName" }),
  },
  {
    field: "destination",
    headerName: "Destination",
    flex: 1,
    renderCell: getCellData({ columnName: "destination" }),
  },
  {
    field: "orderAmount",
    headerName: "Bill Amount",
    flex: 1,
    renderCell: getCellData({ columnName: "orderAmount" }),
  },
  {
    field: "amountPaid",
    headerName: "Pending Amount",
    flex: 1,
    renderCell: getCellData({ columnName: "pendingAmount" }),
  },
  {
    field: "status",
    headerName: "status",
    flex: 1,
    renderCell: getCellData({ columnName: "orderStatus" }),
  },

  {
    field: "products",
    headerName: "Number of Products",
    flex: 0.5,
    renderCell: getCellData({ columnName: "products" }),
  },
  {
    field: "paymentMode",
    headerName: "Payment Mode",
    flex: 0.5,
    renderCell: getCellData({ columnName: "paymentMode" }),
  },
];

// sortBy
// statusFilter
// isCompleted
// modeOfPaymentFilter
const getFilterListWithOptionsData = (props) => {
  const { selectedFilters, handleFilters, customers } = props;
  const { sortBy, paidFilter, statusFilter, isCompleted, modeOfPaymentFilter } =
    selectedFilters;

  return [
    {
      id: "SORT_BY",
      type: "dropdown",
      label: "Sort By",
      selectedValue: sortBy,
      onChange: handleFilters({ name: "sortBy" }),
      menuItems: [
        {
          id: "SALES_AMOUNT_ASC",
          value: { totalValue: 1 },
          menuOptionLabel: "Sales Amount",
        },
        {
          id: "SALES_AMOUNT_DSC",
          value: { totalValue: -1 },
          menuOptionLabel: "Sales Amount",
        },
        {
          id: "DATE_ASC",
          value: { name: 1 },
          menuOptionLabel: "Name",
        },
        {
          id: "DATE_DSC",
          value: { name: -1 },
          menuOptionLabel: "Name",
        },
        {
          id: "LAST_ORDER_TIME",
          value: { lastOrderTime: 1 },
          menuOptionLabel: "Order Time",
        },
      ],
    },
    {
      id: "PAID_FILTER",
      type: "dropdown",
      label: "Payment",
      selectedValue: paidFilter,
      onChange: handleFilters({ name: "paidFilter" }),
      menuItems: [
        {
          id: "ALL",
          value: "ALL",
          menuOptionLabel: "ALL",
        },
        {
          id: "PAID",
          value: "Paid",
          menuOptionLabel: "Paid",
        },
        {
          id: "NOT_PAID",
          value: "Not Paid",
          menuOptionLabel: "Not Paid",
        },
        {
          id: "PARTIAL",
          value: "Partial",
          menuOptionLabel: "Partial",
        },
      ],
    },
    {
      id: "STATUS_FILTER",
      type: "dropdown",
      label: "Status",
      selectedValue: statusFilter,
      onChange: handleFilters({ name: "statusFilter" }),
      menuItems: [
        {
          id: "ALL",
          value: "ALL",
          menuOptionLabel: "ALL",
        },
        {
          id: "ORDER_TAKEN",
          value: "Order Taken",
          menuOptionLabel: "Order Taken",
        },
        {
          id: "PACKED",
          value: "Packed",
          menuOptionLabel: "Packed",
        },
        {
          id: "DISPATCHED",
          value: "Dispatched",
          menuOptionLabel: "Dispatched",
        },
        {
          id: "DELIVERED",
          value: "Delivered",
          menuOptionLabel: "Delivered",
        },
      ],
    },
    {
      id: "IS_COMPLETED_FILTER",
      type: "dropdown",
      label: "State",
      selectedValue: isCompleted,
      onChange: handleFilters({ name: "isCompleted" }),
      menuItems: [
        {
          id: "ALL",
          value: "ALL",
          menuOptionLabel: "ALL",
        },
        {
          id: "PENDING",
          value: false,
          menuOptionLabel: "Pending",
        },
        {
          id: "COMPLETED",
          value: true,
          menuOptionLabel: "Completed",
        },
      ],
    },
  ];
};

const initialFormData = {
  customer: "",
  orderAmount: 0,
  paid: "Not Paid",
  status: "Order Taken",
  amountPaid: 0,
  paymentMode: "Gpay",
  date: new Date(),
};

const Transactions = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const transactionFilters = useSelector(
    (state) => state.global.transactionFilters
  );
  const userId = useSelector((state) => state.global.rootUserId);

  const { page, pageSize, sort } = transactionFilters;
  // const { data, isLoading } = useGetTransactionsQuery({
  //   ...transactionFilters,
  //   sort: JSON.stringify(sort),
  // });

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [orderModalData, setOrderModalData] = useState(null);

  useEffect(() => {
    getAllTransactions({ userId }).then((response) => {
      setTransactions(response);
    });
    getAllCustomers({ userId })
      .then((response) => {
        setCustomers(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDeleteIcon = ({ transactionId }) => {
    deleteTransaction({ transactionId });
  };

  const columns = getColumns({
    onClickEditIcon,
    onClickDeleteIcon,
  });

  const dataGridCustomStyles = getDataGridCustomStyles({ theme });
  const handleTransactionFilters =
    ({ name }) =>
    (event) => {
      const value = event.target.value;
      dispatch(setTransactionFilters({ name, value }));
    };

  // console.log(transactions);
  const filterListWithOptionsData = getFilterListWithOptionsData({
    transactions,
    selectedFilters: transactionFilters,
    handleFilters: handleTransactionFilters,
  });

  const onClickNewOrder = () => {
    setOrderModalData({ mode: "create" });
  };

  return (
    <Box>
      <div className={"filterHeaderContainer"}>
        <FilterHeader filterListWithOptionsData={filterListWithOptionsData} />
        <Button
          size={"large"}
          color={"success"}
          variant={"contained"}
          onClick={onClickNewOrder}
          startIcon={<AddRoundedIcon />}
        >
          {"New Order"}
        </Button>
      </div>

      <Box height={"80vh"} sx={dataGridCustomStyles}>
        <DataGrid
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading || !transactions}
          rows={(transactions && transactions) || []}
          rowCount={(transactions && transactions.length) || 0}

          // pagination
          // page={page}
          // pageSize={pageSize}
          // paginationMode={"server"}
          // rowsPerPageOptions={[20, 50, 100]}
          // onPageChange={handleTransactionFilters({ name: "page" })}
          //   (newPage)
          // onPageSizeChange={handleTransactionFilters({ name: "pageSize" })}
          // sortingMode={"server"}
          // onSortModelChange={handleTransactionFilters({ name: "sortBy" })}
          // components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>

      {orderModalData && (
        <AddTransaction
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialFormData}
          orderModalData={orderModalData}
          customers={customers}
          setOrderModalData={setOrderModalData}
        />
      )}
    </Box>
  );
};

export default withAuth(Transactions);
