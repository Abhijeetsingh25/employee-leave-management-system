import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function AdminLayout() {
  return (
    <Box display="flex">

      <Sidebar />

      <Box flex={1}>

        <Navbar />

        <Box p={3}>
          <Outlet />
        </Box>

      </Box>

    </Box>
  );
}

export default AdminLayout;