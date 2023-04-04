import React from "react";

import { Snackbar } from "@mui/material";

import { setToastMessage } from "state";
import { useDispatch, useSelector } from "react-redux";

const ToastMessage = () => {
  const toastMessage = useSelector((state) => state.global.toastMessage);
  const { message, duration, variant } = toastMessage;
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setToastMessage({ message: null }));
  };

  return (
    <Snackbar
      open={!!message}
      message={message}
      variant={variant}
      duration={duration}
      onClose={onClose}
    />
  );
};

export default ToastMessage;

// variant could be success, error, warning, info, or default
// `reason === 'escapeKeyDown'` if `Escape` was pressed
// call `event.preventDefault` to only close one Snackbar at a time.
