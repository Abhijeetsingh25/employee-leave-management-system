const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  exportEmployeesExcel,
  exportEmployeesPDF,
} = require("../controllers/exportController");

router.get(
  "/employees/excel",
  protect,
  authorizeRoles("admin"),
  exportEmployeesExcel
);

router.get(
  "/employees/pdf",
  protect,
  authorizeRoles("admin"),
  exportEmployeesPDF
);

module.exports = router;