const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/stats",
  protect,
  authorizeRoles("admin", "hr"),
  getDashboardStats
);

module.exports = router;