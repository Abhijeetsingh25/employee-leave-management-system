const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

// Admin
router.post("/", protect, authorizeRoles("admin"), createEmployee);

router.put("/:id", protect, authorizeRoles("admin"), updateEmployee);

router.delete("/:id", protect, authorizeRoles("admin"), deleteEmployee);

// Admin + HR
router.get("/", protect, authorizeRoles("admin", "hr"), getAllEmployees);

router.get("/:id/status", protect, authorizeRoles("admin", "hr"), getEmployeeById);



module.exports = router;