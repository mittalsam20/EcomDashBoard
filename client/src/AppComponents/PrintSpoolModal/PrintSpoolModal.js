import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./PrintSpoolModal.scss";
import UIModal from "UIComponents/UIModal/UIModal";

import { getAllCustomers } from "apiFunctions/apiFunctions";
import { Checkbox } from "@mui/material";

const ModalBody = (props) => {
  const { customers, isLoading } = props;

  const sortedCustomers = customers.sort(
    (a, b) => a.colors.length - b.colors.length
  );

  return isLoading ? (
    <>{"Loading..."}</>
  ) : (
    <div className={"modalBodyContainer"}>
      {sortedCustomers.map(
        ({ _id, fullName, printSpoolItems, address: { city, state } }) => {
          return (
            <div key={_id} className={"customerItemContainer"}>
              <div className="customerDetails">
                <p>{fullName}</p>
                <p>{`${city}/${state}`}</p>
              </div>
              <Checkbox
                size={"large"}
                checked={true}
                // onChange={handleChange}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

const PrintSpoolModal = (props) => {
  const { showPrintSpoolDialog, setShowPrintSpoolDialog } = props;
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const title = "Select the Customers whose address are to be printed";
  const userId = useSelector((state) => state.global.rootUserId);

  const fetchCustomers = async () => {
    const response = await getAllCustomers({ userId });
    setCustomers(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onClickPrimaryButton = () => {};

  const onClose = () => {
    setShowPrintSpoolDialog(false);
  };

  return (
    <UIModal
      title={title}
      body={<ModalBody customers={customers} isLoading={isLoading} />}
      primaryButtonText={"Print"}
      isOpen={showPrintSpoolDialog}
      secondaryButtonText={"Cancel"}
      onClose={onClose}
      onClickPrimaryButton={onClickPrimaryButton}
    />
  );
};

export default PrintSpoolModal;
