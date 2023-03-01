import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
  return <div>Geography</div>;
};

export default Geography;
