import React from "react";

import {
  Box,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import "./FilterHeader.scss";
import SearchBar from "UIComponents/SearchBar/SearchBar";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getDropdownsComponent = ({ filterListWithOptionsData }) => {
  return filterListWithOptionsData.map(
    ({ id, type, label, menuItems, selectedValue, onChange }) => {
      // console.log(typeof selectedValue);
      switch (type) {
        case "dropdown": {
          return (
            <div key={id}>
              <InputLabel>{label}</InputLabel>
              <Select
                label={label}
                value={
                  typeof selectedValue === "string"
                    ? selectedValue
                    : JSON.stringify(selectedValue)
                }
                onChange={onChange}
              >
                {menuItems.map(({ id, menuOptionLabel, value }) => {
                  return (
                    <MenuItem
                      key={id}
                      value={
                        typeof value === "string"
                          ? value
                          : JSON.stringify(value)
                      }
                    >
                      {type === "dropdown" && menuOptionLabel}
                      {type === "checkListDropdown" && (
                        <>
                          <Checkbox checked={"personName.indexOf(name) > -1"} />
                          <ListItemText primary={menuOptionLabel} />
                        </>
                      )}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          );
        }
        case "checkListDropdown": {
          return (
            <div key={id}>
              <InputLabel>{label}</InputLabel>
              <Select
                multiple={true}
                value={selectedValue}
                MenuProps={MenuProps}
                onChange={onChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => selected.join(", ")}
              >
                {menuItems.map(({ id, value, menuOption }) => (
                  <MenuItem key={id} value={value}></MenuItem>
                ))}
              </Select>
            </div>
          );
        }
        default: {
          return null;
        }
      }
    }
  );
};

const FilterHeader = (props) => {
  const {
    updateFilters,
    selectedFilters,
    showSearchBar = true,
    filterListWithOptionsData,
  } = props;

  const handleFilters =
    ({ name }) =>
    (event) => {
      updateFilters({ [name]: event.key ?? event });
    };

  return (
    <Box className={"filterContainer"}>
      {showSearchBar && (
        <div className={"leftContainer"}>
          <SearchBar />
        </div>
      )}

      <div className={"rightContainer"}>
        {getDropdownsComponent({ filterListWithOptionsData })}
      </div>
    </Box>
  );
};

export default FilterHeader;
