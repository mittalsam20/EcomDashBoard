import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const CustomDatePicker = (props) => {
  const { label, value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker label={label} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
