import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LockResetIcon from "@mui/icons-material/LockReset";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";


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
  title: "Profile",
  icon: <PersonIcon />,
  path: "/admin/profile",
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
        minHeight: "100vh",
        bgcolor: "#111827",
        color: "#fff",
        boxShadow: "4px 0 12px rgba(0,0,0,.15)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        sx={{
          py: 3,
          borderBottom: "1px solid rgba(255,255,255,.1)",
        }}
      >
        ELMS
      </Typography>

      <List sx={{ mt: 2 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.title}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              my: .5,
              borderRadius: 2,

              "&.Mui-selected": {
                bgcolor: "#1976d2",
                color: "#fff",
              },

              "&:hover": {
                bgcolor: "#1e40af",
              },
            }}
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