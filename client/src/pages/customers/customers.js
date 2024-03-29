import React, { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { setCustomerFilters } from "../../state";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCustomer,
  getAllCustomers,
  updatePrintSpool,
} from "../../apiFunctions/apiFunctions";

import "./customers.scss";
import AddCustomer from "./addCustomer";
import CustomerCard from "./customerCard";

import withAuth from "../../HOC/withAuth";
import FilterHeader from "../../AppComponents/FIlterHeader.js";
import EmptyState from "../../UIComponents/EmptyState/EmptyState";

const getFilterListWithOptionsData = (props) => {
  const { selectedFilters, handleFilters, customers } = props;
  const statesMenuOptionObject = customers.reduce(
    (acc, { address: { state } }) => {
      const { statesArray, statesMenuOption } = acc;
      if (!statesArray.includes(state)) {
        acc.statesArray = [...statesArray, state];
        acc.statesMenuOption = [
          ...statesMenuOption,
          { id: state, value: state, menuOptionLabel: state },
        ];
      }
      return acc;
    },
    {
      statesArray: [],
      statesMenuOption: [{ id: "ALL", value: "ALL", menuOptionLabel: "ALL" }],
    }
  );
  return [
    {
      id: "SORT_BY",
      type: "dropdown",
      label: "Sort By",
      selectedValue: selectedFilters.sortBy,
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
          id: "NAME_ASC",
          value: { name: 1 },
          menuOptionLabel: "Name",
        },
        {
          id: "NAME_DSC",
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
      id: "STATE_FILTER",
      type: "dropdown",
      label: "State",
      selectedValue: selectedFilters.stateFilter,
      onChange: handleFilters({ name: "stateFilter" }),
      menuItems: statesMenuOptionObject.statesMenuOption,
    },
    {
      id: "STATUS_FILTER",
      type: "dropdown",
      label: "Status",
      selectedValue: selectedFilters.stateFilter,
      onChange: handleFilters({ name: "statusFilter" }),
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
          id: "NAME_ASC",
          value: { name: 1 },
          menuOptionLabel: "Name",
        },
        {
          id: "NAME_DSC",
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
  ];
};

const initialFormData = {
  fullName: "",
  type: "Retail",
  address: {
    pinCode: "",
    country: "India",
    state: "",
    city: "",
    street1: "",
    street2: "",
  },
  phoneNumber: "",
};

const Customers = () => {
  const dispatch = useDispatch();
  const customerFilters = useSelector((state) => state.global.customerFilters);
  const userId = useSelector((state) => state.global.rootUserId);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [customerModalData, setCustomerModalData] = useState(null);

  const fetchCustomers = async () => {
    const response = await getAllCustomers({ userId });
    setCustomers(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickNewCustomer = () => {
    setCustomerModalData({ mode: "create" });
  };

  const handleCustomerFilters =
    ({ name }) =>
    (event) => {
      const value = event.target.value;
      console.log(JSON.parse(value), value, JSON.stringify(value), "s");
      dispatch(setCustomerFilters({ name, value }));
    };

  const filterListWithOptionsData = getFilterListWithOptionsData({
    customers,
    selectedFilters: customerFilters,
    handleFilters: handleCustomerFilters,
  });

  const onClickDelete = async ({ customerId }) => {
    setIsLoading(true);
    await deleteCustomer({ customerId });
    fetchCustomers();
  };

  const onClickPrintSpool = async ({
    customerId,
    printItems = ["ADDRESS"],
  }) => {
    setIsLoading(true);
    await updatePrintSpool({ customerId, printItems });
    fetchCustomers();
  };

  return (
    <Box height={"75vh"}>
      <div className={"filterHeaderContainer"}>
        <FilterHeader filterListWithOptionsData={filterListWithOptionsData} />
        <Button
          variant={"contained"}
          color="success"
          size={"large"}
          startIcon={<AddRoundedIcon />}
          onClick={onClickNewCustomer}
        >
          {"New Customer"}
        </Button>
      </div>
      {isLoading ? (
        <>{"Loading...."}</>
      ) : customers.length ? (
        customers.map(
          ({
            _id,
            type,
            orders,
            address,
            fullName,
            customerId,
            phoneNumber,
            printSpoolItems,
            financialStatus = "",
          }) => {
            const isAddedToPrintSpool = printSpoolItems.length > 0;
            return (
              <CustomerCard
                id={_id}
                key={_id}
                type={type}
                orders={orders}
                address={address}
                fullName={fullName}
                customerId={customerId}
                phoneNumber={phoneNumber}
                financialStatus={financialStatus}
                setFormData={setFormData}
                onClickDelete={onClickDelete}
                onClickPrintSpool={onClickPrintSpool}
                isAddedToPrintSpool={isAddedToPrintSpool}
                setCustomerModalData={setCustomerModalData}
              />
            );
          }
        )
      ) : (
        <EmptyState />
      )}

      {customerModalData && (
        <AddCustomer
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialFormData}
          customerModalData={customerModalData}
          setIsLoading={setIsLoading}
          fetchCustomers={fetchCustomers}
          setCustomerModalData={setCustomerModalData}
        />
      )}
    </Box>
  );
};

export default withAuth(Customers);
