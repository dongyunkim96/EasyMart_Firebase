import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchOrderDetail } from "../../features/orders/orderSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function OrderHistory() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { items, selected } = useSelector(state => state.orders);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) dispatch(fetchOrders(user.uid));
  }, [dispatch, user]);

  const handleOpen = (orderId) => {
    dispatch(fetchOrderDetail(orderId));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  if (!user) return <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4}}><Typography>Please log in to view orders.</Typography></Box>;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4}}>
      <Typography variant="h5" mb={3} fontWeight={700}>Order History</Typography>
      {items.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.createdAt?.split('T')[0]}</TableCell>
                  <TableCell>${order.total?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(order.id)} size="small" variant="outlined">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      {/* Order Detail Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selected ? (
            <>
              <Typography variant="subtitle1">Order ID: {selected.id}</Typography>
              <Typography variant="subtitle2" mb={2}>Date: {selected.createdAt?.split('T')[0]}</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selected.products.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>${p.price}</TableCell>
                      <TableCell>{p.count}</TableCell>
                      <TableCell>${(p.price * p.count).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3}><b>Total</b></TableCell>
                    <TableCell><b>${selected.total?.toFixed(2)}</b></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
