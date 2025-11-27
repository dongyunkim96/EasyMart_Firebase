import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCount, clearCart } from "../features/cart/cartSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>Your Cart</Typography>
      {items.length === 0 ? (
        <Typography variant="h4" color="text.secondary" sx={{ textAlign: "center", mt: 10 }}>
          Your cart is empty!
        </Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} width={50} style={{ marginRight: 8 }} />
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={item.count}
                      onChange={e => dispatch(updateCount({ id: item.id, count: Number(e.target.value) }))}
                      inputProps={{ min: 1, style: { width: 40 } }}
                    />
                  </TableCell>
                  <TableCell>${(item.price * item.count).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}><b>Total</b></TableCell>
                <TableCell colSpan={2}><b>${total.toFixed(2)}</b></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
            <Button variant="outlined" color="error" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
            <Button variant="contained" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
          </Box>
        </>
      )}
    </Box>
  );
}
