import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  List,
  Drawer,
  Divider,
  useTheme,
  ListItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  ChevronLeft,
  HomeOutlined,
  TodayOutlined,
  PublicOutlined,
  Groups2Outlined,
  PieChartOutlined,
  SettingsOutlined,
  ReceiptLongOutlined,
  PointOfSaleOutlined,
  ShoppingCartOutlined,
  ChevronRightOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";

import FlexBetween from "../../UIComponents/FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    route: "/dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    route: "/Client Facing",
    icon: null,
  },
  {
    text: "Products",
    route: "/products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    route: "/customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    route: "/transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    route: "/geography",
    icon: <PublicOutlined />,
  },
  {
    text: "sales",
    route: "/sales",
    icon: null,
  },
  {
    text: "Overview",
    route: "/overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    route: "/daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    route: "/monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    route: "/breakdown",
    icon: <PieChartOutlined />,
  },
];

const Sidebar = (props) => {
  const {
    user,
    drawerWidth,
    isNonMobile,
    isSidebarOpen,
    setIsSidebarOpen,
    activeDrawerItem,
    setActiveDrawerItem,
  } = props;

  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box component={"nav"}>
      {isSidebarOpen && (
        <Drawer
          anchor={"left"}
          open={isSidebarOpen}
          variant={"persistent"}
          onClose={() => setIsSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width={"100%"}>
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box>
                  <Typography variant="h4" fontWeight={"bold"}>
                    {"ECOMVISION"}
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, route, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLocaleLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`.${route}`);
                        setActiveDrawerItem(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          activeDrawerItem === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          activeDrawerItem === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            activeDrawerItem === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {activeDrawerItem === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>
            <Divider />
            <FlexBetween
              gap={"1rem"}
              textTransform={"none"}
              m={"1.5rem 2rem 0 3rem"}
            >
              <Box
                alt="profile"
                width={"40px"}
                height={"40px"}
                // component={"img"}
                borderRadius={"50%"}
                // src={"profileImage"}
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign={"left"}>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"0.9rem"}
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize={"0.8rem"}
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
