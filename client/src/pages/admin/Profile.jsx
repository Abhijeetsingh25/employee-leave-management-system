import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Box,
} from "@mui/material";

import api from "../../api/axios";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");
      setForm(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      await api.put("/users/profile", form);
      alert("Profile Updated Successfully");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 4,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={4}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            fontSize: 35,
            bgcolor: "primary.main",
            mb: 2,
          }}
        >
          {form.name?.charAt(0)}
        </Avatar>

        <Typography variant="h4" fontWeight="bold">
          Admin Profile
        </Typography>

        <Typography color="text.secondary">
          Update your account information
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            value={form.email || ""}
            disabled
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Department"
            value={form.department || ""}
            disabled
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Designation"
            value={form.designation || ""}
            disabled
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 4,
          borderRadius: 3,
          px: 5,
        }}
        onClick={updateProfile}
      >
        Update Profile
      </Button>
    </Paper>
  );
}

export default Profile;