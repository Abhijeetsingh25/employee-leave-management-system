import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

import { toast } from "react-toastify";

import api from "../../api/axios";


const ChangePassword = () => {


  const navigate = useNavigate();


  const [formData,setFormData] = useState({

    currentPassword:"",
    newPassword:"",
    confirmPassword:"",

  });



  const handleChange = (e)=>{

    setFormData({

      ...formData,
      [e.target.name]:e.target.value

    });

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();



    if(formData.newPassword !== formData.confirmPassword){

      return toast.error(
        "New password and confirm password not match"
      );

    }



    try{


      await api.put("/auth/change-password",{

        currentPassword:formData.currentPassword,
        newPassword:formData.newPassword

      });



      toast.success(
        "Password changed successfully"
      );



      setFormData({

        currentPassword:"",
        newPassword:"",
        confirmPassword:""

      });



      await api.post("/auth/logout");


      setTimeout(()=>{

        navigate("/");

      },1500);



    }catch(error){

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
mt:5
}}
>


<Paper
sx={{
p:4,
width:400
}}
>


<Typography
variant="h5"
mb={3}
>
Change Password
</Typography>



<form onSubmit={handleSubmit}>


<TextField

fullWidth
label="Current Password"
type="password"
name="currentPassword"
value={formData.currentPassword}
onChange={handleChange}
margin="normal"

/>



<TextField

fullWidth
label="New Password"
type="password"
name="newPassword"
value={formData.newPassword}
onChange={handleChange}
margin="normal"

/>



<TextField

fullWidth
label="Confirm Password"
type="password"
name="confirmPassword"
value={formData.confirmPassword}
onChange={handleChange}
margin="normal"

/>



<Button

fullWidth
variant="contained"
type="submit"
sx={{mt:2}}

>
Change Password
</Button>


</form>


</Paper>


</Box>

);


};


export default ChangePassword;