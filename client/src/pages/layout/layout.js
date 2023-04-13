import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
import Sidebar from "AppComponents/Sidebar/Sidebar";
import Navbar from "AppComponents/Navbar/Navbar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const rootUserId = useSelector((state) => state.global.rootUserId);
  const { data = {} } = useGetUserQuery(rootUserId);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={isNonMobile ? "flex" : "block"}
    >
      <Sidebar
        user={data}
        drawerWidth={"250px"}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div style={{ paddingBottom: "30px" }}>
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default Layout;
