import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function EmployeeNavbar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Employee Dashboard
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >

          <Typography>
            {user.name}
          </Typography>

          <Avatar>
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "E"}
          </Avatar>

          <IconButton
            color="inherit"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>

        </Box>

      </Toolbar>

    </AppBar>

  );

}

export default EmployeeNavbar;