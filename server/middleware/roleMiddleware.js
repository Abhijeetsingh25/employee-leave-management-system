const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user authMiddleware se aata hai
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied. You are not authorized.",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;