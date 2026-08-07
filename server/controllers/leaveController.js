const Leave = require("../models/Leave");
const User = require("../models/User");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");


const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Validation
    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

  const existingLeave = await Leave.findOne({
  employee: req.user._id,
  status: { $in: ["Pending", "Approved"] },
  startDate: { $lte: endDate },
  endDate: { $gte: startDate },
});

if (existingLeave) {
  return res.status(400).json({
    success: false,
    message: "Leave already applied for selected dates",
  });
}

    // Date validation
    if (end < start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Calculate leave days
    const oneDay = 1000 * 60 * 60 * 24;

    const totalDays =
      Math.ceil((end - start) / oneDay) + 1;

    // Logged in user
    const employee = await User.findById(req.user._id);

    // Leave Balance Check
    if (employee.leaveBalance < totalDays) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Leave Balance",
      });
    }

    // Save Leave
    const leave = await Leave.create({
      employee: employee._id,
      leaveType,
      startDate,
      endDate,
      days: totalDays,
      reason,
    });

    // Find all admins
const admins = await User.find({
  role: "admin",
  //isActive: true,
  
});
// console.log("ADMINS:", admins);

// Create notification + send email
for (const admin of admins) {
  await Notification.create({
    recipient: admin._id,
    sender: req.user._id,
    title: "New Leave Application",
    message: `${req.user.name} has applied for ${leave.leaveType} from ${new Date(
      leave.startDate
    ).toLocaleDateString()} to ${new Date(
      leave.endDate
    ).toLocaleDateString()}.`,
    type: "leave",
  });

  await sendEmail({
    email: admin.email,
    subject: "New Leave Application - Employee Leave Management",
    message: `
Hello ${admin.name},

A new leave application has been submitted.

Employee: ${req.user.name}
Leave Type: ${leave.leaveType}
Start Date: ${new Date(
      leave.startDate
    ).toLocaleDateString()}
End Date: ${new Date(
      leave.endDate
    ).toLocaleDateString()}
Days: ${leave.days}
Status: Pending

Please login to the Employee Leave Management system to review this request.

Regards,
Employee Leave Management System
    `,
  });
}

    res.status(201).json({
      success: true,
      message: "Leave Applied Successfully",
      leave,
    });



  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getMyLeaves = async (req, res) => {
  try {

    const leaves = await Leave.find({
      employee: req.user._id,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllLeaves = async (req, res) => {
  try {

    const leaves = await Leave.find()
      .populate("employee", "name email employeeId department designation")
      .populate("approvedBy", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const updateLeaveStatus = async (req, res) => {
  try {
    const { status, comments } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Leave already processed",
      });
    }

    // Save old status before updating
    const oldStatus = leave.status;

    // Deduct leave balance only once
    if (status === "Approved" && oldStatus !== "Approved") {
      const employee = await User.findById(leave.employee);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      if (employee.leaveBalance < leave.days) {
        return res.status(400).json({
          success: false,
          message: "Employee does not have enough leave balance",
        });
      }

      employee.leaveBalance -= leave.days;
      await employee.save();
    }

    // Update leave
    leave.status = status;
    leave.comments = comments || "";
    leave.approvedBy = req.user._id;
    leave.approvedAt = new Date();

    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status} Successfully`,
      leave,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    if (leave.employee.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own leave",
      });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending leave can be cancelled",
      });
    }

    leave.status = "Cancelled";
    leave.cancelledAt = new Date();

    await leave.save();

    res.status(200).json({
      success: true,
      message: "Leave cancelled successfully",
      leave,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  cancelLeave,
};