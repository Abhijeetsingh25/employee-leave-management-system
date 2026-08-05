import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import api from "../../api/axios";


const Attendance = () => {

  const [attendance, setAttendance] = useState([]);



  const fetchAttendance = async () => {

    try {

      const { data } = await api.get("/attendance");

      setAttendance(data.attendance || data);

    } catch(error) {

      console.log(error.response?.data);

    }

  };



  useEffect(()=>{

    fetchAttendance();

  },[]);



  return (

    <>

      <Typography variant="h4" mb={3}>
        HR Attendance
      </Typography>


      <TableContainer component={Paper}>

        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                Employee
              </TableCell>


              <TableCell>
                Date
              </TableCell>


              <TableCell>
                Status
              </TableCell>


            </TableRow>

          </TableHead>



          <TableBody>


          {
            attendance.map((item)=>(

              <TableRow key={item._id}>


                <TableCell>
                  {
                    item.employee?.name
                  }
                </TableCell>


                <TableCell>

                  {
                    new Date(item.date)
                    .toLocaleDateString()
                  }

                </TableCell>


                <TableCell>

                  {
                    item.status
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


export default Attendance;