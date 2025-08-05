import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setSnackbarOpen(true);
  };

  return (
    <>
      <Card sx={{
        width: 280,
        height: 440,
        margin: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 180,
            objectFit: 'contain',
            bgcolor: "#f7f7f7",
            p: 2
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            p: 2,
            minHeight: 140
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 60,
              maxHeight: 100,
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : ""}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
            ${product.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 36,
              maxHeight: 36,
            }}
          >
            {product.description}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
            <Rating value={product.rating || 4} readOnly size="small" precision={0.1} />
            <Typography variant="body2" sx={{ ml: 0.7 }}>
              {product.rating ? product.rating.toFixed(1) : "4.0"}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            fullWidth
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={800}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => setSnackbarOpen(false)}>
          <b>{product.name}</b> added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}
