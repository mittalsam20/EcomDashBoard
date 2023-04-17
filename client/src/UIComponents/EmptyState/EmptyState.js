import React from "react";

import Typography from "@mui/material/Typography";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const EmptyState = (props) => {
  const { text, icon = <SearchOffIcon /> } = props;
  return (
    <div>
      {icon}
      <Typography variant="h2" color="initial">
        EmptyState
      </Typography>
    </div>
  );
};

export default EmptyState;
