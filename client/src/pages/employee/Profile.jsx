import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
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

    <Paper sx={{ p:3 }}>

      <Typography variant="h5" mb={3}>
        My Profile
      </Typography>

      <Grid container spacing={2}>

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
        sx={{ mt:3 }}
        onClick={updateProfile}
      >
        Update Profile
      </Button>

    </Paper>

  );

}

export default Profile;