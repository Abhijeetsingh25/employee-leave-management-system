import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import HRSidebar from "../components/HRSidebar";


const HRLayout = () => {

  return (

    <Box sx={{ display:"flex" }}>

      <HRSidebar />

      <Box
        component="main"
        sx={{
          flexGrow:1,
          p:3
        }}
      >

        <Outlet />

      </Box>

    </Box>

  );
};


export default HRLayout;