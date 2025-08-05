import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/products/productSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function ProductForm({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...form, price: parseFloat(form.price), rating: 4.5 }));
    setForm({ name: "", price: "", description: "", image: "" });
    if (onClose) onClose();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" mb={1}>Add New Product</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField label="Price" name="price" value={form.price} type="number" onChange={handleChange} required />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
        <TextField label="Image URL" name="image" value={form.image} onChange={handleChange} />
        <Button type="submit" variant="contained">Save</Button>
      </Box>
    </Paper>
  );
}
