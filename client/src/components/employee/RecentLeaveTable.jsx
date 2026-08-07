import {
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

function RecentLeaveTable({ leaves }) {
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
          size="small"
        />
      ),
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
      }}
    >
      <Box mb={2}>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Recent Leave Requests
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Your latest leave applications
        </Typography>
      </Box>

      <DataGrid
        rows={leaves.slice(0, 5)}
        columns={columns}
        getRowId={(row) => row._id}
        autoHeight
        disableRowSelectionOnClick
        hideFooter
      />
    </Paper>
  );
}

export default RecentLeaveTable;