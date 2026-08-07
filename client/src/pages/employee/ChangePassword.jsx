
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";

import {
  Lock,
  Save,
} from "@mui/icons-material";

import toast from "react-hot-toast";

import api from "../../api/axios";


const ChangePassword = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    if(formData.newPassword !== formData.confirmPassword){

      return toast.error(
        "New password and confirm password not match"
      );

    }


    try {


      await api.put("/auth/change-password", {

        currentPassword: formData.currentPassword,

        newPassword: formData.newPassword,

      });



      toast.success(
        "Password changed successfully! Please login again."
      );
     
     const user = JSON.parse(localStorage.getItem("user"));

      user.isPasswordChanged = true;

     localStorage.setItem("user", JSON.stringify(user));

      setTimeout(async()=>{

        await api.post("/auth/logout");

        navigate("/");

      },2000);



    } catch(error){


      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );


    }


  };



  return (

    <Box

      sx={{

        display:"flex",

        justifyContent:"center",

        mt:6

      }}

    >


      <Paper

        sx={{

          width:{
            xs:"90%",
            sm:450
          },

          p:4,

          borderRadius:4,

          boxShadow:4

        }}

      >



        <Box

          display="flex"

          flexDirection="column"

          alignItems="center"

          mb={3}

        >


          <Avatar

            sx={{

              width:65,

              height:65,

              bgcolor:"#2563eb",

              mb:2

            }}

          >

            <Lock />

          </Avatar>



          <Typography

            variant="h5"

            fontWeight="700"

          >

            Change Password

          </Typography>



          <Typography

            color="text.secondary"

          >

            Keep your account secure

          </Typography>


        </Box>



        <Divider sx={{mb:3}} />



        <form onSubmit={handleSubmit}>


          <TextField

            fullWidth

            type="password"

            label="Current Password"

            name="currentPassword"

            value={formData.currentPassword}

            onChange={handleChange}

            margin="normal"

            autoComplete="current-password"

          />



          <TextField

            fullWidth

            type="password"

            label="New Password"

            name="newPassword"

            value={formData.newPassword}

            onChange={handleChange}

            margin="normal"

            autoComplete="new-password"

          />



          <TextField

            fullWidth

            type="password"

            label="Confirm Password"

            name="confirmPassword"

            value={formData.confirmPassword}

            onChange={handleChange}

            margin="normal"

            autoComplete="new-password"

          />



          <Button

            fullWidth

            variant="contained"

            type="submit"

            startIcon={<Save />}

            sx={{

              mt:3,

              py:1.3,

              borderRadius:3

            }}

          >

            Change Password

          </Button>



        </form>



      </Paper>


    </Box>


  );


};


export default ChangePassword;