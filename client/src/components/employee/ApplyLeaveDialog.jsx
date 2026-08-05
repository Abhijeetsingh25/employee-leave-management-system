import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import api from "../../api/axios";

function ApplyLeaveDialog({
  open,
  handleClose,
  refresh,
}) {

  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    try {

      await api.post("/leaves/apply", form);

      alert("Leave Applied Successfully");

      refresh();

      handleClose();

      setForm({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
    >

      <DialogTitle>
        Apply Leave
      </DialogTitle>

      <DialogContent>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Leave Type"
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
        >
          <MenuItem value="Casual Leave">
            Casual Leave
          </MenuItem>

          <MenuItem value="Sick Leave">
            Sick Leave
          </MenuItem>

          <MenuItem value="Paid Leave">
            Paid Leave
          </MenuItem>
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Start Date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="End Date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Reason"
          name="reason"
          value={form.reason}
          onChange={handleChange}
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Apply
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default ApplyLeaveDialog;