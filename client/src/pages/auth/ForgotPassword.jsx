import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (
  !/^\d{10}$/.test(emailOrPhone) &&
  !emailRegex.test(emailOrPhone)
) {
  return toast.error(
    "Please enter a valid Email or 10-digit Mobile Number"
  );
}

    try {
      setLoading(true);

      const { data } = await api.post("/auth/forgot-password", {
        emailOrPhone,
      });
      console.log(data);
      toast.success(data.message);
      setEmailOrPhone("");
   

setEmailOrPhone("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 420,
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          mb={2}
        >
          Forgot Password
        </Typography>

        <Typography
        variant="body2"
        color="text.secondary"
         mb={2}
        >
        Enter your registered email or mobile number.
        A password reset link will be sent to your registered email address.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email or Mobile Number"
            value={emailOrPhone}
            onChange={(e) =>
              setEmailOrPhone(e.target.value)
            }
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Sending Reset Link" : "Send Reset Link"}
          </Button>
        </form>

        <Typography
          textAlign="center"
          mt={2}
        >
          <Link to="/">
            Back to Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;