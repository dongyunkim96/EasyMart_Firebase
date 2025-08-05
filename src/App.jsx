import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import Profile from "./components/Auth/Profile";
import ProductList from "./components/Products/ProductList";
import OrderHistory from "./components/Orders/OrderHistory";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#FF9900",
      },
      secondary: {
        main: "#232f3e",
      },
      background: {
        default: darkMode ? "#181818" : "#f7f7f7",
        paper: darkMode ? "#232f3e" : "#fff",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            color: "#fff",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            color: "#fff",
          },
        },
      },
    },
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
        <ScrollToTopButton />
      </Router>
    </ThemeProvider>
  );
}
