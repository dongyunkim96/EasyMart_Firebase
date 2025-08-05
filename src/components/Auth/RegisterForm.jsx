import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "", address: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(form)).unwrap();
      navigate("/");
    } catch (err) {
      setError("Register failed. Email might be in use.");
    }
  };

  return (
    <Box bgcolor="background.default" minHeight="100vh" p={4} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
      <TextField label="Password" name="password" value={form.password} type="password" onChange={handleChange} fullWidth margin="normal" required />
      <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth margin="normal" />
      <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
}
