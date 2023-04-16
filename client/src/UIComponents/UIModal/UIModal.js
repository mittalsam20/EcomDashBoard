import React from "react";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

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
    onClickSecondaryButton = () => {},
    executeOnCLoseOnClickSecondaryButton = true,
  } = props;
  const theme = useTheme();

  const secondaryButtonAction = () => {
    onClickSecondaryButton();
    if (executeOnCLoseOnClickSecondaryButton) onClose();
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
      <DialogTitle style={{ borderBottom: "1px solid gray" }}>
        <Typography
          variant={"h3"}
          fontWeight={"bold"}
          color={theme.palette.secondary[300]}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent style={{ margin: "28px 0", padding: "0 28px" }}>
        {body}
      </DialogContent>
      <DialogActions style={{ borderTop: "1px solid gray" }}>
        <Button onClick={secondaryButtonAction}>{secondaryButtonText}</Button>
        <Button onClick={primaryButtonAction}>{primaryButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UIModal;
