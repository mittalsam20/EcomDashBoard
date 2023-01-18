import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutline,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Search,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
// import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT-SIDE */}
        <FlexBetween>
          <IconButton onClick={() => console.log("open side bar")}>
            <MenuIcon />
          </IconButton>

          <FlexBetween
            gap={"3rem"}
            p={"0.1rem 1.5rem"}
            borderRadius={"9px"}
            backgroundColor={theme.palette.background.alt}
          >
            <InputBase placeholder={"Search..."} />
            <IconButton aria-label="" onClick={() => {}}>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
