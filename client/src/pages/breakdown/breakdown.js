import React from "react";
import { Box } from "@mui/material";
import Header from "AppComponents/Header";
import BreakDownChart from "UIComponents/BreakDownChart";

const BreakDown = () => {
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"BREAKDOWN"} subtitle={"Breakdown of sales by category"} />
      <Box mt={"40px"} height={"75vh"}>
        <BreakDownChart />
      </Box>
    </Box>
  );
};

export default BreakDown;
