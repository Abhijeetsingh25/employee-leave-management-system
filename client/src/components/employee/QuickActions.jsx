import {
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";

function QuickActions() {

  const navigate = useNavigate();

  return (

    <Paper
      elevation={3}
      sx={{
        p:3,
        borderRadius:4,
        height:"100%"
      }}
    >

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        Quick Actions
      </Typography>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<EventNoteIcon />}
            onClick={() =>
              navigate("/employee/leaves")
            }
          >
            Apply Leave
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AccessTimeIcon />}
            onClick={() =>
              navigate("/employee/attendance")
            }
          >
            My Attendance
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={() =>
              navigate("/employee/profile")
            }
          >
            My Profile
          </Button>
        </Grid>

      </Grid>

    </Paper>

  );

}

export default QuickActions;