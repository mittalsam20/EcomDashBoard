import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const Header = (props) => {
  const { title, subtitle } = props;
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant={"h2"}
        sx={{ mb: "5px" }}
        fontWeight={"bold"}
        color={theme.palette.secondary[100]}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
