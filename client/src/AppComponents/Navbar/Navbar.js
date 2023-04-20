import React, { useState } from "react";

import { setMode } from "state";
import { useDispatch } from "react-redux";

import {
  LightModeOutlined,
  Menu as MenuIcon,
  DarkModeOutlined,
  ArrowDropDownOutlined,
  LocalPrintshopOutlined,
} from "@mui/icons-material";
import {
  Box,
  Menu,
  AppBar,
  Button,
  Toolbar,
  useTheme,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
// import profileImage from "assets/profile.jpeg";

import FlexBetween from "UIComponents/FlexBetween";
import PrintSpoolModal from "AppComponents/PrintSpoolModal/PrintSpoolModal";

const Navbar = (props) => {
  const { activeDrawerItem, user, isSidebarOpen, setIsSidebarOpen } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPrintSpoolDialog, setShowPrintSpoolDialog] = useState(false);

  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTartget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickPrintSpool = () => {
    setShowPrintSpoolDialog(true);
  };

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT-SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={"h2"}
            fontWeight={"bold"}
            color={theme.palette.secondary[100]}
            style={{ textTransform: "capitalize", marginLeft: "8px" }}
          >
            {activeDrawerItem}
          </Typography>
        </FlexBetween>

        {/* RIGHT-SIDE */}
        <FlexBetween
          gap={"2rem"}
          p={"0.1rem 1rem"}
          borderRadius={"12px"}
          backgroundColor={theme.palette.background.alt}
        >
          <IconButton onClick={() => onClickPrintSpool()}>
            <LocalPrintshopOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
              }}
            >
              {/* <Box
                alt="profile"
                width={"40px"}
                height={"40px"}
                component={"img"}
                borderRadius={"50%"}
                // src={"../../assets/user-icon.png"}
                sx={{ objectFit: "cover" }}
              /> */}
              <Box textAlign={"left"}>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"0.85rem"}
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize={"0.75rem"}
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              open={isOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>{"Log Out"}</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
      {showPrintSpoolDialog && (
        <PrintSpoolModal
          showPrintSpoolDialog={showPrintSpoolDialog}
          setShowPrintSpoolDialog={setShowPrintSpoolDialog}
        />
      )}
    </AppBar>
  );
};

export default Navbar;
