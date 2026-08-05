const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  addHoliday,
  getHolidays,
  updateHoliday,
  deleteHoliday,
} = require("../controllers/holidayController");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "hr"),
  addHoliday
);

router.get(
  "/",
  protect,
  getHolidays
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateHoliday
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteHoliday
);

module.exports = router;