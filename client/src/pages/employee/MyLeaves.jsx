import ApplyLeaveDialog from "../../components/employee/ApplyLeaveDialog";
import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Button,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import api from "../../api/axios";

function MyLeaves() {

  const [leaves, setLeaves] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {

      const { data } = await api.get("/leaves/my-leaves");

      setLeaves(data.leaves);

    } catch (error) {

      console.log(error);

    }
  };

  const cancelLeave = async (id) => {

    try {

      await api.patch(`/leaves/${id}/cancel`);

      alert("Leave Cancelled");

      loadLeaves();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  const columns = [

    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
    },

    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      valueGetter: (_, row) =>
        new Date(row.startDate).toLocaleDateString(),
    },

    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      valueGetter: (_, row) =>
        new Date(row.endDate).toLocaleDateString(),
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
      headerName: "Action",
      flex: 1,

      renderCell: (params) => (

        params.row.status === "Pending" && (

          <Button
            color="error"
            onClick={() =>
              cancelLeave(params.row._id)
            }
          >
            Cancel
          </Button>

        )

      ),
    },

  ];

  return (

    <Paper sx={{ p:3 }}>

      <Typography
        variant="h5"
        mb={2}
      >
        My Leaves
      </Typography>

      <Button
  variant="contained"
  sx={{ mb: 2 }}
  onClick={() => setOpenDialog(true)}
>
  Apply Leave
</Button>

      <DataGrid
        rows={leaves}
        columns={columns}
        getRowId={(row)=>row._id}
        autoHeight
        pageSizeOptions={[5,10]}
      />
     
     <ApplyLeaveDialog
  open={openDialog}
  handleClose={() => setOpenDialog(false)}
  refresh={loadLeaves}
/>
    </Paper>

  );

}

export default MyLeaves;