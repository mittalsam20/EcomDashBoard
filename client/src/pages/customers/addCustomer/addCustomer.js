import React, { useState } from "react";

import "./addCustomer.scss";
import UIModal from "UIComponents/UIModal/UIModal";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";

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
      id: "country",
      type: "dropdown",
      value: country,
      label: "Country",
      ...commonInputProps,
    },
    {
      id: "pinCode",
      type: "number",
      value: pinCode,
      label: "PinCode",
      ...commonInputProps,
    },
    {
      id: "State",
      type: "dropdown",
      value: state,
      label: "State",
      ...commonInputProps,
    },
    {
      id: "city",
      type: "dropdown",
      value: city,
      label: "City",
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
  const { showAddCustomerModal, setShowAddCustomerModal } = props;
  const [formData, setFormData] = useState(initialFormData);

  const title = "Add a new customer";
  const formInputProps = getFormInputProps({ formData });

  const onChangeValue =
    ({ id }) =>
    (event) => {
      const value = event.target.value;
      if (addressFormIds.includes(id)) {
        setFormData((prevState) => ({
          ...prevState,
          address: { ...prevState.address, [id]: value },
        }));
        return;
      }
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

  const onClickPrimaryButton = () => {};

  const onClose = () => {
    setShowAddCustomerModal(false);
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
      isOpen={showAddCustomerModal}
      secondaryButtonText={"Cancel"}
      primaryButtonText={"Add Customer"}
      onClose={onClose}
      onClickPrimaryButton={onClickPrimaryButton}
    />
  );
};

export default AddCustomer;
