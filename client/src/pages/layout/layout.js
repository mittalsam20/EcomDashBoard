import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import Navbar from "AppComponents/Navbar/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "AppComponents/Sidebar/Sidebar";

import { getCurrentPageRouteName } from "utils/helperFunctions";

const Layout = () => {
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const currentPage = getCurrentPageRouteName({ location });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDrawerItem, setActiveDrawerItem] = useState(currentPage);
  const rootUserId = useSelector((state) => state.global.rootUserId);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={isNonMobile ? "flex" : "block"}
    >
      <Sidebar
        user={{}}
        drawerWidth={"250px"}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        activeDrawerItem={activeDrawerItem}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveDrawerItem={setActiveDrawerItem}
      />
      <Box flexGrow={1}>
        <Navbar
          user={{}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeDrawerItem={activeDrawerItem}
        />
        <div style={{ padding: "1.5rem 2.5rem" }}>
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default Layout;
