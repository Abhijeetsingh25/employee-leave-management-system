

import api from "../../api/axios";

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
  ListItemIcon,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // =========================
  // Profile Menu
  // =========================
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // =========================
  // Notification Menu
  // =========================
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const notificationOpen = Boolean(notificationAnchor);

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  // =========================
  // Notification Count
  // =========================
  const [unreadCount, setUnreadCount] = useState(0);
 const [notifications, setNotifications] = useState([]);
const loadNotifications = async () => {
  try {
    const { data } = await api.get("/notifications");

    // console.log("NOTIFICATION DATA:", data);

    setNotifications(data.notifications || []);
    setUnreadCount(data.unreadCount || 0);
  } catch (error) {
    console.log(
      "NOTIFICATION ERROR:",
      error.response?.data || error
    );
  }
};

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // Logout
  // =========================
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

        {/* =========================
            Logo / Title
        ========================= */}
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

        {/* =========================
            Notification Button
        ========================= */}
        <IconButton
          onClick={handleNotificationOpen}
          color="inherit"
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* =========================
            Notification Menu
        ========================= */}
        <Menu
          anchorEl={notificationAnchor}
          open={notificationOpen}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              width: 380,
              maxHeight: 450,
              mt: 1,
            },
          }}
        >
          {/* Header */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Notifications
            </Typography>
          </Box>

          <Divider />

          {/* Notification */}
          {notifications.length === 0 ? (
  <MenuItem disabled>
    <Typography color="text.secondary">
      No new notifications
    </Typography>
  </MenuItem>
) : (
  notifications.map((notification) => (
    <MenuItem
      key={notification._id}
      onClick={handleNotificationClose}
      sx={{
        py: 2,
        alignItems: "flex-start",
      }}
    >
      <ListItemIcon>
        <NotificationsIcon color="primary" />
      </ListItemIcon>

      <Box>
        <Typography
          variant="body1"
          fontWeight={600}
        >
          {notification.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {notification.message}
        </Typography>
      </Box>
    </MenuItem>
  ))
)}
        </Menu>

        {/* =========================
            Profile Button
        ========================= */}
        <IconButton onClick={handleOpen}>
          <Avatar
            sx={{
              bgcolor: "#1976d2",
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
        </IconButton>

        {/* =========================
            Profile Menu
        ========================= */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 250,
              mt: 1,
            },
          }}
        >
          {/* Profile */}
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/employee/profile");
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>

            My Profile
          </MenuItem>

          {/* Account */}
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>

            Account
          </MenuItem>

          {/* Change Password */}
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/employee/change-password");
            }}
          >
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>

            Change Password
          </MenuItem>

          <Divider />

          {/* Logout */}
          <MenuItem
            onClick={logout}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>

            Logout
          </MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

