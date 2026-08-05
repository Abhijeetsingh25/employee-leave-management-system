import { useEffect, useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

import api from "../../api/axios";

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
      <Typography
        variant="h4"
        mb={3}
      >
        Welcome, {profile.name}
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6">
              Leave Balance
            </Typography>

            <Typography
              variant="h3"
              color="primary"
            >
              {profile.leaveBalance}
            </Typography>

          </Paper>

        </Grid>

        <Grid item xs={12} md={3}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6">
              Pending Leaves
            </Typography>

            <Typography
              variant="h3"
              color="warning.main"
            >
              {pendingLeaves}
            </Typography>

          </Paper>

        </Grid>

        <Grid item xs={12} md={3}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6">
              Approved Leaves
            </Typography>

            <Typography
              variant="h3"
              color="success.main"
            >
              {approvedLeaves}
            </Typography>

          </Paper>

        </Grid>

        <Grid item xs={12} md={3}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6">
              Attendance
            </Typography>

            <Typography
              variant="h3"
              color="secondary"
            >
              {attendance.length}
            </Typography>

          </Paper>

        </Grid>

      </Grid>

    </>

  );

}

export default Dashboard;