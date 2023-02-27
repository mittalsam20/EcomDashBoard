import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutline,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Search,
  DarkModeOutlined,
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

const Navbar = (props) => {
  const { isSidebarOpen, setIsSidebarOpen } = props;
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
          <IconButton
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              console.log(isSidebarOpen);
            }}
          >
            <MenuIcon />
          </IconButton>

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
        </FlexBetween>

        {/* RIGHT-SIDE */}
        <FlexBetween
          gap={"3rem"}
          p={"0.1rem 1.5rem"}
          borderRadius={"9px"}
          backgroundColor={theme.palette.background.alt}
        >
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => {}}>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
