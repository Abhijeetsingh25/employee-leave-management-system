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


const Employees = () => {

  const [employees, setEmployees] = useState([]);


  const fetchEmployees = async () => {

    try {

      const { data } = await api.get("/employees");

      setEmployees(data.employees || data);

    } catch(error) {

      console.log(error.response?.data);

    }

  };


  useEffect(()=>{

    fetchEmployees();

  },[]);



  return (

    <>

      <Typography variant="h4" mb={3}>
        Employees
      </Typography>


      <TableContainer component={Paper}>

        <Table>


          <TableHead>

            <TableRow>

              <TableCell>
                Employee ID
              </TableCell>

              <TableCell>
                Name
              </TableCell>

              <TableCell>
                Email
              </TableCell>

              <TableCell>
                Department
              </TableCell>

              <TableCell>
                Designation
              </TableCell>

            </TableRow>

          </TableHead>



          <TableBody>


          {
            employees.map((emp)=>(

              <TableRow key={emp._id}>


                <TableCell>
                  {emp.employeeId}
                </TableCell>


                <TableCell>
                  {emp.name}
                </TableCell>


                <TableCell>
                  {emp.email}
                </TableCell>


                <TableCell>
                  {emp.department}
                </TableCell>


                <TableCell>
                  {emp.designation}
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


export default Employees;