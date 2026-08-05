const User = require("../models/User");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalEmployees,
      totalAdmins,
      totalHR,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
      
    ] = await Promise.all([
      User.countDocuments({ role: "employee" }),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "hr" }),
      Leave.countDocuments({ status: "Pending" }),
      Leave.countDocuments({ status: "Approved" }),
      Leave.countDocuments({ status: "Rejected" }),
    ]);

    // Today's Attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayAttendance = await Attendance.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Department Wise Employees
 const departmentStats = await User.aggregate([
  {
    $match: {
      role: "employee",
    },
  },
  {
    $group: {
      _id: "$department",
      totalEmployees: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      totalEmployees: -1,
    },
  },
]);

    // Monthly Leave Report
    const monthlyLeaves = await Leave.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          totalLeaves: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    // Recent Leaves
    const recentLeaves = await Leave.find()
      .populate(
        "employee",
        "name employeeId department"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      overview: {
        totalEmployees,
        totalAdmins,
        totalHR,
        pendingLeaves,
        approvedLeaves,
        rejectedLeaves,
        todayAttendance,
      },

      departmentStats,

      monthlyLeaves,

      recentLeaves,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};