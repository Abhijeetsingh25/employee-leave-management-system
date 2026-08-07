// import { useEffect, useState } from "react";
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
// } from "@mui/material";

// import api from "../../api/axios";

// function Profile() {

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     department: "",
//     designation: "",
//   });

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {

//       const { data } = await api.get("/users/profile");

//       setForm(data.user);

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   const handleChange = (e) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });

//   };

//   const updateProfile = async () => {

//     try {

//       await api.put("/users/profile", form);

//       alert("Profile Updated Successfully");

//     } catch (error) {

//       alert(error.response?.data?.message);

//     }

//   };

//   return (

//     <Paper sx={{ p:3 }}>

//       <Typography variant="h5" mb={3}>
//         My Profile
//       </Typography>

//       <Grid container spacing={2}>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={form.name || ""}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Email"
//             value={form.email || ""}
//             disabled
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Phone"
//             name="phone"
//             value={form.phone || ""}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Department"
//             value={form.department || ""}
//             disabled
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Designation"
//             value={form.designation || ""}
//             disabled
//           />
//         </Grid>

//       </Grid>

//       <Button
//         variant="contained"
//         sx={{ mt:3 }}
//         onClick={updateProfile}
//       >
//         Update Profile
//       </Button>

//     </Paper>

//   );

// }

// export default Profile;
import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  Divider,
} from "@mui/material";

import {
  Save,
  Person,
} from "@mui/icons-material";

import api from "../../api/axios";


function Profile() {


const [form,setForm] = useState({

  name:"",
  email:"",
  phone:"",
  department:"",
  designation:"",

});




useEffect(()=>{

  loadProfile();

},[]);





const loadProfile = async()=>{

try{

const {data}= await api.get("/users/profile");

setForm(data.user);


}catch(error){

console.log(error);

}

};





const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};






const updateProfile=async()=>{


try{

await api.put("/users/profile",form);

alert("Profile Updated Successfully");


}catch(error){

alert(error.response?.data?.message);

}


};






return (


<Box>


<Paper

sx={{

p:4,

borderRadius:4

}}

>



{/* Profile Header */}

<Box

display="flex"

alignItems="center"

gap={3}

mb={3}

>


<Avatar

sx={{

width:80,

height:80,

fontSize:32,

background:"#2563eb"

}}

>

{form.name?.charAt(0)}

</Avatar>




<Box>

<Typography

variant="h4"

fontWeight="700"

>

{form.name}

</Typography>


<Typography

color="text.secondary"

>

Employee Profile

</Typography>


</Box>


</Box>




<Divider sx={{mb:3}} />





<Typography

variant="h6"

mb={2}

fontWeight="700"

>

Personal Information

</Typography>





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

startIcon={<Save/>}

sx={{

mt:4,

borderRadius:3,

px:4

}}

onClick={updateProfile}

>

Update Profile

</Button>




</Paper>


</Box>


);


}


export default Profile;