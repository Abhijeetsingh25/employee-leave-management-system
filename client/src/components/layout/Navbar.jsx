import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <AppBar
      position="static"
      elevation={1}
      color="inherit"
    >
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Employee Leave Management
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Typography>
            {user?.name}
          </Typography>

          <Avatar>
            {user?.name?.charAt(0)}
          </Avatar>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;