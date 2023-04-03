import React from "react";

import { useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";

import FlexBetween from "UIComponents/FlexBetween";

const SearchBar = (props) => {
  const { theme } = props;
  return (
    <FlexBetween
      gap={"3rem"}
      p={"0.1rem 1.5rem"}
      borderRadius={"9px"}
      backgroundColor={theme.palette.background.alt}
    >
      <InputBase placeholder={"Search..."} />
      <IconButton onClick={() => {}}>
        <Search />
      </IconButton>
    </FlexBetween>
  );
};

const FilterHeader = (props) => {
  const {} = props;

  return <div></div>;
};

export default FilterHeader;
