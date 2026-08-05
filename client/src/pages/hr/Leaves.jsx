import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import api from "../../api/axios";


const Leaves = () => {


  const [leaves,setLeaves] = useState([]);



  const fetchLeaves = async()=>{

    try{

      const {data} = await api.get("/leaves");

      setLeaves(data.leaves || data);

    }catch(error){

      console.log(error.response?.data);

    }

  };



  useEffect(()=>{

    fetchLeaves();

  },[]);



  const updateStatus = async(id,status)=>{


    try{


      await api.patch(
        `/leaves/${id}/status`,
        {
          status
        }
      );


      fetchLeaves();


    }catch(error){

      console.log(error.response?.data);

    }

  };




return (

<>

<Typography variant="h4" mb={3}>
 HR Leave Management
</Typography>


<TableContainer component={Paper}>


<Table>


<TableHead>

<TableRow>

<TableCell>
Employee
</TableCell>

<TableCell>
Leave Type
</TableCell>


<TableCell>
Start Date
</TableCell>


<TableCell>
End Date
</TableCell>


<TableCell>
Reason
</TableCell>


<TableCell>
Status
</TableCell>


<TableCell>
Action
</TableCell>


</TableRow>

</TableHead>



<TableBody>


{
leaves.map((leave)=>(


<TableRow key={leave._id}>


<TableCell>
{
leave.employee?.name
}
</TableCell>


<TableCell>
{
leave.leaveType
}
</TableCell>


<TableCell>
{
new Date(leave.startDate).toLocaleDateString()
}
</TableCell>


<TableCell>
{
new Date(leave.endDate).toLocaleDateString()
}
</TableCell>


<TableCell>
{
leave.reason
}
</TableCell>


<TableCell>
{
leave.status
}
</TableCell>



<TableCell>


{
leave.status==="Pending" && (

<>

<Button
color="success"
variant="contained"
size="small"
onClick={()=>updateStatus(leave._id,"Approved")}
>
Approve
</Button>


<Button
color="error"
variant="contained"
size="small"
sx={{ml:1}}
onClick={()=>updateStatus(leave._id,"Rejected")}
>
Reject
</Button>


</>

)

}


</TableCell>


</TableRow>


))

}


</TableBody>


</Table>


</TableContainer>


</>

);


};


export default Leaves;