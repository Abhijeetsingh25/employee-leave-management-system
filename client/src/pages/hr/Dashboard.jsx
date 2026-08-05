import { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Paper
} from "@mui/material";

import LeaveStatusChart from "../../components/dashboard/LeaveStatusChart";
import MonthlyLeaveChart from "../../components/dashboard/MonthlyLeaveChart";
import RecentLeavesTable from "../../components/dashboard/RecentLeaveTable";

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


    } catch(error) {

      console.log(error.response?.data);

    }

  };



  if(!dashboard){

    return <CircularProgress />;

  }



  return (

    <>


      <Grid container spacing={3}>


        {/* Total Employees */}

        <Grid item xs={12} md={4}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Total Employees
              </Typography>


              <Typography variant="h3">
                {dashboard.overview.totalEmployees}
              </Typography>


            </CardContent>

          </Card>

        </Grid>





        {/* Pending Leaves */}

        <Grid item xs={12} md={4}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Pending Leaves
              </Typography>


              <Typography variant="h3">
                {dashboard.overview.pendingLeaves}
              </Typography>


            </CardContent>

          </Card>

        </Grid>





        {/* Approved Leaves */}

        <Grid item xs={12} md={4}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Approved Leaves
              </Typography>


              <Typography variant="h3">
                {dashboard.overview.approvedLeaves}
              </Typography>


            </CardContent>

          </Card>

        </Grid>



      </Grid>





      <Grid container spacing={3} sx={{mt:2}}>


        <Grid item xs={12} md={5}>

          <Paper sx={{p:2}}>

            <LeaveStatusChart
              overview={dashboard.overview}
            />

          </Paper>

        </Grid>



        <Grid item xs={12} md={7}>

          <Paper sx={{p:2}}>

            <MonthlyLeaveChart
              monthlyLeaves={dashboard.monthlyLeaves}
            />

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