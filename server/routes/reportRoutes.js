const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getReports,
  exportExcel,
  exportPDF,
} = require("../controllers/reportController");

router.get("/", protect, authorizeRoles("admin"), getReports);

router.get(
  "/export/excel",
  protect,
  authorizeRoles("admin"),
  exportExcel
);

router.get(
  "/export/pdf",
  protect,
  authorizeRoles("admin"),
  exportPDF
);

module.exports = router;