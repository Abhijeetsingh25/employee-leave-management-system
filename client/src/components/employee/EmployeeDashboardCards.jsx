import {
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const cards = [
  {
    title: "Leave Balance",
    key: "leaveBalance",
    color: "#2563eb",
    icon: <EventAvailableIcon sx={{ fontSize: 34 }} />,
  },
  {
    title: "Pending Leaves",
    key: "pendingLeaves",
    color: "#f59e0b",
    icon: <PendingActionsIcon sx={{ fontSize: 34 }} />,
  },
  {
    title: "Approved Leaves",
    key: "approvedLeaves",
    color: "#16a34a",
    icon: <CheckCircleIcon sx={{ fontSize: 34 }} />,
  },
  {
    title: "Attendance",
    key: "attendance",
    color: "#9333ea",
    icon: <CalendarMonthIcon sx={{ fontSize: 34 }} />,
  },
];

function EmployeeDashboardCards({
  leaveBalance,
  pendingLeaves,
  approvedLeaves,
  attendance,
}) {

  const values = {
    leaveBalance,
    pendingLeaves,
    approvedLeaves,
    attendance,
  };

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.key}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              p: 3,
              transition: ".3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 8,
              },
            }}
          >
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
                  {values[card.key]}
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
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default EmployeeDashboardCards;