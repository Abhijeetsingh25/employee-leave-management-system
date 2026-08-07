import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

function EmployeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

 const menus = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/employee/dashboard",
  },
  {
    title: "My Attendance",
    icon: <AccessTimeIcon />,
    path: "/employee/attendance",
  },
  {
    title: "My Leaves",
    icon: <EventNoteIcon />,
    path: "/employee/leaves",
  },
  {
    title: "My Profile",
    icon: <PersonIcon />,
    path: "/employee/profile",
  },
  {
    title: "Change Password",
    icon: <LockIcon />,
    path: "/employee/change-password",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    path: "/",
  },
];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {menus.map((item) => (
          <ListItemButton
            key={item.title}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default EmployeeSidebar;