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
import { usePrint } from "HOC/generatePdf/GeneratePdf";
import DispatchAddress from "pdfTemplates/DispatchAddress/DispatchAddress";

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

  const onClose = () => {
    setShowPrintSpoolDialog(false);
  };

  const clearPrintSpool = async () => {
    const printedCustomersId = customers.reduce(
      (acc, { _id, printSpoolItems }) =>
        printSpoolItems.length ? [...acc, _id] : acc,
      []
    );
    await emptyPrintSpool({ customerIds: printedCustomersId });
    onClose();
  };

  const [PrintComponent, handlePrint] = usePrint(
    "Dispatch Address's",
    DispatchAddress,
    {
      customers: customers.filter(
        ({ printSpoolItems }) => printSpoolItems.length
      ),
    },
    clearPrintSpool
  );

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

  const onClickPrimaryButton = async () => {
    handlePrint();
  };

  return (
    <>
      <PrintComponent />
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
        executeOnCLoseOnClickPrimaryButton={false}
        onClickPrimaryButton={onClickPrimaryButton}
      />
    </>
  );
};

export default PrintSpoolModal;
