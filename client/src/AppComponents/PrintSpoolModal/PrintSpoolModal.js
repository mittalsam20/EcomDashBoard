import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./PrintSpoolModal.scss";
import usePrint from "../../Hooks/usePrint";
import UIModal from "../../UIComponents/UIModal";
import DispatchAddress from "../../pdfTemplates/DispatchAddress";

import {
  emptyPrintSpool,
  getAllCustomers,
  updatePrintSpool,
} from "../../apiFunctions/apiFunctions.js";
import { Checkbox } from "@mui/material";

const ModalBody = (props) => {
  const { customers, isLoading, onClickPrintSpool, PrintComponent } = props;
  const sortedCustomers = customers.sort(
    (a, b) => b.printSpoolItems.length - a.printSpoolItems.length
  );

  return isLoading ? (
    <div className={"modalBodyContainer"}>{"Loading..."}</div>
  ) : (
    <div className={"modalBodyContainer"}>
      <PrintComponent />
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

const onClose = ({ setShowPrintSpoolDialog }) => {
  setShowPrintSpoolDialog(false);
};

const clearPrintSpool = async ({ customers, setShowPrintSpoolDialog }) => {
  const printedCustomersId = customers.map(({ _id }) => _id);
  await emptyPrintSpool({ customerIds: printedCustomersId });
  onClose({ setShowPrintSpoolDialog });
};

const PrintSpoolModal = (props) => {
  const { showPrintSpoolDialog, setShowPrintSpoolDialog } = props;
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const customerToBePrinted = customers.filter(
    ({ printSpoolItems }) => printSpoolItems.length
  );

  const usePrintConfig = {
    documentTitle: "Dispatch Address's",
    ComponentToPrint: DispatchAddress,
    componentProps: { customers: customerToBePrinted },
    onAfterPrint: () => {
      clearPrintSpool({
        customers: customerToBePrinted,
        setShowPrintSpoolDialog,
      });
    },
  };

  const [PrintComponent, handlePrint] = usePrint(usePrintConfig);
  const userId = useSelector((state) => state.global.rootUserId);

  const title = "Select the Customers whose address are to be printed";

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
      <UIModal
        title={title}
        body={
          <ModalBody
            customers={customers}
            isLoading={isLoading}
            PrintComponent={PrintComponent}
            onClickPrintSpool={onClickPrintSpool}
          />
        }
        primaryButtonText={"Print"}
        isOpen={showPrintSpoolDialog}
        secondaryButtonText={"Cancel"}
        onClose={() => onClose({ setShowPrintSpoolDialog })}
        executeOnCLoseOnClickPrimaryButton={false}
        onClickPrimaryButton={onClickPrimaryButton}
      />
    </>
  );
};

export default PrintSpoolModal;
