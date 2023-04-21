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

const getPageStyles = ({ index, totalLength }) => {
  const shouldPageBreak = index % 2 !== 0 && index + 1 !== totalLength;
  console.log(shouldPageBreak, index, totalLength);
  return shouldPageBreak ? { pageBreakAfter: "always" } : {};
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
  const totalCustomers = customers.length;

  return (
    <div ref={ref} className={"pdfBody"}>
      {customers.map(({ _id, fullName, phoneNumber, address }, index) => {
        const pageStyles = getPageStyles({
          index,
          totalLength: totalCustomers,
        });
        return (
          <div
            key={_id}
            style={pageStyles}
            className={"oneParcelSlipContainer"}
          >
            <img class="watermark" alt="store_logo" src="/kkb_FB_logo.jpg" />
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
