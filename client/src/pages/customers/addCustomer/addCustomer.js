import React from "react";

import "./addCustomer.scss";
import UIModal from "../../../UIComponents/UIModal/UIModal";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {
  addNewCustomer,
  updateCustomer,
} from "../../../apiFunctions/apiFunctions";
import { useSelector } from "react-redux";

const commonInputProps = {
  // margin: "normal",
  required: true,
  fullWidth: true,
};

const getFormInputProps = ({ formData }) => {
  const { fullName, type, address, phoneNumber } = formData;
  const { pinCode, country, state, city, street1, street2 } = address;

  return [
    {
      id: "fullName",
      type: "text",
      value: fullName,
      placeholder: "Full Name",
      autoFocus: true,
      label: "Full Name",
      name: "fullName",
      ...commonInputProps,
    },
    {
      id: "phoneNumber",
      type: "text",
      value: phoneNumber,
      placeholder: "Phone Number",
      label: "Phone Number",
      name: "phoneNumber",
      ...commonInputProps,
    },
    {
      id: "type",
      type: "dropdown",
      value: type,
      label: "Customer Type",
      menuItems: [
        {
          id: "retail",
          menuOptionLabel: "Retail",
          value: "Retail",
        },
        {
          id: "reseller",
          menuOptionLabel: "Reseller",
          value: "Reseller",
        },
      ],
      ...commonInputProps,
    },
    {
      id: "pinCode",
      type: "text",
      value: pinCode,
      label: "PinCode",
      placeholder: "PinCode",
      name: "PinCode",
      ...commonInputProps,
    },
    {
      id: "country",
      type: "text",
      value: country,
      label: "Country",
      placeholder: "PinCode",
      name: "PinCode",
      ...commonInputProps,
    },
    {
      id: "state",
      type: "text",
      value: state,
      label: "State",
      placeholder: "PinCode",
      name: "PinCode",
      ...commonInputProps,
    },
    {
      id: "city",
      type: "text",
      value: city,
      label: "City",
      placeholder: "PinCode",
      name: "PinCode",
      ...commonInputProps,
    },
    {
      id: "street1",
      type: "text",
      value: street1,
      placeholder: "Street 1",
      label: "Street 1",
      name: "street1",
      ...commonInputProps,
    },
    {
      id: "street2",
      type: "text",
      value: street2,
      placeholder: "Street 2",
      label: "Street 2",
      name: "street2",
      ...commonInputProps,
    },
  ];
};

const ModalBody = (props) => {
  const { formInputProps, onChangeValue } = props;
  return (
    <div className={"bodyContainer"}>
      {formInputProps.map(
        ({ id, type, label, menuItems = [], ...restProps }) => {
          return (
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
          );
        }
      )}
    </div>
  );
};

const addressFormIds = [
  "pinCode",
  "country",
  "state",
  "city",
  "street1",
  "street2",
];

const AddCustomer = (props) => {
  const {
    formData,
    setFormData,
    initialFormData,
    customerModalData,
    setIsLoading,
    fetchCustomers,
    setCustomerModalData,
  } = props;
  const rootUserId = useSelector((state) => state.global.rootUserId);

  const { mode, customerId = "" } = customerModalData;
  const title = mode === "create" ? "Add a new customer" : "Update Customer";
  const primaryButtonText =
    mode === "create" ? "Add Customer" : "Update Customer";
  const formInputProps = getFormInputProps({ formData });

  const onChangeValue =
    ({ id }) =>
    (event) => {
      const value = event.target.value;
      if (addressFormIds.includes(id)) {
        // if (id === "pinCode" && value.length === 6) {
        //   const { country, state, city } = getAddressDetailsFromPinCode({
        //     pinCode: value,
        //   });
        //   setFormData((prevState) => ({
        //     ...prevState,
        //     address: {
        //       ...prevState.address,
        //       [id]: value,
        //       country,
        //       state,
        //       city,
        //     },
        //   }));
        //   return;
        // }
        setFormData((prevState) => ({
          ...prevState,
          address: { ...prevState.address, [id]: value },
        }));
        return;
      }
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

  const onClickPrimaryButton = async () => {
    setIsLoading(true);
    if (mode === "create") {
      await addNewCustomer({
        customerDetails: { ...formData, userId: rootUserId },
      });
      fetchCustomers();
      return;
    }
    await updateCustomer({ customerId, updatedCustomer: formData });
    fetchCustomers();
  };

  const onClose = () => {
    setCustomerModalData(null);
    setFormData(initialFormData);
  };

  return (
    <UIModal
      title={title}
      body={
        <ModalBody
          onChangeValue={onChangeValue}
          formInputProps={formInputProps}
        />
      }
      isOpen={!!customerModalData}
      secondaryButtonText={"Cancel"}
      primaryButtonText={primaryButtonText}
      onClose={onClose}
      onClickPrimaryButton={onClickPrimaryButton}
    />
  );
};

export default AddCustomer;
