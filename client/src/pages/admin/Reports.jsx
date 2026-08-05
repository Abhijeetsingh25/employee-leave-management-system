import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

const Reports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await api.get("/reports");
      setReport(data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const downloadExcel = () => {
    window.open("http://localhost:5001/api/reports/export/excel", "_blank");
  };

  const downloadPDF = () => {
    window.open("http://localhost:5001/api/reports/export/pdf", "_blank");
  };

  if (!report) {
    return (
      <Typography variant="h6">
        Loading Reports...
      </Typography>
    );
  }

  const { summary, employees } = report;

  return (
    <Box p={3}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Reports Dashboard
      </Typography>

      {/* Summary */}

      <Grid container spacing={3} mb={3}>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>Total Employees</Typography>
              <Typography variant="h4">
                {summary.totalEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>Total Leaves</Typography>
              <Typography variant="h4">
                {summary.totalLeaves}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>Pending Leaves</Typography>
              <Typography variant="h4">
                {summary.pendingLeaves}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography>Approved Leaves</Typography>
              <Typography variant="h4">
                {summary.approvedLeaves}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Download Buttons */}

      <Box mb={3} display="flex" gap={2}>

        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={downloadExcel}
        >
          Download Excel
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<DownloadIcon />}
          onClick={downloadPDF}
        >
          Download PDF
        </Button>

      </Box>

      {/* Employee Table */}

      <Paper>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell><b>Employee ID</b></TableCell>

                <TableCell><b>Name</b></TableCell>

                <TableCell><b>Email</b></TableCell>

                <TableCell><b>Department</b></TableCell>

                <TableCell><b>Designation</b></TableCell>

                <TableCell><b>Role</b></TableCell>

                <TableCell><b>Leave Balance</b></TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {employees.map((emp) => (

                <TableRow key={emp._id}>

                  <TableCell>{emp.employeeId}</TableCell>

                  <TableCell>{emp.name}</TableCell>

                  <TableCell>{emp.email}</TableCell>

                  <TableCell>{emp.department}</TableCell>

                  <TableCell>{emp.designation}</TableCell>

                  <TableCell>{emp.role}</TableCell>

                  <TableCell>{emp.leaveBalance}</TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>
  );
};

export default Reports;