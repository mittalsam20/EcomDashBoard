import React from "react";

import "./addTransaction.scss";
import UIModal from "UIComponents/UIModal/UIModal";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addNewCustomer, updateCustomer } from "apiFunctions/apiFunctions";
import { useSelector } from "react-redux";

const commonInputProps = {
  // margin: "normal",
  required: true,
  fullWidth: true,
};

const getFormInputProps = ({ customers, formData }) => {
  const {
    customer,
    orderAmount,
    paid,
    status,
    amountPaid,
    modeOfPayment,
    date,
  } = formData;

  //   renderInput={(params) => <TextField {...params} label="Movie" />}
  const formattedCustomers = customers.map(({ _id, fullName }) => ({
    id: _id,
    label: fullName,
  }));
  return [
    {
      id: "customer",
      type: "autoComplete",
      disablePortal: true,
      //   value: customer,
      menuItems: formattedCustomers,
      placeholder: "Customer Name",
      label: "Customer Name",
      name: "customer",
      autoFocus: true,
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
      id: "modeOfPayment",
      type: "dropdown",
      value: modeOfPayment,
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
      id: "amountPaid",
      type: "number",
      show: paid === "Partial",
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
      value: date,
      label: "Date",
      placeholder: "Date",
      name: "date",
      ...commonInputProps,
    },
  ];
};

const ModalBody = (props) => {
  const { formData, formInputProps, onChangeValue } = props;
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
                    options={menuItems}
                    onChange={(e) => console.log(e.target.value)}
                    renderInput={(params) => (
                      <TextField {...params} label={label} />
                    )}
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
    setFormData,
    customers,
    initialFormData,
    orderModalData,
    setOrderModalData,
  } = props;

  const { orderAmount, paid, amountPaid } = formData;

  const rootUserId = useSelector((state) => state.global.rootUserId);
  const { mode, OrderId = "" } = orderModalData;
  const title = mode === "create" ? "Add a new Order" : "Update Order";
  const primaryButtonText = mode === "create" ? "Add Order" : "Update Order";
  const formInputProps = getFormInputProps({ customers, formData });
  const amountLeftToBePaid =
    !!Number(orderAmount) &&
    paid !== "Paid" &&
    orderAmount !== amountPaid &&
    `Amount left to be paid: ${orderAmount - amountPaid}`;

  const onChangeValue =
    ({ id }) =>
    (event) => {
      const value = event.target.value;
      console.log(event, value);
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

  const onClickPrimaryButton = () => {
    if (mode === "create") {
      addNewCustomer({ customerDetails: { ...formData, userId: rootUserId } });
      return;
    }
    updateCustomer({ OrderId, updatedCustomer: formData });
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
      onClickPrimaryButton={onClickPrimaryButton}
      footerLeftSubtitle={amountLeftToBePaid}
    />
  );
};

export default AddTransaction;
