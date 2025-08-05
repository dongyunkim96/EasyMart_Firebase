import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, deleteAccount } from "../../features/auth/authSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", address: user?.address || "" });
  const [error, setError] = useState("");

  if (!user) return <Typography>Please log in.</Typography>;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile({ uid: user.uid, ...form })).unwrap();
      setEdit(false);
    } catch (err) {
      setError("Update failed.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete your account?")) {
      try {
        await dispatch(deleteAccount(user.uid)).unwrap();
      } catch {
        setError("Failed to delete account.");
      }
    }
  };

  return (
    <Box bgcolor="background.default" minHeight="100vh"  mx="auto" p={15}>
      <Typography variant="h5" mb={2}>Profile</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography>Email: {user.email}</Typography>
      {edit ? (
        <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth margin="normal" />
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>Save</Button>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
        </Box>
      ) : (
        <>
          <Typography>Name: {user.name}</Typography>
          <Typography>Address: {user.address}</Typography>
          <Button variant="outlined" onClick={() => setEdit(true)} sx={{ mt: 2, mr: 1 }}>Edit Profile</Button>
          <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mt: 2 }}>Delete Account</Button>
        </>
      )}
    </Box>
  );
}
