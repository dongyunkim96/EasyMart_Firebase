import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductCard from "./ProductCard";
import Button from "@mui/material/Button";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);
  const user = useSelector(state => state.auth.user);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: { xs: 1, md: 3 } }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Product List</Typography>
        {user && (
          <Button variant="contained" onClick={() => setShowAdd(v => !v)}>
            {showAdd ? "Cancel" : "Add Product"}
          </Button>
        )}
      </Box>
      {showAdd && <ProductForm onClose={() => setShowAdd(false)} />}
      <Grid container spacing={2}>
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
