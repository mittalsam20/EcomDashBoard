import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { setCustomerFilters } from "state";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCustomers,
  checkUserAuthenticity,
} from "apiFunctions/apiFunctions";

import "./customers.scss";
import AddCustomer from "./addCustomer";
import CustomerCard from "./customerCard";
import FilterHeader from "AppComponents/FIlterHeader.js";

const getFilterListWithOptionsData = (props) => {
  const { selectedFilters, handleFilters, customers } = props;
  const statesMenuOption = customers.map(
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
      statesMenuOption: [],
    }
  );
  // console.log(statesMenuOption);
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
    // {
    //   id: "STATE_FILTER",
    //   type: "dropdown",
    //   label: "State",
    //   selectedValue: selectedFilters.stateFilter,
    //   onChange: handleFilters({ name: "stateFilter" }),
    //   menuItems: statesMenuOption,
    // },
    // {
    //   id: "STATUS_FILTER",
    //   type: "dropdown",
    //   label: "Status",
    //   selectedValue: selectedFilters.stateFilter,
    //   onChange: handleFilters({ name: "statusFilter" }),
    //   menuItems: [
    //     {
    //       id: "SALES_AMOUNT_ASC",
    //       value: { totalValue: 1 },
    //       menuOptionLabel: "Sales Amount",
    //     },
    //     {
    //       id: "SALES_AMOUNT_DSC",
    //       value: { totalValue: -1 },
    //       menuOptionLabel: "Sales Amount",
    //     },
    //     {
    //       id: "NAME_ASC",
    //       value: { name: 1 },
    //       menuOptionLabel: "Name",
    //     },
    //     {
    //       id: "NAME_DSC",
    //       value: { name: -1 },
    //       menuOptionLabel: "Name",
    //     },
    //     {
    //       id: "LAST_ORDER_TIME",
    //       value: { lastOrderTime: 1 },
    //       menuOptionLabel: "Order Time",
    //     },
    //   ],
    // },
  ];
};

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerFilters = useSelector((state) => state.global.customerFilters);
  const userId = useSelector((state) => state.global.rootUserId);

  const [customers, setCustomers] = useState([]);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

  useLayoutEffect(() => {
    checkUserAuthenticity({ dispatch, navigate });
  }, []);

  useEffect(() => {
    getAllCustomers({ userId }).then((response) => {
      setCustomers(response);
    });
  }, []);

  const onClickNewCustomer = () => {
    setShowAddCustomerModal(true);
  };

  const handleCustomerFilters =
    ({ name }) =>
    (event) => {
      const value = event.target.value;
      console.log(JSON.parse(value), value, JSON.stringify(value), "s");
      dispatch(setCustomerFilters({ name, value }));
    };

  const filterListWithOptionsData = getFilterListWithOptionsData({
    customers: [],
    selectedFilters: customerFilters,
    handleFilters: handleCustomerFilters,
  });
  return (
    <Box mt={"40px"} height={"75vh"}>
      <div className={"filterHeaderContainer"}>
        <FilterHeader
          selectedFilters={customerFilters}
          updateFilters={setCustomerFilters}
          filterListWithOptionsData={filterListWithOptionsData}
        />
        <Button
          // fullWidth={true}
          variant={"contained"}
          color="success"
          size={"large"}
          startIcon={<AddRoundedIcon />}
          onClick={onClickNewCustomer}
        >
          {"New Customer"}
        </Button>
      </div>
      {customers.map(
        ({
          _id,
          type,
          orders,
          address,
          fullName,
          customerId,
          phoneNumber,
          financialStatus = "",
        }) => {
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
            />
          );
        }
      )}

      {showAddCustomerModal && (
        <AddCustomer
          showAddCustomerModal={showAddCustomerModal}
          setShowAddCustomerModal={setShowAddCustomerModal}
        />
      )}
    </Box>
  );
};

export default Customers;
