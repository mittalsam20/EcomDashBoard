import React, { useState } from "react";
import {
  LightModeOutlined,
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LocalPrintshopOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
// import profileImage from "assets/profile.jpeg";
import {
  Box,
  AppBar,
  Button,
  Typography,
  IconButton,
  Toolbar,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import FlexBetween from "UIComponents/FlexBetween";
import { setMode } from "state";
import UIModal from "UIComponents/UIModal/UIModal";

const Navbar = (props) => {
  const [showPrintSpoolDialog, setShowPrintSpoolDialog] = useState(false);
  const { user, isSidebarOpen, setIsSidebarOpen } = props;
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
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
    <>
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
              }}
            >
              <MenuIcon />
            </IconButton>
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
        <UIModal
          body={"<div></div>"}
          primaryButtonText={"Print"}
          isOpen={showPrintSpoolDialog}
          secondaryButtonText={"Cancel"}
          onClickPrimaryButton={() => {}}
          onClickSecondaryButton={() => {}}
          onClose={() => setShowPrintSpoolDialog(false)}
          title={"Select the Customers whose address are to printed"}
        />
      </AppBar>
    </>
  );
};

export default Navbar;
