import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAttendance = async () => {
    try {
      const { data } = await api.get("/attendance");

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
      await api.post("/attendance/checkin");

      alert("Checked In Successfully");

      loadAttendance();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const checkOut = async () => {
    try {
      await api.post("/attendance/checkout");

      alert("Checked Out Successfully");

      loadAttendance();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const columns = [
    {
      field: "name",
      headerName: "Employee",
      flex: 1,
      valueGetter: (_, row) => row.employee?.name,
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      flex: 1,
      valueGetter: (_, row) => row.employee?.employeeId,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      valueGetter: (_, row) => row.employee?.department,
    },
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
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Attendance
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
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