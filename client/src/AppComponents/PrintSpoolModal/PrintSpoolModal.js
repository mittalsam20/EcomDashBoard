import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./PrintSpoolModal.scss";
import UIModal from "UIComponents/UIModal/UIModal";

import {
  emptyPrintSpool,
  getAllCustomers,
  updatePrintSpool,
} from "apiFunctions/apiFunctions";
import { Checkbox } from "@mui/material";

const ModalBody = (props) => {
  const { customers, isLoading, onClickPrintSpool } = props;

  const sortedCustomers = customers.sort(
    (a, b) => b.printSpoolItems.length - a.printSpoolItems.length
  );

  return isLoading ? (
    <>{"Loading..."}</>
  ) : (
    <div className={"modalBodyContainer"}>
      {sortedCustomers.map(
        ({ _id, fullName, printSpoolItems, address: { city, state } }) => {
          const checked = !!printSpoolItems.length;
          return (
            <div key={_id} className={"customerItemContainer"}>
              <div className="customerDetails">
                <p>{fullName}</p>
                <p>{`${city}/${state}`}</p>
              </div>
              <Checkbox
                size={"large"}
                checked={checked}
                onChange={onClickPrintSpool({ customerId: _id })}
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

  const onClickPrintSpool =
    ({ customerId }) =>
    async (event) => {
      setIsLoading(true);
      const value = event.target.checked;
      await updatePrintSpool({
        customerId,
        printItems: value ? ["ADDRESS"] : [],
      });
      fetchCustomers();
    };

  const generatePdf = async ({ customersAddress }) => {
    console.log(customersAddress);
  };

  const onClickPrimaryButton = async () => {
    const customersAddressToBePrinted = customers.filter(
      ({ printSpoolItems }) => printSpoolItems.length
    );
    const printedCustomersId = customersAddressToBePrinted.map(
      ({ _id }) => _id
    );
    generatePdf({ customersAddress: customersAddressToBePrinted });
    await emptyPrintSpool({ customerIds: printedCustomersId });
  };

  const onClose = () => {
    setShowPrintSpoolDialog(false);
  };

  return (
    <UIModal
      title={title}
      body={
        <ModalBody
          customers={customers}
          isLoading={isLoading}
          onClickPrintSpool={onClickPrintSpool}
        />
      }
      primaryButtonText={"Print"}
      isOpen={showPrintSpoolDialog}
      secondaryButtonText={"Cancel"}
      onClose={onClose}
      onClickPrimaryButton={onClickPrimaryButton}
    />
  );
};

export default PrintSpoolModal;
