import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAttendance = async () => {
    try {
      const { data } = await api.get("/attendance/my");
      setAttendance(data.attendance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const checkIn = async () => {
    try {
      const { data } = await api.post("/attendance/checkin");

      alert(data.message);

      loadAttendance();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const checkOut = async () => {
    try {
      const { data } = await api.post("/attendance/checkout");

      alert(data.message);

      loadAttendance();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const today = attendance[0];

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (_, row) =>
        new Date(row.date).toLocaleDateString(),
    },
    {
      field: "checkIn",
      headerName: "Check In",
      flex: 1,
      valueGetter: (_, row) =>
        row.checkIn
          ? new Date(row.checkIn).toLocaleTimeString()
          : "-",
    },
    {
      field: "checkOut",
      headerName: "Check Out",
      flex: 1,
      valueGetter: (_, row) =>
        row.checkOut
          ? new Date(row.checkOut).toLocaleTimeString()
          : "-",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Present"
              ? "success"
              : params.value === "Half Day"
              ? "warning"
              : "error"
          }
        />
      ),
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        My Attendance
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mb={3}
      >
        <Button
          variant="contained"
          color="success"
          onClick={checkIn}
        >
          Check In
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={checkOut}
        >
          Check Out
        </Button>

        {today && (
          <Chip
            label={`Today's Status : ${today.status}`}
            color="primary"
          />
        )}
      </Stack>

      <DataGrid
        rows={attendance}
        columns={columns}
        getRowId={(row) => row._id}
        autoHeight
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </Paper>
  );
}

export default Attendance;