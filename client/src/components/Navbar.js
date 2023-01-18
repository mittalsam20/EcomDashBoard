import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutline,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
// import profileImage from "assets/profile.jpeg";
import { AppBar, Toolbar, useTheme } from "@mui/material";

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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
