import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import "./transactions.scss";
import withAuth from "HOC/withAuth";
import { getDataGridCustomStyles } from "../../constants/constants";
import FilterHeader from "../../AppComponents/FIlterHeader.js/FilterHeader";
// import DataGridCustomToolbar from "AppComponents/DataGridCustomToolbar";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { setTransactionFilters } from "../../state";
// import { useGetTransactionsQuery } from "state/api";
import { useDispatch, useSelector } from "react-redux";
import AddTransaction from "./addTransaction/addTransaction";
import {
  getAllCustomers,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "../../apiFunctions/apiFunctions";
import { getFormattedDate } from "../../utils/helperFunctions";

const statusMenuItems = [
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
    // menuOptionLabel: <CheckRoundedIcon />,
  },
];

const getCellData =
  ({ columnName, onClickDeleteIcon, onClickEditIcon, onChangeOrderStatus }) =>
  (params) => {
    const { id: transactionId, value, row } = params;
    const {
      fullName,
      phoneNumber,
      address: { city, state },
    } = row.customer;
    const { orderAmount, amountPaid } = row;
    switch (columnName) {
      case "orderNumber": {
        return <>{`#${111}`}</>;
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
        return (
          <div>
            <p>{city}</p>
            <p>{state}</p>
          </div>
        );
      }
      case "orderAmount": {
        return <>{value}</>;
      }
      case "pendingAmount": {
        const pendingAmount = orderAmount - amountPaid;
        const notPaid = amountPaid === 0;
        return pendingAmount ? (
          notPaid ? (
            <ClearRoundedIcon color={"error"} fontSize={"large"} />
          ) : (
            <>{pendingAmount}</>
          )
        ) : (
          <CheckRoundedIcon color={"success"} fontSize={"large"} />
        );
      }
      case "orderStatus": {
        return value === "Deivered" ? (
          <CheckRoundedIcon color={"success"} fontSize={"large"} />
        ) : (
          <Select
            value={value}
            sx={{ height: "80%", width: "80%" }}
            onChange={onChangeOrderStatus({ orderDetails: row })}
          >
            {statusMenuItems.map(({ id, menuOptionLabel, value }) => {
              return (
                <MenuItem key={id} value={value}>
                  {menuOptionLabel}
                </MenuItem>
              );
            })}
          </Select>
        );
      }
      case "products": {
        return <>{value.length}</>;
      }
      case "paymentMode": {
        return <>{value}</>;
      }
      case "actions": {
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            <IconButton onClick={() => onClickEditIcon({ transactionId })}>
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              color={"error"}
              onClick={() => onClickDeleteIcon({ transactionId })}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        );
      }
      default: {
        return <>{params.value}</>;
      }
    }
  };

const getColumns = ({
  onClickDeleteIcon,
  onClickEditIcon,
  onChangeOrderStatus,
}) => {
  return [
    {
      field: "_id",
      headerName: "#Order",
      flex: 0.5,
      renderCell: getCellData({ columnName: "orderNumber" }),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.4,
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
      flex: 0.8,
      renderCell: getCellData({ columnName: "destination" }),
    },
    {
      field: "orderAmount",
      headerName: "Bill Amount",
      flex: 0.5,
      renderCell: getCellData({ columnName: "orderAmount" }),
    },
    {
      field: "amountPaid",
      headerName: "Pending Amount",
      flex: 0.5,
      renderCell: getCellData({ columnName: "pendingAmount" }),
    },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      renderCell: getCellData({
        columnName: "orderStatus",
        onChangeOrderStatus,
      }),
    },

    {
      field: "products",
      headerName: "No. of Products",
      flex: 0.5,
      renderCell: getCellData({ columnName: "products" }),
    },
    {
      field: "paymentMode",
      headerName: "Payment Mode",
      flex: 0.5,
      renderCell: getCellData({ columnName: "paymentMode" }),
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.5,
      renderCell: getCellData({
        columnName: "actions",
        onClickDeleteIcon,
        onClickEditIcon,
      }),
    },
  ];
};

// sortBy
// statusFilter
// isCompleted
// modeOfPaymentFilter
const getFilterListWithOptionsData = ({
  transactions,
  handleFilters,
  selectedFilters,
}) => {
  // modeOfPaymentFilter
  const { sortBy, paidFilter, statusFilter, isCompleted } = selectedFilters;

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

  // const { page, pageSize, sort } = transactionFilters;
  // const { data, isLoading } = useGetTransactionsQuery({
  //   ...transactionFilters,
  //   sort: JSON.stringify(sort),
  // });

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [orderModalData, setOrderModalData] = useState(null);

  const fetchTransactions = () => {
    getAllTransactions({ userId }).then((response) => {
      setTransactions(response);
    });
  };

  useEffect(() => {
    fetchTransactions();
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

  const onClickDeleteIcon = async ({ transactionId }) => {
    await deleteTransaction({ transactionId });
    console.log("ssss");
    fetchTransactions();
  };

  const onClickEditIcon = ({ transactionId }) => {
    const selectedTransaction = transactions.find(
      ({ _id }) => _id === transactionId
    );
    const {
      paid,
      date,
      status,
      customer,
      amountPaid,
      paymentMode,
      orderAmount,
    } = selectedTransaction;

    setFormData({
      paid,
      date,
      status,
      amountPaid,
      orderAmount,
      paymentMode,
      customer: customer.fullName,
    });
    setOrderModalData({ mode: "edit", OrderId: transactionId });
  };

  const onChangeOrderStatus =
    ({ orderDetails }) =>
    async (event) => {
      const updatedStatusValue = event.target.value;
      const { _id: selectedOrderId } = orderDetails;
      const selectedTransaction = transactions.find(
        ({ _id }) => _id === selectedOrderId
      );
      const updatedTransaction = {
        ...selectedTransaction,
        status: updatedStatusValue,
      };
      await updateTransaction({
        transactionId: selectedOrderId,
        updatedTransaction,
      });
      fetchTransactions();
    };

  const columns = getColumns({
    onClickEditIcon,
    onClickDeleteIcon,
    onChangeOrderStatus,
  });

  const dataGridCustomStyles = getDataGridCustomStyles({ theme });
  const handleTransactionFilters =
    ({ name }) =>
    (event) => {
      const value = event.target.value;
      dispatch(setTransactionFilters({ name, value }));
    };

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

      <Box height={"75vh"} sx={dataGridCustomStyles}>
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
          fetchTransactions={fetchTransactions}
          setOrderModalData={setOrderModalData}
        />
      )}
    </Box>
  );
};

export default withAuth(Transactions);
