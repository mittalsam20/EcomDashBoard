import React, { useEffect } from "react";

import "./addTransaction.scss";
import UIModal from "UIComponents/UIModal/UIModal";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  updateTransaction,
  createTransaction,
} from "apiFunctions/apiFunctions";
import { useSelector } from "react-redux";

import moment from "moment";
import CustomDatePicker from "UIComponents/DatePicker/CustomDatePicker";

const commonInputProps = {
  // margin: "normal",
  required: true,
  fullWidth: true,
};

const getFormInputProps = ({ formattedCustomers, formData }) => {
  const { customer, orderAmount, paid, status, amountPaid, paymentMode, date } =
    formData;

  return [
    {
      id: "customer",
      type: "autoComplete",
      disablePortal: true,
      disableClearable: true,
      clearOnEscape: true,
      openOnFocus: true,
      autoSelect: true,
      value: customer,
      menuItems: formattedCustomers,
      placeholder: "Customer Name",
      label: "Customer Name",
      name: "customer",
      autoFocus: true,
      ...commonInputProps,
    },

    {
      id: "paymentMode",
      type: "dropdown",
      value: paymentMode,
      label: "Payment Mode",
      menuItems: [
        {
          id: "GPAY",
          value: "Gpay",
          menuOptionLabel: "Gpay",
        },
        {
          id: "PHONEPE",
          value: "Phonepe",
          menuOptionLabel: "Phonepe",
        },
        {
          id: "PAYTM",
          value: "Paytm",
          menuOptionLabel: "Paytm",
        },
        {
          id: "COD",
          value: "COD",
          menuOptionLabel: "COD",
        },
      ],
      ...commonInputProps,
    },
    {
      id: "orderAmount",
      type: "number",
      value: orderAmount,
      placeholder: "Order Amount",
      label: "Order Amount",
      name: "orderAmount",
      ...commonInputProps,
    },
    {
      id: "paid",
      type: "dropdown",
      value: paid,
      label: "Payment Status",
      disabled: paymentMode === "COD",
      menuItems: [
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
      ...commonInputProps,
    },
    {
      id: "amountPaid",
      type: "number",
      disabled: paymentMode === "COD" || paid !== "Partial",
      value: amountPaid,
      label: "Amount Paid",
      placeholder: "Amount Paid",
      name: "amountPaid",
      ...commonInputProps,
    },
    {
      id: "status",
      type: "dropdown",
      value: status,
      label: "Courier Status",
      menuItems: [
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
      ...commonInputProps,
    },
    {
      id: "date",
      type: "date",
      value: moment(date),
      label: "Date",
      ...commonInputProps,
    },
  ];
};

const ModalBody = (props) => {
  const { formInputProps, onChangeValue } = props;
  return (
    <div className={"bodyContainer"}>
      {formInputProps.map(
        ({ id, type, show = true, label, menuItems = [], ...restProps }) => {
          return (
            show && (
              <div key={id} className="inputContainer">
                {type === "dropdown" ? (
                  <>
                    <InputLabel>{label}</InputLabel>
                    <Select
                      label={label}
                      {...restProps}
                      onChange={onChangeValue({ id })}
                    >
                      {menuItems.map(({ id, menuOptionLabel, value }) => (
                        <MenuItem key={id} value={value}>
                          {menuOptionLabel}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : type === "autoComplete" ? (
                  <Autocomplete
                    {...restProps}
                    disablePortal
                    onChange={onChangeValue({ id })}
                    options={menuItems}
                    renderInput={(params) => (
                      <TextField {...params} label={label} />
                    )}
                  />
                ) : type === "date" ? (
                  <CustomDatePicker
                    label={label}
                    {...restProps}
                    onChange={onChangeValue({ id })}
                  />
                ) : (
                  <TextField
                    id={id}
                    type={type}
                    label={label}
                    {...restProps}
                    onChange={onChangeValue({ id })}
                  />
                )}
              </div>
            )
          );
        }
      )}
    </div>
  );
};

const AddTransaction = (props) => {
  const {
    formData,
    customers,
    setFormData,
    orderModalData,
    initialFormData,
    setOrderModalData,
    fetchTransactions,
  } = props;

  const { orderAmount, paid, amountPaid } = formData;

  const rootUserId = useSelector((state) => state.global.rootUserId);
  const { mode, OrderId = "" } = orderModalData;

  const formattedCustomers = customers.map(({ _id, fullName }) => ({
    id: _id,
    label: fullName,
  }));

  const title = mode === "create" ? "Add a new Order" : "Update Order";
  const primaryButtonText = mode === "create" ? "Add Order" : "Update Order";
  const formInputProps = getFormInputProps({ formattedCustomers, formData });
  const amountLeftToBePaid =
    !!Number(orderAmount) &&
    paid !== "Paid" &&
    orderAmount !== amountPaid &&
    `Amount left to be paid: ${orderAmount - amountPaid}`;

  useEffect(() => {}, [formData]);
  const onChangeValue =
    ({ id }) =>
    (event, valueProp) => {
      const value = event?.target?.value;
      let updatedState = { [id]: value };
      if (id === "customer") {
        updatedState = { [id]: valueProp.label };
      } else if (id === "paymentMode" && value === "COD") {
        updatedState = { ...updatedState, paid: "Not Paid", amountPaid: 0 };
      } else if (id === "paid") {
        if (value === "Paid")
          updatedState = { ...updatedState, amountPaid: orderAmount };
        else if (value === "Not Paid")
          updatedState = { ...updatedState, amountPaid: 0 };
      } else if (id === "date") {
        updatedState = { ...updatedState, [id]: event };
      }
      setFormData((prevState) => ({ ...prevState, ...updatedState }));
    };

  const onClickAddOrder = async () => {
    let customerIdBEParams = formattedCustomers.find(
      ({ label }) => label === formData.customer
    ).id;
    if (mode === "create") {
      await createTransaction({
        transactionDetails: {
          ...formData,
          customer: customerIdBEParams,
          userId: rootUserId,
        },
      });
      fetchTransactions();
      return;
    }
    await updateTransaction({
      transactionId: OrderId,
      updatedTransaction: { ...formData, customer: customerIdBEParams },
    });
    fetchTransactions();
  };

  const onClose = () => {
    setOrderModalData(null);
    setFormData(initialFormData);
  };

  return (
    <UIModal
      title={title}
      body={
        <ModalBody
          formData={formData}
          onChangeValue={onChangeValue}
          formInputProps={formInputProps}
        />
      }
      isOpen={!!orderModalData}
      secondaryButtonText={"Cancel"}
      primaryButtonText={primaryButtonText}
      onClose={onClose}
      onClickPrimaryButton={onClickAddOrder}
      footerLeftSubtitle={amountLeftToBePaid}
    />
  );
};

export default AddTransaction;
