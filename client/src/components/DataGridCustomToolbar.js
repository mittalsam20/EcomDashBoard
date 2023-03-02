import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = (props) => {
  const { searchInput, setSearchInput, setSearchParams } = props;
  return (
    <GridToolbarContainer>
      <FlexBetween width={"100%"}>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label={"Search..."}
          sx={{ mb: "0.5rem", width: "15rem" }}
          variant={"standard"}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          inputProps={{
            endadornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      search: searchInput,
                    }));
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
