import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../features/orders/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Checkout() {
  const { items } = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Login to place order!");
      navigate("/login");
      return;
    }
    await dispatch(placeOrder({
      userId: user.uid,
      products: items,
      total,
      createdAt: new Date().toISOString()
    }));
    dispatch(clearCart());
    alert("Order placed!");
    navigate("/orders");
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" mb={2}>Checkout</Typography>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleCheckout} disabled={items.length === 0}>
        Place Order
      </Button>
    </Box>
  );
}
