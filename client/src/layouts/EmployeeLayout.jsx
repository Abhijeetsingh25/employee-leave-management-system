
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeNavbar from "../components/employee/EmployeeNavbar";


function EmployeeLayout() {
 const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (
    user &&
    !user.isPasswordChanged &&
    location.pathname !== "/employee/change-password"
  ) {
    return <Navigate to="/employee/change-password" replace />;
  }
  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:"#f8fafc"
      }}
    >


      {/* Top Navbar */}

      <EmployeeNavbar />



      {/* Sidebar */}

      <EmployeeSidebar />



      {/* Main Content */}

      <Box

        component="main"

        sx={{

          flexGrow:1,

          p:{
            xs:2,
            md:3
          },

          width:{
            xs:"100%",
            md:`calc(100% - 260px)`
          }

        }}

      >


        {/* Navbar spacing */}

        <Toolbar />


        <Outlet />


      </Box>


    </Box>

  );

}


export default EmployeeLayout;