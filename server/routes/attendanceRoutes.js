const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

router.post(
  "/checkin",
  protect,
  authorizeRoles("employee"),
  checkIn
);

router.post(
  "/checkout",
  protect,
  authorizeRoles("employee"),
  checkOut
);

router.get(
  "/my",
  protect,
  authorizeRoles("employee"),
  getMyAttendance
);

router.get(
  "/",
  protect,
  authorizeRoles("admin", "hr"),
  getAllAttendance
);

module.exports = router;