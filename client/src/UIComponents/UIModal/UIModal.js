import React from "react";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const UIModal = (props) => {
  const {
    body,
    title,
    isOpen,
    onClose,
    primaryButtonText,
    secondaryButtonText,
    onClickPrimaryButton,
    onClickSecondaryButton,
  } = props;

  const secondaryButtonAction = () => {
    onClickSecondaryButton();
    onClose();
  };

  const primaryButtonAction = () => {
    onClickPrimaryButton();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      keepMounted
      TransitionComponent={Transition}
      onClose={onClickSecondaryButton}
    >
      <div>
        <DialogTitle style={{ borderBottom: "1px solid gray" }}>
          {title}
        </DialogTitle>
        <DialogContent>{body}</DialogContent>
        <DialogActions style={{ borderTop: "1px solid gray" }}>
          <Button onClick={secondaryButtonAction}>{secondaryButtonText}</Button>
          <Button onClick={primaryButtonAction}>{primaryButtonText}</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default UIModal;
