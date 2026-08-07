// import ApplyLeaveDialog from "../../components/employee/ApplyLeaveDialog";
// import { useEffect, useState } from "react";

// import {
//   Paper,
//   Typography,
//   Button,
//   Chip,
// } from "@mui/material";

// import { DataGrid } from "@mui/x-data-grid";

// import api from "../../api/axios";

// function MyLeaves() {

//   const [leaves, setLeaves] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     loadLeaves();
//   }, []);

//   const loadLeaves = async () => {
//     try {

//       const { data } = await api.get("/leaves/my-leaves");

//       setLeaves(data.leaves);

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   const cancelLeave = async (id) => {

//     try {

//       await api.patch(`/leaves/${id}/cancel`);

//       alert("Leave Cancelled");

//       loadLeaves();

//     } catch (error) {

//       alert(error.response?.data?.message);

//     }

//   };

//   const columns = [

//     {
//       field: "leaveType",
//       headerName: "Leave Type",
//       flex: 1,
//     },

//     {
//       field: "startDate",
//       headerName: "Start Date",
//       flex: 1,
//       valueGetter: (_, row) =>
//         new Date(row.startDate).toLocaleDateString(),
//     },

//     {
//       field: "endDate",
//       headerName: "End Date",
//       flex: 1,
//       valueGetter: (_, row) =>
//         new Date(row.endDate).toLocaleDateString(),
//     },

//     {
//       field: "days",
//       headerName: "Days",
//       flex: .6,
//     },

//     {
//       field: "status",
//       headerName: "Status",
//       flex: 1,

//       renderCell: (params) => (

//         <Chip
//           label={params.value}
//           color={
//             params.value === "Approved"
//               ? "success"
//               : params.value === "Rejected"
//               ? "error"
//               : "warning"
//           }
//         />

//       ),
//     },

//     {
//       field: "actions",
//       headerName: "Action",
//       flex: 1,

//       renderCell: (params) => (

//         params.row.status === "Pending" && (

//           <Button
//             color="error"
//             onClick={() =>
//               cancelLeave(params.row._id)
//             }
//           >
//             Cancel
//           </Button>

//         )

//       ),
//     },

//   ];

//   return (

//     <Paper sx={{ p:3 }}>

//       <Typography
//         variant="h5"
//         mb={2}
//       >
//         My Leaves
//       </Typography>

//       <Button
//   variant="contained"
//   sx={{ mb: 2 }}
//   onClick={() => setOpenDialog(true)}
// >
//   Apply Leave
// </Button>

//       <DataGrid
//         rows={leaves}
//         columns={columns}
//         getRowId={(row)=>row._id}
//         autoHeight
//         pageSizeOptions={[5,10]}
//       />
     
//      <ApplyLeaveDialog
//   open={openDialog}
//   handleClose={() => setOpenDialog(false)}
//   refresh={loadLeaves}
// />
//     </Paper>

//   );

// }

// export default MyLeaves;
import ApplyLeaveDialog from "../../components/employee/ApplyLeaveDialog";

import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
} from "@mui/material";

import {
  Add,
  PendingActions,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";


import { DataGrid } from "@mui/x-data-grid";

import api from "../../api/axios";



function MyLeaves(){


const [leaves,setLeaves]=useState([]);

const [openDialog,setOpenDialog]=useState(false);



useEffect(()=>{

loadLeaves();

},[]);





const loadLeaves=async()=>{

try{

const {data}=await api.get("/leaves/my-leaves");

setLeaves(data.leaves);


}catch(error){

console.log(error);

}

};






const cancelLeave=async(id)=>{


try{


await api.patch(`/leaves/${id}/cancel`);


alert("Leave Cancelled");


loadLeaves();



}catch(error){

alert(error.response?.data?.message);

}


};





const pending =
leaves.filter(
leave=>leave.status==="Pending"
).length;



const approved =
leaves.filter(
leave=>leave.status==="Approved"
).length;



const rejected =
leaves.filter(
leave=>leave.status==="Rejected"
).length;







const columns=[


{
field:"leaveType",
headerName:"Leave Type",
flex:1
},



{
field:"startDate",
headerName:"Start Date",
flex:1,

valueGetter:(_,row)=>
new Date(row.startDate)
.toLocaleDateString()

},



{
field:"endDate",
headerName:"End Date",
flex:1,

valueGetter:(_,row)=>
new Date(row.endDate)
.toLocaleDateString()

},



{
field:"days",
headerName:"Days",
flex:.5
},




{
field:"status",
headerName:"Status",
flex:1,

renderCell:(params)=>(

<Chip

label={params.value}

color={
params.value==="Approved"
?
"success"
:
params.value==="Rejected"
?
"error"
:
"warning"
}

/>

)

},





{
field:"actions",
headerName:"Action",
flex:1,


renderCell:(params)=>(

params.row.status==="Pending"

&&

<Button

variant="outlined"

color="error"

size="small"

startIcon={<Cancel/>}

onClick={()=>cancelLeave(params.row._id)}

>

Cancel

</Button>


)

}



];








return (

<Box>


{/* Header */}

<Paper

sx={{

p:3,

mb:3,

borderRadius:4,

background:
"linear-gradient(135deg,#1e3a8a,#2563eb)",

color:"white"

}}

>


<Typography

variant="h4"

fontWeight="700"

>

My Leaves

</Typography>


<Typography>

Manage your leave requests

</Typography>


</Paper>







{/* Summary Cards */}


<Grid container spacing={3} mb={3}>


<Grid item xs={12} md={4}>

<Paper

sx={{

p:3,

borderRadius:4

}}

>

<Typography color="text.secondary">

Pending

</Typography>


<Typography

variant="h3"

color="warning.main"

>

{pending}

</Typography>


</Paper>


</Grid>






<Grid item xs={12} md={4}>

<Paper

sx={{

p:3,

borderRadius:4

}}

>


<Typography color="text.secondary">

Approved

</Typography>


<Typography

variant="h3"

color="success.main"

>

{approved}

</Typography>


</Paper>


</Grid>







<Grid item xs={12} md={4}>

<Paper

sx={{

p:3,

borderRadius:4

}}

>


<Typography color="text.secondary">

Rejected

</Typography>


<Typography

variant="h3"

color="error.main"

>

{rejected}

</Typography>


</Paper>


</Grid>



</Grid>







{/* Table */}


<Paper

sx={{

p:2,

borderRadius:4

}}

>


<Box

display="flex"

justifyContent="space-between"

mb={2}

>


<Typography

variant="h6"

fontWeight="700"

>

Leave History

</Typography>



<Button

variant="contained"

startIcon={<Add/>}

onClick={()=>setOpenDialog(true)}

>

Apply Leave

</Button>


</Box>





<DataGrid

rows={leaves}

columns={columns}

getRowId={(row)=>row._id}

autoHeight


sx={{

border:0,

"& .MuiDataGrid-columnHeaders":{

fontWeight:"700"

}

}}


pageSizeOptions={[5,10]}

/>



</Paper>







<ApplyLeaveDialog

open={openDialog}

handleClose={()=>setOpenDialog(false)}

refresh={loadLeaves}

/>



</Box>

);


}


export default MyLeaves;