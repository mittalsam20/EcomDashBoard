import UIModal from "UIComponents/UIModal/UIModal";
import React from "react";

const PrintSpoolModal = (props) => {
  const { showPrintSpoolDialog, setShowPrintSpoolDialog } = props;
  return (
    <UIModal
      body={"<div></div>"}
      primaryButtonText={"Print"}
      isOpen={showPrintSpoolDialog}
      secondaryButtonText={"Cancel"}
      onClickPrimaryButton={() => {}}
      onClickSecondaryButton={() => {}}
      onClose={() => setShowPrintSpoolDialog(false)}
      title={"Select the Customers whose address are to printed"}
    />
  );
};

export default PrintSpoolModal;
