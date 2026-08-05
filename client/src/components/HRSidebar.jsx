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
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";

import { Link, useLocation } from "react-router-dom";


const menu = [
  {
    title:"Dashboard",
    icon:<DashboardIcon />,
    path:"/hr/dashboard"
  },
  {
    title:"Employees",
    icon:<GroupIcon />,
    path:"/hr/employees"
  },
  {
    title:"Leaves",
    icon:<BeachAccessIcon />,
    path:"/hr/leaves"
  },
  {
    title:"Attendance",
    icon:<EventNoteIcon />,
    path:"/hr/attendance"
  },
  {
 title:"Change Password",
 icon:<LockIcon />,
 path:"/hr/change-password"
},
  {
    title:"Logout",
    icon:<LogoutIcon />,
    path:"/"
  }
];


const HRSidebar = ()=>{

const location = useLocation();


return (

<Box
sx={{
width:260,
bgcolor:"#2e7d32",
color:"#fff",
minHeight:"100vh"
}}
>

<Toolbar />

<List>

{
menu.map((item)=>(

<ListItemButton
key={item.title}
component={Link}
to={item.path}
selected={location.pathname===item.path}
>

<ListItemIcon sx={{color:"#fff"}}>
{item.icon}
</ListItemIcon>

<ListItemText primary={item.title}/>

</ListItemButton>

))
}

</List>

</Box>

)

}


export default HRSidebar;