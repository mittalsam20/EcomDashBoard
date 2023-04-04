import React, { useState } from "react";
import { Snackbar } from "@mui/material";

const ToastMessage = (props) => {
  const { text, variant } = props;
  const [open, setOpen] = useState(true);

  const handleClick = () => {};

  return (
    <Snackbar
      open={open}
      variant={""}
      onClose={(event, reason) => setOpen(false)}
    />
  );
};

export default ToastMessage;

// variant could be success, error, warning, info, or default
// `reason === 'escapeKeyDown'` if `Escape` was pressed
// call `event.preventDefault` to only close one Snackbar at a time.
