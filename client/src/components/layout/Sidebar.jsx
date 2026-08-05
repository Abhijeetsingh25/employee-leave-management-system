import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LockResetIcon from "@mui/icons-material/LockReset";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
  },
  {
    title: "Employees",
    icon: <GroupIcon />,
    path: "/admin/employees",
  },
  {
    title: "Leaves",
    icon: <BeachAccessIcon />,
    path: "/admin/leaves",
  },
  {
  title: "Reports",
  icon: <AssessmentIcon />,
  path: "/admin/reports",
},
  {
    title: "Attendance",
    icon: <EventNoteIcon />,
    path: "/admin/attendance",
  },
  {
  title: "Change Password",
  icon: <LockResetIcon />,
  path: "/admin/change-password",
},
  {
    title: "Logout",
    icon: <LogoutIcon />,
    path: "/",
  },

  
];

function Sidebar() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "#1976d2",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Toolbar />

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.title}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;