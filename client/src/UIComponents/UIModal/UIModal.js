import React from "react";

import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const getActionButtons = ({
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
}) => {
  return [
    {
      key: "SECONDARY_BUTTON",
      size: "large",
      color: "error",
      variant: "outlined",
      text: secondaryButtonText,
      onClick: secondaryButtonAction,
    },
    {
      key: "PRIMARY_BUTTON",
      size: "large",
      variant: "contained",
      text: primaryButtonText,
      onClick: primaryButtonAction,
    },
  ];
};

const UIModal = (props) => {
  const {
    body,
    title,
    isOpen,
    onClose,
    primaryButtonText,
    footerLeftSubtitle = null,
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

  const actionButtons = getActionButtons({
    primaryButtonText,
    secondaryButtonText,
    primaryButtonAction,
    secondaryButtonAction,
  });

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
      <DialogActions
        style={{
          display: "flex",
          padding: "20px",
          borderTop: "1px solid gray",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" color={theme.palette.secondary[100]}>
          {footerLeftSubtitle && footerLeftSubtitle}
        </Typography>
        <div style={{ display: "flex", gap: "20px" }}>
          {actionButtons.map(({ text, ...restProps }) => (
            <Button {...restProps}>{text}</Button>
          ))}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default UIModal;
