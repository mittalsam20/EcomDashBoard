import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";

const OverviewChart = (props) => {
  const { isDashboard = false, view } = props;
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery;

  const [totalSalesLine, totalUnitsLine] = useMemo(
    () => {
      if (!data) return [];
      const { monthlyData } = data;
      const totalSalesLine = {
        id: "totalSales",
        color: theme.palette.secondary.main,
        data: [],
      };
      const totalUnitsLine = {
        id: "totalSales",
        color: theme.palette.secondary[600],
        data: [],
      };

      Object.values(monthlyData).reduce(
        (acc, { month, totalSales, totalUnits }) => {
          const currentSales = acc.sales + totalSales;
          const currentUnits = acc.units + totalUnits;
          totalSalesLine.data = [
            ...totalSalesLine.data,
            { x: month, y: currentSales },
          ];
          totalUnitsLine.data = [
            ...totalUnitsLine.data,
            { x: month, y: currentUnits },
          ];
          return { sales: currentSales, units: currentUnits };
        },
        { sales: 0, units: 0 }
      );
    },
    { data }
  );

  return !data || isLoading ? <Box>{"Loading..."}</Box> : <Box></Box>;
};

export default OverviewChart;
