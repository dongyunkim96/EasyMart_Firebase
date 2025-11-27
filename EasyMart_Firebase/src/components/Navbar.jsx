import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import EasyMartLogo from "./EasyMartLogo";

export default function Navbar({ darkMode, setDarkMode }) {
  const user = useSelector(state => state.auth.user);
  const cartCount = useSelector(state => state.cart.items.reduce((a, c) => a + c.count, 0));
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', mr: 2, textDecoration: 'none' }}>
          <EasyMartLogo size={36} />
        </Box>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/orders">Orders</Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={() => setDarkMode((prev) => !prev)} sx={{ mr: 2 }}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" onClick={() => dispatch(logoutUser())}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
        <IconButton color="inherit" component={Link} to="/cart" aria-label="Shopping cart">
          <Badge badgeContent={cartCount} color="primary" showZero>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
