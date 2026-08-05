import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { loginSuccess } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      dispatch(loginSuccess(data.user));

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "hr") {
        navigate("/hr/dashboard");
      }else if(user.role === "employee"){
        navigate("/employee/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>

            <Typography
              variant="h4"
              align="center"
              gutterBottom
            >
              Employee Leave Management
            </Typography>

            <form onSubmit={handleSubmit}>

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? "Please Wait..." : "Login"}
              </Button>

            </form>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;