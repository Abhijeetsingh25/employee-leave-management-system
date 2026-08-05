const Attendance = require("../models/Attendance");

// Employee Check In
const checkIn = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyChecked = await Attendance.findOne({
      employee: req.user._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (alreadyChecked) {
      return res.status(400).json({
        success: false,
        message: "Already Checked In Today",
      });
    }

    const attendance = await Attendance.create({
      employee: req.user._id,
      date: new Date(),
      checkIn: new Date(),
      status: "Present",
    });

    res.status(201).json({
      success: true,
      message: "Checked In Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Employee Check Out
const checkOut = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employee: req.user._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Check In First",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: "Already Checked Out",
      });
    }

    attendance.checkOut = new Date();

    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Checked Out Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Employee Attendance
const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      employee: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Attendance
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employee", "name employeeId department")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
};