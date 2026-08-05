const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    changePassword,


} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", protect, getCurrentUser);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.put( "/change-password", protect,changePassword);

module.exports = router;