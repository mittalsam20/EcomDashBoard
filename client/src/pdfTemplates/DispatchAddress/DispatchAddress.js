import React, { forwardRef } from "react";
import "./DispatchAddress.scss";

const AddressTemplate = (props) => {
  const {
    name,
    address,
    phoneNumber,
    shopName = null,
    isUserCustomer = true,
  } = props;
  const { street1, street2, city, state, country, pinCode } = address;
  const toOrFrom = isUserCustomer ? "To" : "From";

  return (
    <div className={"singleAddressContainer"}>
      <p>
        {`${toOrFrom}:- ${name}`}
        {shopName && `(${shopName})`}
      </p>
      <p>{`${street1}, ${street2}`}</p>
      <p>{`${city}, ${state}, ${country}, ${pinCode}`}</p>
      <p>{`Ph.No:- ${phoneNumber}`}</p>
    </div>
  );
};

const DispatchAddress = forwardRef((props, ref) => {
  const { customers } = props;
  const user = {
    userName: "Kalpana Mittal",
    shopName: "Kutch Ki Bandhani",
    // address:
    userAddress: {
      street1: "B-160",
      street2: "Apna Nagar",
      city: "Gandhidham",
      state: "Gujarat",
      country: "India",
      pinCode: "370201",
    },
    // phoneNumber:
    userPhoneNumber: "9979660860",
  };

  return (
    <div ref={ref} className={"pdfBody"}>
      {customers.map(({ _id, fullName, phoneNumber, address }, index) => {
        console.log(index % 2 !== 0);
        return (
          <div
            key={_id}
            className={"oneParcelSlipContainer"}
            style={
              index % 2 !== 0
                ? {
                    pageBreakAfter: "always",
                  }
                : {}
            }
          >
            <AddressTemplate
              name={fullName}
              address={address}
              phoneNumber={phoneNumber}
            />
            <AddressTemplate
              name={user.userName}
              shopName={user.shopName}
              address={user.userAddress}
              isUserCustomer={false}
              phoneNumber={user.userPhoneNumber}
            />
          </div>
        );
      })}
    </div>
  );
});

export default DispatchAddress;
