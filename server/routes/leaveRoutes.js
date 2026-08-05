const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  cancelLeave,

} = require("../controllers/leaveController");

const router = express.Router();

// Employee
router.post(
  "/apply",
  protect,
  authorizeRoles("employee"),
  applyLeave
);

router.get(
  "/my-leaves",
  protect,
  authorizeRoles("employee"),
  getMyLeaves
);

// Admin + HR
router.get(
  "/",
  protect,
  authorizeRoles("admin", "hr"),
  getAllLeaves
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin", "hr"),
  updateLeaveStatus
);

router.patch(
  "/:id/cancel",
  protect,
  authorizeRoles("employee"),
  cancelLeave
);
module.exports = router;