import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

function DashboardCards({ overview }) {
  const cards = [
    {
      title: "Employees",
      value: overview.totalEmployees,
      icon: <PeopleAltIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Admins",
      value: overview.totalAdmins,
      icon: <AdminPanelSettingsIcon fontSize="large" />,
      color: "#8e24aa",
    },
    {
      title: "HR",
      value: overview.totalHR,
      icon: <BadgeIcon fontSize="large" />,
      color: "#ff9800",
    },
    {
      title: "Pending Leaves",
      value: overview.pendingLeaves,
      icon: <PendingActionsIcon fontSize="large" />,
      color: "#f57c00",
    },
    {
      title: "Approved",
      value: overview.approvedLeaves,
      icon: <CheckCircleIcon fontSize="large" />,
      color: "#2e7d32",
    },
    {
      title: "Rejected",
      value: overview.rejectedLeaves,
      icon: <CancelIcon fontSize="large" />,
      color: "#d32f2f",
    },
    {
      title: "Today's Attendance",
      value: overview.todayAttendance,
      icon: <AccessTimeFilledIcon fontSize="large" />,
      color: "#009688",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 8,
              },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    mt={1}
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: card.color,
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardCards;