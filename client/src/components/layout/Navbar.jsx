import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#222",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1976d2",
            flexGrow: 1,
          }}
        >
          Employee Leave Management
        </Typography>

        <IconButton>

          <Badge
            badgeContent={3}
            color="error"
          >
            <NotificationsIcon />
          </Badge>

        </IconButton>

        <IconButton
          onClick={handleOpen}
        >

          <Avatar
            sx={{
              bgcolor: "#1976d2",
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>

        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >

          <MenuItem disabled>

            <Box>

              <Typography fontWeight="bold">
                {user?.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {user?.email}
              </Typography>

            </Box>

          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              navigate("/admin/change-password");
            }}
          >
            <SettingsIcon
              sx={{ mr: 1 }}
            />
            Change Password
          </MenuItem>

          <MenuItem onClick={logout}>
            <LogoutIcon
              sx={{ mr: 1 }}
            />
            Logout
          </MenuItem>

        </Menu>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;