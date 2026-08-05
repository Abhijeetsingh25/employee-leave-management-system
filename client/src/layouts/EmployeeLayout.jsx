import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeNavbar from "../components/employee/EmployeeNavbar";

function EmployeeLayout() {

  return (

    <Box sx={{ display: "flex" }}>

      <EmployeeNavbar />

      <EmployeeSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >

        <Toolbar />

        <Outlet />

      </Box>

    </Box>

  );

}

export default EmployeeLayout;