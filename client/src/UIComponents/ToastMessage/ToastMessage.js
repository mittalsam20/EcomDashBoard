import React from "react";

import MuiAlert from "@mui/material/Alert";
import { Slide, Snackbar } from "@mui/material";

import { setToastMessage } from "state";
import { useDispatch, useSelector } from "react-redux";

const SlideTransition = (props) => {
  return <Slide {...props} direction={"left"} />;
};

const ToastMessage = () => {
  const dispatch = useDispatch();
  const toastMessageProps = useSelector(
    (state) => state.global.toastMessageProps
  );
  const { message, duration, severity } = toastMessageProps;

  const onClose = () => {
    dispatch(setToastMessage({ message: null }));
  };

  return (
    <Snackbar
      onClose={onClose}
      open={!!toastMessageProps}
      autoHideDuration={duration}
      TransitionComponent={SlideTransition}
    >
      <MuiAlert
        onClose={onClose}
        variant={"filled"}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ToastMessage;

//Severity Types
// error
// warning
// info
// success
// `reason === 'escapeKeyDown'` if `Escape` was pressed
// call `event.preventDefault` to only close one Snackbar at a time.
