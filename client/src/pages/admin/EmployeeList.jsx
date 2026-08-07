import AddEmployeeDialog from "../../components/employees/AddEmployeeDialog";
import EditEmployeeDialog from "../../components/employees/EditEmployeeDialog";
import { deleteEmployee } from "../../services/employeeService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress,
  Chip,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getEmployees } from "../../services/employeeService";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
const [editOpen, setEditOpen] = useState(false);

const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data } = await getEmployees();

      setEmployees(data.employees);
      setFilteredEmployees(data.employees);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
  setSelectedEmployee(employee);
  setEditOpen(true);
};

const handleDelete = async (id) => {

  const ok = window.confirm(
    "Delete this employee?"
  );

  if (!ok) return;

  try {

    await deleteEmployee(id);

    setSnackbar({
      open: true,
      message: "Employee Deleted Successfully",
      severity: "success",
    });

    loadEmployees();

  } catch (error) {

    setSnackbar({
      open: true,
      message:
        error.response?.data?.message ||
        "Delete Failed",
      severity: "error",
    });

  }
};

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = employees.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(value) ||
        emp.email.toLowerCase().includes(value) ||
        emp.department.toLowerCase().includes(value) ||
        emp.role.toLowerCase().includes(value)
      );
    });

    setFilteredEmployees(filtered);
  };

  const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
  },
  {
    field: "employeeId",
    headerName: "Employee ID",
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "designation",
    headerName: "Designation",
    flex: 1,
  },
  {
  field: "role",
  headerName: "Role",
  flex: 1,

  renderCell: (params) => (
    <Chip
      label={params.value.toUpperCase()}
      size="small"
      color={
        params.value === "admin"
          ? "error"
          : params.value === "hr"
          ? "warning"
          : "primary"
      }
    />
  ),
},
  {
    field: "actions",
    headerName: "Actions",
    flex: 1.5,
    sortable: false,

   renderCell: (params) => (
  <Box display="flex" gap={1}>
    <Button
      variant="outlined"
      size="small"
      startIcon={<EditIcon />}
      onClick={() => handleEdit(params.row)}
    >
      Edit
    </Button>

    <Button
      variant="contained"
      color="error"
      size="small"
      startIcon={<DeleteIcon />}
      onClick={() => handleDelete(params.row._id)}
    >
      Delete
    </Button>
  </Box>
),
  },
];

 if (loading) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <CircularProgress size={50} />
    </Box>
  );
}

  return (
    <Paper elevation={3}
    sx={{
    p: 4,
    borderRadius: 4,
    overflow: "hidden",
  }}>
     <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mb={3}
>
  <Box>
    <Typography
      variant="h4"
      fontWeight="700"
    >
      Employee Management
    </Typography>

    <Typography color="text.secondary">
      Manage employees, departments and roles.
    </Typography>
  </Box>

  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={() => setOpenDialog(true)}
    sx={{
      borderRadius: 3,
      px: 3,
      py: 1,
      textTransform: "none",
      fontWeight: 600,
    }}
  >
    Add Employee
  </Button>
</Box>

  <TextField
  fullWidth
  placeholder="Search by name, email, department or role..."
  onChange={handleSearch}
  sx={{
    mb: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      bgcolor: "#fff",
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>
<DataGrid
  autoHeight
  rows={filteredEmployees}
  columns={columns}
  getRowId={(row) => row._id}
  pageSizeOptions={[5, 10, 20]}
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 5,
      },
    },
  }}
  sx={{
    border: 0,
    borderRadius: 4,

    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#2563eb",
      color: "#fff",
      fontSize: 15,
      fontWeight: "bold",
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },

    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#f1f5f9",
    },

    "& .MuiDataGrid-cell": {
      borderColor: "#eef2f7",
    },

    "& .MuiDataGrid-footerContainer": {
      backgroundColor: "#fafafa",
    },
  }}
/>
      
      <AddEmployeeDialog
      open={openDialog}
       handleClose={() => setOpenDialog(false)}
       refresh={loadEmployees}
      />

      <EditEmployeeDialog
      open={editOpen}
       handleClose={() => setEditOpen(false)}
       employee={selectedEmployee}
       refresh={loadEmployees}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
}

export default EmployeeList;