import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Chip,
  Button,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/axios";

function LeaveManagement() {

  const [leaves, setLeaves] = useState([]);

  const loadLeaves = async () => {
    try {

      const { data } = await api.get("/leaves");

      setLeaves(data.leaves);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    loadLeaves();

  }, []);

  const updateStatus = async (id, status) => {

    try {

      await api.patch(`/leaves/${id}/status`, {
        status,
      });

      loadLeaves();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  const columns = [

    {
      field: "employee",
      headerName: "Employee",
      flex: 1,
      valueGetter: (_, row) => row.employee?.name,
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
      valueGetter: (_, row) => row.employee?.department,
    },

    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
    },

    {
      field: "days",
      headerName: "Days",
      flex: .6,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,

      renderCell: (params) => (

        <Chip
          label={params.value}
          color={
            params.value === "Approved"
              ? "success"
              : params.value === "Rejected"
              ? "error"
              : "warning"
          }
        />

      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.6,

      renderCell: (params) => (

        <>
          <Button
            size="small"
            color="success"
            onClick={() =>
              updateStatus(params.row._id, "Approved")
            }
          >
            Approve
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() =>
              updateStatus(params.row._id, "Rejected")
            }
          >
            Reject
          </Button>
        </>

      ),
    },

  ];

  return (

    <Paper sx={{ p:3 }}>

      <Typography
        variant="h5"
        mb={2}
      >
        Leave Management
      </Typography>

      <DataGrid
        autoHeight
        rows={leaves}
        columns={columns}
        getRowId={(row)=>row._id}
        pageSizeOptions={[5,10]}
      />

    </Paper>

  );

}

export default LeaveManagement;