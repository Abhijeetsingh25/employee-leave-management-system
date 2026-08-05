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
} from "@mui/material";
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
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1.5,
    sortable: false,

    renderCell: (params) => (
      <>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>

        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      </>
    ),
  },
];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5">
          Employees
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          >
          Add Employee
         </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Employee"
        onChange={handleSearch}
        sx={{ mb: 2 }}
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