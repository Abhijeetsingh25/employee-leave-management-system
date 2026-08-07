// import { Box, Toolbar } from "@mui/material";
// import { Outlet } from "react-router-dom";

// import EmployeeSidebar from "../components/employee/EmployeeSidebar";
// import EmployeeNavbar from "../components/employee/EmployeeNavbar";

// function EmployeeLayout() {

//   return (

//     <Box sx={{ display: "flex" }}>

//       <EmployeeNavbar />

//       <EmployeeSidebar />

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//         }}
//       >

//         <Toolbar />

//         <Outlet />

//       </Box>

//     </Box>

//   );

// }

// export default EmployeeLayout;
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeNavbar from "../components/employee/EmployeeNavbar";


function EmployeeLayout() {

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