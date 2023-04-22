import React, { useState } from "react";
import {
  Box,
  // useTheme,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
// import Header from "AppComponents/Header/Header";
import OverviewChart from "../../UIComponents/OverviewChart/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");

  return (
    <Box m={"1.5rem 2.5rem"}>
      {/* <Header
        title={"OVERVIEW"}
        subtitle={"Overview of general revenue and profits"}
      /> */}
      <Box height={"75vh"}>
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>{"View"}</InputLabel>
          <Select
            value={view}
            label={"View"}
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value={"sales"}>{"Sales"}</MenuItem>
            <MenuItem value={"units"}>{"Units"}</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
