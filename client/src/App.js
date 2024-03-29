import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { themeSettings } from "./constants/theme";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Login from "./pages/auth";
import Daily from "./pages/daily";
import Layout from "./pages/layout";
import Monthly from "./pages/monthly";
import Products from "./pages/products";
import Overview from "./pages/overview";
import Customer from "./pages/customer";
import Dashboard from "./pages/dashboard";
import Geography from "./pages/geography";
import Customers from "./pages/customers";
import BreakDown from "./pages/breakdown";
import Transactions from "./pages/transactions";
import ToastMessage from "./UIComponents/ToastMessage";

const App = () => {
  const { mode, toastMessageProps } = useSelector((state) => ({
    mode: state.global.mode,
    toastMessageProps: state.global.toastMessageProps,
  }));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      {toastMessageProps && <ToastMessage />}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />}>
                <Route path=":customerId" element={<Customer />} />
              </Route>
              <Route path="transactions" element={<Transactions />} />
              <Route path="geography" element={<Geography />} />
              <Route path="overview" element={<Overview />} />
              <Route path="daily" element={<Daily />} />
              <Route path="monthly" element={<Monthly />} />
              <Route path="breakdown" element={<BreakDown />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
