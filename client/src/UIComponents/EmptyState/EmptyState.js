import React from "react";

import Typography from "@mui/material/Typography";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const EmptyState = (props) => {
  const { text = "No Results", icon = <SearchOffIcon /> } = props;
  return (
    <div>
      {icon}
      <Typography variant="h2" color="initial">
        {text}
      </Typography>
    </div>
  );
};

export default EmptyState;
