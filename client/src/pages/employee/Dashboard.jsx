import { useEffect, useState } from "react";

import {
  Typography,
  CircularProgress,
  Paper,
  Box,
  Avatar,
  Grid,
} from "@mui/material";

import api from "../../api/axios";
import EmployeeDashboardCards from "../../components/employee/EmployeeDashboardCards";
import RecentLeaveTable from "../../components/employee/RecentLeaveTable";
import AttendanceChart from "../../components/employee/AttendanceChart";
import QuickActions from "../../components/employee/QuickActions";
import UpcomingHolidays from "../../components/employee/UpcomingHolidays";
function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({});
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profileRes = await api.get("/users/profile");
      const leaveRes = await api.get("/leaves/my-leaves");
      const attendanceRes = await api.get("/attendance/my");

      setProfile(profileRes.data.user);
      setLeaves(leaveRes.data.leaves);
      setAttendance(attendanceRes.data.attendance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  return (
    <>
      {/* Welcome Card */}

      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#1E3A8A,#2563EB)",
          color: "#fff",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Avatar
            sx={{
              width: 65,
              height: 65,
              bgcolor: "#fff",
              color: "#2563EB",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            {profile.name?.charAt(0)}
          </Avatar>

          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Welcome, {profile.name}
            </Typography>

            <Typography>
              Have a productive day!
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Dashboard Cards */}

      <EmployeeDashboardCards
        leaveBalance={profile.leaveBalance}
        pendingLeaves={pendingLeaves}
        approvedLeaves={approvedLeaves}
        attendance={attendance.length}
      />
      <RecentLeaveTable
      leaves={leaves}
      />

      <AttendanceChart
     attendance={attendance}
  />

  <Grid container spacing={3} mt={1}>

  <Grid item xs={12} md={6}>
    <QuickActions />
  </Grid>

  <Grid item xs={12} md={6}>
    <UpcomingHolidays />
  </Grid>

</Grid>
    </>
  );
}

export default Dashboard;