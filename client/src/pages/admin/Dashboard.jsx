import { useEffect, useState } from "react";

import DashboardCards from "../../components/dashboard/DashboardCards";
import LeaveStatusChart from "../../components/dashboard/LeaveStatusChart";
import MonthlyLeaveChart from "../../components/dashboard/MonthlyLeaveChart";
import RecentLeavesTable from "../../components/dashboard/RecentLeaveTable";
import { Grid, Paper , CircularProgress} from "@mui/material";


import api from "../../api/axios";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const { data } = await api.get("/dashboard/stats");

      setDashboard(data);

    } catch (error) {

      console.log(error);

    }
  };

if (!dashboard) {
  return <CircularProgress />;
}

 
  return (
   <>
   <DashboardCards overview={dashboard.overview} />

<Grid container spacing={3} sx={{ mt:2 }}>

<Grid item xs={12} md={5}>

<Paper sx={{ p:2 }}>

<LeaveStatusChart overview={dashboard.overview}/>

</Paper>

</Grid>

<Grid item xs={12} md={7}>

<Paper sx={{ p:2 }}>

<MonthlyLeaveChart monthlyLeaves={dashboard.monthlyLeaves}/>

</Paper>

</Grid>

</Grid>

<RecentLeavesTable
recentLeaves={dashboard.recentLeaves}
/>
   </>
  );
}

export default Dashboard;