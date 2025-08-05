import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "calc(100vh - 64px)", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", 
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h3" fontWeight={700} mb={2}>
        🛒✨ Hey there, welcome to EasyMart! Let’s make shopping simple and exciting.
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Enjoy the easiest way to shop for your favorite products, track orders, and more – all in one place!
      </Typography>
    </Box>
  );
}
